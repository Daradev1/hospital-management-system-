import { kpis } from '@/data/mockData'
import { Sparkline } from '@/components/ui/Sparkline'

const ITEMS = [
  { key: 'bedOccupancy', label: 'BED OCCUPANCY', color: '#1FA98A' },
  { key: 'patientsToday', label: 'PATIENTS TODAY', color: '#12405E' },
  { key: 'avgWaitTime', label: 'AVG WAIT', color: '#C98A2C' },
  { key: 'criticalPatients', label: 'CRITICAL', color: '#C4534A' },
  { key: 'pendingAlerts', label: 'ALERTS', color: '#C4534A' },
  { key: 'revenueToday', label: 'REVENUE TODAY', color: '#12405E' },
]

export function VitalsStrip() {
  return (
    <div className="h-11 bg-ink/[0.03] border-b border-line px-3 sm:px-6 flex items-center gap-5 sm:gap-8 overflow-x-auto [scrollbar-width:thin]">
      {ITEMS.map(({ key, label, color }) => {
        const d = kpis[key]
        return (
          <div key={key} className="flex items-center gap-2.5 shrink-0">
            <span className="text-[10px] font-mono tracking-wider text-slate">{label}</span>
            <span className="text-sm font-mono font-medium text-ink">
              {d.value}
              {d.unit}
            </span>
            <Sparkline data={d.trend} color={color} width={44} height={16} />
          </div>
        )
      })}
    </div>
  )
}
