import { Sparkline } from '@/components/ui/Sparkline'
import { cn } from '@/lib/cn'

export function KpiCard({ label, value, unit, trend, color = '#12405E', accent }) {
  const delta = trend.length > 1 ? trend[trend.length - 1] - trend[trend.length - 2] : 0
  const isUp = delta > 0

  return (
    <div className="bg-panel border border-line rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-mono tracking-wider text-slate uppercase">{label}</span>
        {accent && <span className={cn('w-1.5 h-1.5 rounded-full mt-1', accent)} />}
      </div>
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-1">
          <span className="font-display text-2xl font-semibold text-ink">{value}</span>
          {unit && <span className="text-sm text-slate">{unit}</span>}
        </div>
        <Sparkline data={trend} color={color} width={56} height={22} />
      </div>
      <div className="flex items-center gap-1 text-xs">
        <span className={isUp ? 'text-signal' : 'text-alert'}>
          {isUp ? '↑' : '↓'} {Math.abs(delta).toFixed(1)}
        </span>
        <span className="text-slate">vs yesterday</span>
      </div>
    </div>
  )
}
