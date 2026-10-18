import { api } from './api'

export const departmentsService = {
  list: () => api.get('/departments'),
}