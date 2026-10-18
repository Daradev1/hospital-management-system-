import { useEffect, useState } from 'react'
import { dashboardService } from '@/services/dashboard'
import { formatRelativeTime } from '@/lib/formatRelativeTime'
import { KpiCard } from '@/components/dashboard/KpiCard'
import { DepartmentLoad } from '@/components/dashboard/DepartmentLoad'
import { AdmissionsTrendChart } from '@/components/dashboard/AdmissionsTrendChart'
import { DiagnosisChart } from '@/components/dashboard/DiagnosisChart'
import { AlertsFeed } from '@/components/dashboard/AlertsFeed'

const KPI_CONFIG = [
  { key: 'bedOccupancy', label: 'Bed Occupancy', color: '#1FA98A' },
  { key: 'patientsToday', label: 'Patients Today', color: '#12405E' },
  { key: 'avgWaitTime', label: 'Avg Wait Time', color: '#C98A2C' },
  { key: 'criticalPatients', label: 'Critical Patients', color: '#C4534A' },
  { key: 'pendingAlerts', label: 'Pending Alerts', color: '#C4534A' },
  { key: 'revenueToday', label: 'Revenue Today (₦)', color: '#12405E' },
]

export default function Dashboard() {
  const [kpis, setKpis] = useState({})
  const [admissionsTrend, setAdmissionsTrend] = useState([])
  const [diagnoses, setDiagnoses] = useState([])
  const [departments, setDepartments] = useState([])
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    Promise.all([
      dashboardService.kpis(),
      dashboardService.admissionsTrend(),
      dashboardService.diagnoses(),
      dashboardService.departmentLoad(),
      dashboardService.alerts(),
    ])
      .then(([kpisRes, trendRes, diagnosesRes, deptRes, alertsRes]) => {
        if (cancelled) return
        setKpis(kpisRes)
        // Postgres COUNT(*) comes back as text over the wire — coerce to numbers for recharts
        setAdmissionsTrend(
          trendRes.trend.map((t) => ({ ...t, admissions: Number(t.admissions), discharges: Number(t.discharges) }))
        )
        setDiagnoses(diagnosesRes.diagnoses)
        setDepartments(deptRes.departments)
        setAlerts(alertsRes.alerts.map((a) => ({ ...a, time: formatRelativeTime(a.created_at) })))
      })
      .catch((err) => !cancelled && setError(err.message || 'Could not load dashboard data'))
      .finally(() => !cancelled && setLoading(false))

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return <p className="text-sm text-slate font-mono">Loading dashboard…</p>
  }
  if (error) {
    return <p className="text-sm text-alert">{error}</p>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-semibold text-ink">Overview</h1>
        <p className="text-sm text-slate mt-0.5">Hospital-wide status as of today</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {KPI_CONFIG.map(({ key, label, color }) => (
          <KpiCard key={key} label={label} {...kpis[key]} color={color} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <AdmissionsTrendChart data={admissionsTrend} />
        </div>
        <AlertsFeed alerts={alerts} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <DepartmentLoad data={departments} />
        <DiagnosisChart data={diagnoses} />
      </div>
    </div>
  )
}