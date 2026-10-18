import { useEffect, useState } from 'react'
import { dashboardService } from '@/services/dashboard'
import { AdmissionsTrendChart } from '@/components/dashboard/AdmissionsTrendChart'
import { DiagnosisChart } from '@/components/dashboard/DiagnosisChart'
import { DepartmentLoad } from '@/components/dashboard/DepartmentLoad'

export default function Analytics() {
  const [admissionsTrend, setAdmissionsTrend] = useState([])
  const [diagnoses, setDiagnoses] = useState([])
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      dashboardService.admissionsTrend(),
      dashboardService.diagnoses(),
      dashboardService.departmentLoad(),
    ])
      .then(([trendRes, diagnosesRes, deptRes]) => {
        setAdmissionsTrend(
          trendRes.trend.map((t) => ({ ...t, admissions: Number(t.admissions), discharges: Number(t.discharges) }))
        )
        setDiagnoses(diagnosesRes.diagnoses)
        setDepartments(deptRes.departments)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-xl font-semibold text-ink">Analytics</h1>
        <p className="text-sm text-slate mt-0.5">Deeper decision-support views — predictive models land here</p>
      </div>

      {loading ? (
        <p className="text-sm text-slate font-mono">Loading…</p>
      ) : (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <AdmissionsTrendChart data={admissionsTrend} />
            <DiagnosisChart data={diagnoses} />
          </div>
          <DepartmentLoad data={departments} />
        </>
      )}
    </div>
  )
}