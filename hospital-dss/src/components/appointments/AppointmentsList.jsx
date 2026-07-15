import { StatusPill } from '@/components/ui/StatusPill'
import { Clock, User } from 'lucide-react'

export function AppointmentsList({ appointments }) {
  return (
    <div className="divide-y divide-line">
      {appointments.map((a) => (
        <div key={a.id} className="flex items-center gap-4 py-4 px-1">
          <div className="w-16 shrink-0 flex flex-col items-center justify-center py-2 rounded-md bg-surface border border-line">
            <Clock size={13} className="text-slate mb-0.5" />
            <span className="font-mono text-xs font-medium text-ink">{a.time}</span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ink truncate">{a.patient}</p>
            <p className="text-xs text-slate flex items-center gap-1 mt-0.5 truncate">
              <User size={11} className="shrink-0" />
              <span className="truncate">{a.doctor} · {a.department}</span>
            </p>
          </div>

          <span className="font-mono text-xs text-slate hidden sm:block shrink-0">{a.id}</span>
          <StatusPill status={a.status} className="shrink-0" />
        </div>
      ))}
    </div>
  )
}
