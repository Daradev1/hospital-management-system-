import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  Stethoscope,
  Receipt,
  Pill,
  BarChart3,
  Settings,
  Activity,
  ChevronsLeft,
  X,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { useUI } from '@/contexts/UIContext'
import { useAuth } from '@/contexts/AuthContext'

// roles: undefined = visible to everyone; otherwise restricted to the listed roles
const NAV_ITEMS = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/patients', label: 'Patients', icon: Users },
  { to: '/appointments', label: 'Appointments', icon: CalendarClock },
  { to: '/staff', label: 'Staff', icon: Stethoscope, roles: ['admin'] },
  { to: '/pharmacy', label: 'Pharmacy', icon: Pill },
  { to: '/billing', label: 'Billing', icon: Receipt, roles: ['admin', 'billing'] },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
]

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, mobileSidebarOpen, closeMobileSidebar } = useUI()
  const { hasRole } = useAuth()
  const visibleNavItems = NAV_ITEMS.filter((item) => !item.roles || hasRole(...item.roles))

  return (
    <>
      {/* Backdrop — mobile only, shown while drawer is open */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-ink/50 z-40 lg:hidden"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'flex flex-col bg-ink text-white/90 shrink-0',
          'fixed inset-y-0 left-0 z-50 h-screen w-[232px] transition-transform duration-200',
          'lg:sticky lg:top-0 lg:translate-x-0 lg:transition-[width]',
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          sidebarCollapsed ? 'lg:w-[68px]' : 'lg:w-[232px]'
        )}
      >
        <div className="flex items-center gap-2.5 h-16 px-4 border-b border-white/10 shrink-0">
          <div className="w-8 h-8 rounded-md bg-signal/20 border border-signal/30 flex items-center justify-center shrink-0">
            <Activity size={16} className="text-signal" strokeWidth={2.5} />
          </div>
          {(!sidebarCollapsed || mobileSidebarOpen) && (
            <span className="font-display font-semibold text-[15px] tracking-tight text-white">
              MedIQ
            </span>
          )}
          <button
            onClick={closeMobileSidebar}
            className="ml-auto p-1.5 rounded-md hover:bg-white/10 lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 py-4 px-2.5 space-y-0.5 overflow-y-auto">
          {visibleNavItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={closeMobileSidebar}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors group relative',
                  isActive
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r bg-signal" />
                  )}
                  <Icon size={17} strokeWidth={2} className="shrink-0" />
                  {(!sidebarCollapsed || mobileSidebarOpen) && <span>{label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-2.5 border-t border-white/10 space-y-0.5 shrink-0">
          <NavLink
            to="/settings"
            onClick={closeMobileSidebar}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
              )
            }
          >
            <Settings size={17} strokeWidth={2} className="shrink-0" />
            {(!sidebarCollapsed || mobileSidebarOpen) && <span>Settings</span>}
          </NavLink>
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ChevronsLeft
              size={17}
              strokeWidth={2}
              className={cn('shrink-0 transition-transform', sidebarCollapsed && 'rotate-180')}
            />
            {!sidebarCollapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  )
}