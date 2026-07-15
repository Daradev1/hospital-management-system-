import { cn } from '@/lib/cn'

const STATUS_MAP = {
  // patient status
  Admitted: 'bg-signal-soft text-signal border-signal/20',
  Critical: 'bg-alert-soft text-alert border-alert/20',
  Discharged: 'bg-slate/10 text-slate border-slate/20',
  Outpatient: 'bg-primary/10 text-primary border-primary/20',
  Monitoring: 'bg-warn-soft text-warn border-warn/20',
  // appointment status
  Confirmed: 'bg-signal-soft text-signal border-signal/20',
  Pending: 'bg-warn-soft text-warn border-warn/20',
  Cancelled: 'bg-alert-soft text-alert border-alert/20',
  // condition
  Stable: 'bg-signal-soft text-signal border-signal/20',
  Recovered: 'bg-signal-soft text-signal border-signal/20',
}

export function StatusPill({ status, className }) {
  const style = STATUS_MAP[status] || 'bg-slate/10 text-slate border-slate/20'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-medium font-mono',
        style,
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
