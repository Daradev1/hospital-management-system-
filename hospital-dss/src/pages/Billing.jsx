import { Receipt } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

export default function Billing() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-xl font-semibold text-ink">Billing</h1>
        <p className="text-sm text-slate mt-0.5">Invoices, payments, and insurance claims</p>
      </div>
      <Card>
        <EmptyState
          icon={Receipt}
          title="Billing module in progress"
          description="Invoice generation and payment tracking will live here."
        />
      </Card>
    </div>
  )
}
