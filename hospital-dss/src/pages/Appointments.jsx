import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { AppointmentsList } from '@/components/appointments/AppointmentsList'
import { appointmentsService } from '@/services/appointments'

function normalize(a) {
  return {
    id: a.appointment_code,
    time: a.appt_time?.slice(0, 5) ?? '—',
    patient: a.patient,
    doctor: a.doctor,
    department: a.department,
    status: a.status,
  }
}

export default function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    appointmentsService
      .list({ date: today })
      .then(({ appointments }) => setAppointments(appointments.map(normalize)))
      .catch((err) => setError(err.message || 'Could not load appointments'))
      .finally(() => setLoading(false))
  }, [])

  const confirmed = appointments.filter((a) => a.status === 'Confirmed').length

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">Appointments</h1>
          <p className="text-sm text-slate mt-0.5">
            {loading ? 'loading…' : `${appointments.length} scheduled today · ${confirmed} confirmed`}
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors w-full sm:w-auto">
          <Plus size={16} />
          New Appointment
        </button>
      </div>

      <Card className="p-4">
        {error ? (
          <p className="text-sm text-alert p-2">{error}</p>
        ) : (
          <AppointmentsList appointments={appointments} />
        )}
      </Card>
    </div>
  )
}