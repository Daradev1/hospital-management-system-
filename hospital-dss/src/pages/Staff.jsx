import { Stethoscope } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

export default function Staff() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-xl font-semibold text-ink">Staff</h1>
        <p className="text-sm text-slate mt-0.5">Manage doctors, nurses, and administrative staff</p>
      </div>
      <Card>
        <EmptyState
          icon={Stethoscope}
          title="Staff module in progress"
          description="Roster, shift scheduling, and workload analytics will live here — wiring to the backend next."
        />
      </Card>
    </div>
  )
}
