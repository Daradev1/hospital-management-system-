import { useEffect, useState } from 'react'
import { Plus, Stethoscope, ShieldAlert } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { StaffTable } from '@/components/staff/StaffTable'
import { ProvisionStaffForm } from '@/components/staff/ProvisionStaffForm'
import { staffService } from '@/services/staff'
import { departmentsService } from '@/services/departments'
import { useAuth } from '@/contexts/AuthContext'

export default function Staff() {
  const { hasRole } = useAuth()
  const [staff, setStaff] = useState([])
  const [departments, setDepartments] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const isAdmin = hasRole('admin')

  function refresh() {
    setLoading(true)
    staffService
      .list()
      .then(({ staff }) => setStaff(staff))
      .catch((err) => setError(err.message || 'Could not load staff'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!isAdmin) return
    refresh()
    departmentsService.list().then(({ departments }) => setDepartments(departments)).catch(() => {})
  }, [isAdmin])

  if (!isAdmin) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">Staff</h1>
        </div>
        <Card>
          <EmptyState
            icon={ShieldAlert}
            title="Admins only"
            description="Staff account provisioning is restricted to admin accounts."
          />
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">Staff</h1>
          <p className="text-sm text-slate mt-0.5">{staff.length} accounts</p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors w-full sm:w-auto"
        >
          <Plus size={16} />
          Provision Staff
        </button>
      </div>

      <Card>
        {showForm && (
          <ProvisionStaffForm
            departments={departments}
            onProvisioned={refresh}
            onCancel={() => setShowForm(false)}
          />
        )}
        {error ? (
          <p className="text-sm text-alert p-4">{error}</p>
        ) : loading ? (
          <p className="text-sm text-slate font-mono p-4">Loading…</p>
        ) : staff.length === 0 ? (
          <EmptyState icon={Stethoscope} title="No staff yet" description="Provision the first account above." />
        ) : (
          <StaffTable staff={staff} />
        )}
      </Card>
    </div>
  )
}