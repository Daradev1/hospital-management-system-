import { AlertTriangle, AlertCircle, Info } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import { cn } from '@/lib/cn'

const SEVERITY_CONFIG = {
  critical: { icon: AlertTriangle, color: 'text-alert', bg: 'bg-alert-soft' },
  warning: { icon: AlertCircle, color: 'text-warn', bg: 'bg-warn-soft' },
  info: { icon: Info, color: 'text-primary', bg: 'bg-primary/10' },
}

export function AlertsFeed({ alerts = [] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Decision Support Alerts</CardTitle>
        <span className="text-xs text-slate font-mono">{alerts.length} ACTIVE</span>
      </CardHeader>
      <CardBody className="space-y-1 max-h-80 overflow-y-auto">
        {alerts.map((alert) => {
          const { icon: Icon, color, bg } = SEVERITY_CONFIG[alert.severity] || SEVERITY_CONFIG.info
          return (
            <div key={alert.id} className="flex items-start gap-3 py-2.5 border-b border-line last:border-0">
              <div className={cn('w-7 h-7 rounded-md flex items-center justify-center shrink-0', bg)}>
                <Icon size={14} className={color} strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-ink leading-snug">{alert.message}</p>
                <p className="text-[11px] font-mono text-slate mt-0.5">{alert.time}</p>
              </div>
            </div>
          )
        })}
      </CardBody>
    </Card>
  )
}