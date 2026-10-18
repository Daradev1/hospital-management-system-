import { api } from './api'

export const patientsService = {
  list: ({ q, department, status } = {}) => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (department && department !== 'All') params.set('department', department)
    if (status && status !== 'All') params.set('status', status)
    const qs = params.toString()
    return api.get(`/patients${qs ? `?${qs}` : ''}`)
  },
  get: (id) => api.get(`/patients/${id}`),
  create: (data) => api.post('/patients', data),
  update: (id, data) => api.patch(`/patients/${id}`, data),
}