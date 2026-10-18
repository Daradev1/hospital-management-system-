import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity, ArrowRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Input } from '@/components/ui/Input'

export default function ChangePassword() {
  const { changePassword, logout } = useAuth()
  const navigate = useNavigate()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters')
      return
    }
    if (newPassword !== confirm) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await changePassword(currentPassword, newPassword)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Could not update password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Activity size={16} className="text-primary" strokeWidth={2.5} />
          </div>
          <span className="font-display font-semibold text-[15px] tracking-tight text-ink">MedIQ</span>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink">Set a new password</h2>
          <p className="text-sm text-slate mt-1">
            Your account was created with a temporary password. Choose a permanent one to continue.
          </p>
        </div>

        {error && (
          <p className="text-sm text-alert bg-alert-soft border border-alert/20 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">Temporary / current password</label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">New password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">Confirm new password</label>
            <Input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-60"
        >
          {loading ? 'Updating…' : 'Update password'}
          {!loading && <ArrowRight size={15} />}
        </button>

        <button
          type="button"
          onClick={logout}
          className="w-full text-xs text-slate hover:text-ink transition-colors text-center"
        >
          Sign out instead
        </button>
      </form>
    </div>
  )
}