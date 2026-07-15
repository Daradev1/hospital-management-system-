import { createContext, useContext, useState, useCallback } from 'react'
import { currentUser as mockUser } from '@/data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(mockUser)
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const login = useCallback(async (credentials) => {
    // TODO: replace with real API call to /api/auth/login
    setUser(mockUser)
    setIsAuthenticated(true)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  const hasRole = useCallback(
    (...roles) => !!user && roles.includes(user.role),
    [user]
  )

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
