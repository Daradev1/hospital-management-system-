import { Pill } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

export default function Pharmacy() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-xl font-semibold text-ink">Pharmacy</h1>
        <p className="text-sm text-slate mt-0.5">Medication inventory and reorder tracking</p>
      </div>
      <Card>
        <EmptyState
          icon={Pill}
          title="Pharmacy module in progress"
          description="Stock levels, reorder alerts, and dispensing logs will live here."
        />
      </Card>
    </div>
  )
}
