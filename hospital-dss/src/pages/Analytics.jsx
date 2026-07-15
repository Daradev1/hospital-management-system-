import { AdmissionsTrendChart } from '@/components/dashboard/AdmissionsTrendChart'
import { DiagnosisChart } from '@/components/dashboard/DiagnosisChart'
import { DepartmentLoad } from '@/components/dashboard/DepartmentLoad'

export default function Analytics() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-xl font-semibold text-ink">Analytics</h1>
        <p className="text-sm text-slate mt-0.5">Deeper decision-support views — predictive models land here</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <AdmissionsTrendChart />
        <DiagnosisChart />
      </div>
      <DepartmentLoad />
    </div>
  )
}
