import { Plus } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { AppointmentsList } from '@/components/appointments/AppointmentsList'
import { appointments } from '@/data/mockData'

export default function Appointments() {
  const confirmed = appointments.filter((a) => a.status === 'Confirmed').length

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">Appointments</h1>
          <p className="text-sm text-slate mt-0.5">
            {appointments.length} scheduled today · {confirmed} confirmed
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors w-full sm:w-auto">
          <Plus size={16} />
          New Appointment
        </button>
      </div>

      <Card className="p-4">
        <AppointmentsList appointments={appointments} />
      </Card>
    </div>
  )
}
