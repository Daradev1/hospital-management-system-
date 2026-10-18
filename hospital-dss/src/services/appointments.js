import { api } from './api'

export const appointmentsService = {
  list: ({ date, doctorId } = {}) => {
    const params = new URLSearchParams()
    if (date) params.set('date', date)
    if (doctorId) params.set('doctorId', doctorId)
    const qs = params.toString()
    return api.get(`/appointments${qs ? `?${qs}` : ''}`)
  },
  create: (data) => api.post('/appointments', data),
  updateStatus: (id, status) => api.patch(`/appointments/${id}/status`, { status }),
}