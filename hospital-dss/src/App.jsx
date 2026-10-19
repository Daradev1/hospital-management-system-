import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { useAuth } from '@/contexts/AuthContext'

import Login from '@/pages/Login'
import ChangePassword from "@/pages/changePassword.jsx";
import Dashboard from '@/pages/Dashboard'
import Patients from '@/pages/Patients'
import Appointments from '@/pages/Appointments'
import Staff from '@/pages/Staff'
import Pharmacy from '@/pages/Pharmacy'
import Billing from '@/pages/Billing'
import Analytics from '@/pages/Analytics'
import Settings from '@/pages/Settings'

function FullScreenLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <p className="text-sm text-slate font-mono">Loading…</p>
    </div>
  )
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, initializing, user } = useAuth()
  if (initializing) return <FullScreenLoader />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (user?.mustResetPassword) return <Navigate to="/change-password" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/change-password" element={<ChangePassword />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="staff" element={<Staff />} />
        <Route path="pharmacy" element={<Pharmacy />} />
        <Route path="billing" element={<Billing />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}