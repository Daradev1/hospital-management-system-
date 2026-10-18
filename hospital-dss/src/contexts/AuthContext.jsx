import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { authService } from '@/services/auth'

const AuthContext = createContext(null)
const TOKEN_KEY = 'mediq_token'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [initializing, setInitializing] = useState(true)

  // On load, if a token is already stored, validate it against /auth/me instead of
  // trusting it blindly — an expired/invalid token should send the user back to /login.
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      setInitializing(false)
      return
    }
    authService
      .me()
      .then(({ user }) => {
        setUser(user)
        setIsAuthenticated(true)
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY)
      })
      .finally(() => setInitializing(false))
  }, [])

  const login = useCallback(async (email, password) => {
    const { token, user } = await authService.login(email, password)
    localStorage.setItem(TOKEN_KEY, token)
    setUser(user)
    setIsAuthenticated(true)
    return user
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    await authService.changePassword(currentPassword, newPassword)
    setUser((u) => (u ? { ...u, mustResetPassword: false } : u))
  }, [])

  const hasRole = useCallback(
    (...roles) => !!user && roles.includes(user.role),
    [user]
  )

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, initializing, login, logout, changePassword, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}