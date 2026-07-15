import { Search, Bell, ChevronDown, Menu } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useUI } from '@/contexts/UIContext'
import { alerts } from '@/data/mockData'

export function Topbar() {
  const { user } = useAuth()
  const { openMobileSidebar } = useUI()
  const criticalCount = alerts.filter((a) => a.severity === 'critical').length

  return (
    <header className="h-16 border-b border-line bg-panel flex items-center justify-between px-3 sm:px-6 gap-2 sm:gap-4">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <button
          onClick={openMobileSidebar}
          className="p-2 -ml-1 rounded-md hover:bg-surface transition-colors lg:hidden shrink-0"
          aria-label="Open menu"
        >
          <Menu size={20} className="text-ink/70" strokeWidth={1.8} />
        </button>

        <div className="relative w-full max-w-[160px] sm:max-w-xs md:max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
          <input
            type="text"
            placeholder="Search…"
            className="w-full pl-9 pr-3 py-2 rounded-md border border-line bg-surface text-sm placeholder:text-slate focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button className="relative p-2 rounded-md hover:bg-surface transition-colors">
          <Bell size={18} className="text-ink/70" strokeWidth={1.8} />
          {criticalCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-alert text-white text-[10px] font-mono font-medium flex items-center justify-center">
              {criticalCount}
            </span>
          )}
        </button>

        <div className="w-px h-8 bg-line hidden sm:block" />

        <button className="flex items-center gap-2.5 pl-1 pr-1 sm:pr-2 py-1 rounded-md hover:bg-surface transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-display font-semibold shrink-0">
            {user.avatarInitials}
          </div>
          <div className="text-left leading-tight hidden md:block">
            <p className="text-sm font-medium text-ink">{user.name}</p>
            <p className="text-[11px] text-slate capitalize">{user.role} · {user.department}</p>
          </div>
          <ChevronDown size={14} className="text-slate hidden sm:block" />
        </button>
      </div>
    </header>
  )
}
