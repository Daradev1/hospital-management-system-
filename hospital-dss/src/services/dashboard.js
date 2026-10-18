import { api } from './api'

export const dashboardService = {
  kpis: () => api.get('/dashboard/kpis'),
  admissionsTrend: () => api.get('/dashboard/admissions-trend'),
  diagnoses: () => api.get('/dashboard/diagnoses'),
  departmentLoad: () => api.get('/dashboard/department-load'),
  alerts: () => api.get('/dashboard/alerts'),
}