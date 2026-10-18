import { useEffect, useState } from 'react'
import { Plus, Filter } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input, Select } from '@/components/ui/Input'
import { PatientsTable } from '@/components/patients/PatientsTable'
import { patientsService } from '@/services/patience'
import { departmentsService } from '@/services/departments'

const STATUSES = ['All', 'Admitted', 'Critical', 'Discharged', 'Outpatient']

function normalize(p) {
  return {
    id: p.id_code,
    name: p.name,
    age: p.age,
    gender: p.gender,
    department: p.department,
    status: p.status,
    doctor: p.doctor,
    lastVisit: p.last_visit ? new Date(p.last_visit).toISOString().slice(0, 10) : '—',
  }
}

export default function Patients() {
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState('All')
  const [status, setStatus] = useState('All')
  const [departments, setDepartments] = useState(['All'])
  const [patients, setPatients] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    departmentsService
      .list()
      .then(({ departments }) => setDepartments(['All', ...departments.map((d) => d.name)]))
      .catch(() => {})
  }, [])

  // Debounce the free-text query so we're not hitting the API on every keystroke;
  // department/status changes apply immediately since they're discrete selections.
  useEffect(() => {
    const handle = setTimeout(() => {
      setLoading(true)
      patientsService
        .list({ q: query, department, status })
        .then(({ patients, total }) => {
          setPatients(patients.map(normalize))
          setTotal(total)
          setError('')
        })
        .catch((err) => setError(err.message || 'Could not load patients'))
        .finally(() => setLoading(false))
    }, 300)
    return () => clearTimeout(handle)
  }, [query, department, status])

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">Patients</h1>
          <p className="text-sm text-slate mt-0.5">{total} total records</p>
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
            {departments.map((d) => (
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
            {loading ? 'loading…' : `${patients.length} results`}
          </div>
        </div>
        {error ? (
          <p className="text-sm text-alert p-4">{error}</p>
        ) : (
          <PatientsTable patients={patients} />
        )}
      </Card>
    </div>
  )
}