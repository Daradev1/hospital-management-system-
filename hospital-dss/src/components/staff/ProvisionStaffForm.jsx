import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Input, Select } from '@/components/ui/Input'
import { staffService } from '@/services/staff'

const ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'doctor', label: 'Doctor' },
  { value: 'nurse', label: 'Nurse' },
  { value: 'records', label: 'Records officer' },
  { value: 'billing', label: 'Billing' },
]

export function ProvisionStaffForm({ departments, onProvisioned, onCancel }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('nurse')
  const [departmentId, setDepartmentId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null) // { staff, tempPassword }
  const [copied, setCopied] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await staffService.create({
        name,
        email,
        role,
        departmentId: departmentId ? Number(departmentId) : null,
      })
      setResult(res)
      onProvisioned?.()
    } catch (err) {
      setError(err.message || 'Could not create staff account')
    } finally {
      setLoading(false)
    }
  }

  function copyPassword() {
    navigator.clipboard.writeText(result.tempPassword)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (result) {
    return (
      <div className="p-4 border-b border-line bg-signal-soft/40">
        <p className="text-sm text-ink">
          <span className="font-medium">{result.staff.name}</span> provisioned as{' '}
          <span className="font-mono text-xs">{result.staff.staff_code}</span>. Hand them this one-time
          temporary password — it won't be shown again:
        </p>
        <div className="mt-2 flex items-center gap-2">
          <code className="px-3 py-1.5 rounded-md bg-panel border border-line font-mono text-sm text-ink">
            {result.tempPassword}
          </code>
          <button
            onClick={copyPassword}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-line bg-panel text-xs font-medium hover:bg-surface transition-colors"
          >
            {copied ? <Check size={13} className="text-signal" /> : <Copy size={13} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={onCancel}
            className="text-xs text-slate hover:text-ink transition-colors ml-2"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-b border-line space-y-3">
      {error && (
        <p className="text-sm text-alert bg-alert-soft border border-alert/20 rounded-md px-3 py-2">{error}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </Select>
        <Select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
          <option value="">No department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-60"
        >
          {loading ? 'Provisioning…' : 'Provision account'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md text-sm text-slate hover:text-ink transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}