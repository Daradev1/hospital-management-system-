import { kpis } from '@/data/mockData'
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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-semibold text-ink">Overview</h1>
        <p className="text-sm text-slate mt-0.5">Hospital-wide status as of today, 09 Jul 2026</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {KPI_CONFIG.map(({ key, label, color }) => (
          <KpiCard key={key} label={label} {...kpis[key]} color={color} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <AdmissionsTrendChart />
        </div>
        <AlertsFeed />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <DepartmentLoad />
        <DiagnosisChart />
      </div>
    </div>
  )
}
