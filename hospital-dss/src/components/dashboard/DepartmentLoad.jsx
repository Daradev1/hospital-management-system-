import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import { departmentLoad } from '@/data/mockData'

export function DepartmentLoad() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Load</CardTitle>
        <span className="text-xs text-slate font-mono">LIVE</span>
      </CardHeader>
      <CardBody className="space-y-3.5">
        {departmentLoad.map((d) => {
          const pct = Math.round((d.patients / d.capacity) * 100)
          const isHigh = pct >= 85
          return (
            <div key={d.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-ink">{d.name}</span>
                <span className="text-xs font-mono text-slate">
                  {d.patients}/{d.capacity} · {pct}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-line overflow-hidden">
                <div
                  className={`h-full rounded-full ${isHigh ? 'bg-alert' : 'bg-primary'}`}
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
            </div>
          )
        })}
      </CardBody>
    </Card>
  )
}
