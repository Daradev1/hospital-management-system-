import { useMemo, useState } from 'react'
import { Plus, Filter } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input, Select } from '@/components/ui/Input'
import { PatientsTable } from '@/components/patients/PatientsTable'
import { patients } from '@/data/mockData'

const DEPARTMENTS = ['All', ...new Set(patients.map((p) => p.department))]
const STATUSES = ['All', ...new Set(patients.map((p) => p.status))]

export default function Patients() {
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState('All')
  const [status, setStatus] = useState('All')

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.id.toLowerCase().includes(query.toLowerCase())
      const matchesDept = department === 'All' || p.department === department
      const matchesStatus = status === 'All' || p.status === status
      return matchesQuery && matchesDept && matchesStatus
    })
  }, [query, department, status])

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">Patients</h1>
          <p className="text-sm text-slate mt-0.5">{patients.length} total records</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors w-full sm:w-auto">
          <Plus size={16} />
          Register Patient
        </button>
      </div>

      <Card>
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-line">
          <Input
            placeholder="Search by name or patient ID…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-xs"
          />
          <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </Select>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-slate">
            <Filter size={13} />
            {filtered.length} results
          </div>
        </div>
        <PatientsTable patients={filtered} />
      </Card>
    </div>
  )
}
