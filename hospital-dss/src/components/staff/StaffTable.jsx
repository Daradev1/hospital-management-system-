const ROLE_LABELS = {
  admin: 'Admin',
  doctor: 'Doctor',
  nurse: 'Nurse',
  records: 'Records',
  billing: 'Billing',
}

export function StaffTable({ staff }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line text-left">
            <th className="py-3 px-4 font-mono text-[11px] tracking-wider text-slate font-medium">STAFF ID</th>
            <th className="py-3 px-4 font-mono text-[11px] tracking-wider text-slate font-medium">NAME</th>
            <th className="py-3 px-4 font-mono text-[11px] tracking-wider text-slate font-medium">EMAIL</th>
            <th className="py-3 px-4 font-mono text-[11px] tracking-wider text-slate font-medium">ROLE</th>
            <th className="py-3 px-4 font-mono text-[11px] tracking-wider text-slate font-medium">DEPARTMENT</th>
            <th className="py-3 px-4 font-mono text-[11px] tracking-wider text-slate font-medium">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((s) => (
            <tr key={s.staff_code} className="border-b border-line last:border-0 hover:bg-surface transition-colors">
              <td className="py-3 px-4 font-mono text-xs text-primary">{s.staff_code}</td>
              <td className="py-3 px-4 font-medium text-ink">{s.name}</td>
              <td className="py-3 px-4 text-slate">{s.email}</td>
              <td className="py-3 px-4 text-ink">{ROLE_LABELS[s.role] || s.role}</td>
              <td className="py-3 px-4 text-slate">{s.department || '—'}</td>
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-medium font-mono ${
                    s.is_active
                      ? 'bg-signal-soft text-signal border-signal/20'
                      : 'bg-slate/10 text-slate border-slate/20'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {s.is_active ? 'Active' : 'Deactivated'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}