import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity, ArrowRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Input } from '@/components/ui/Input'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(email, password)
      navigate(user.mustResetPassword ? '/change-password' : '/')
    } catch (err) {
      setError(err.message || 'Could not sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Branding panel */}
      <div className="hidden lg:flex lg:w-[46%] bg-ink text-white flex-col justify-between p-10 relative overflow-hidden">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-signal/20 border border-signal/30 flex items-center justify-center">
            <Activity size={16} className="text-signal" strokeWidth={2.5} />
          </div>
          <span className="font-display font-semibold text-[15px] tracking-tight">MedIQ</span>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="font-display text-3xl font-semibold leading-tight">
            Every admission,<br />every trend,<br />one dashboard.
          </h1>
          <p className="text-white/60 text-sm mt-4 leading-relaxed">
            Data-driven decision support for hospital administrators &mdash; occupancy,
            diagnosis patterns, and staffing signals in one place.
          </p>
        </div>

        <p className="text-white/30 text-xs relative z-10">© 2026 MedIQ Hospital Systems</p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-6 bg-surface">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Activity size={16} className="text-primary" strokeWidth={2.5} />
            </div>
            <span className="font-display font-semibold text-[15px] tracking-tight text-ink">MedIQ</span>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Sign in</h2>
            <p className="text-sm text-slate mt-1">Access your hospital decision-support console.</p>
          </div>

          {error && (
            <p className="text-sm text-alert bg-alert-soft border border-alert/20 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-ink mb-1.5">Staff email</label>
              <Input
                type="email"
                placeholder="you@hospital.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink mb-1.5">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
            {!loading && <ArrowRight size={15} />}
          </button>

          <p className="text-xs text-slate text-center">
            Trouble signing in? Contact your systems administrator.
          </p>
        </form>
      </div>
    </div>
  )
}