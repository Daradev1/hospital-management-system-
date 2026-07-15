import { StatusPill } from '@/components/ui/StatusPill'
import { MoreVertical } from 'lucide-react'

export function PatientsTable({ patients }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line text-left">
            <th className="py-3 px-4 font-mono text-[11px] tracking-wider text-slate font-medium">PATIENT ID</th>
            <th className="py-3 px-4 font-mono text-[11px] tracking-wider text-slate font-medium">NAME</th>
            <th className="py-3 px-4 font-mono text-[11px] tracking-wider text-slate font-medium">AGE/SEX</th>
            <th className="py-3 px-4 font-mono text-[11px] tracking-wider text-slate font-medium">DEPARTMENT</th>
            <th className="py-3 px-4 font-mono text-[11px] tracking-wider text-slate font-medium">STATUS</th>
            <th className="py-3 px-4 font-mono text-[11px] tracking-wider text-slate font-medium">DOCTOR</th>
            <th className="py-3 px-4 font-mono text-[11px] tracking-wider text-slate font-medium">LAST VISIT</th>
            <th className="py-3 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id} className="border-b border-line last:border-0 hover:bg-surface transition-colors">
              <td className="py-3 px-4 font-mono text-xs text-primary">{p.id}</td>
              <td className="py-3 px-4 font-medium text-ink">{p.name}</td>
              <td className="py-3 px-4 text-slate">{p.age} / {p.gender}</td>
              <td className="py-3 px-4 text-ink">{p.department}</td>
              <td className="py-3 px-4"><StatusPill status={p.status} /></td>
              <td className="py-3 px-4 text-slate">{p.doctor}</td>
              <td className="py-3 px-4 font-mono text-xs text-slate">{p.lastVisit}</td>
              <td className="py-3 px-4 text-right">
                <button className="p-1.5 rounded hover:bg-line transition-colors">
                  <MoreVertical size={15} className="text-slate" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
