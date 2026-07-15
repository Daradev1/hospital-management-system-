import { Settings as SettingsIcon } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { useAuth } from '@/contexts/AuthContext'

export default function Settings() {
  const { user } = useAuth()

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-xl font-semibold text-ink">Settings</h1>
        <p className="text-sm text-slate mt-0.5">Account, roles, and system preferences</p>
      </div>

      <Card>
        <div className="p-5 border-b border-line flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-display font-semibold">
            {user.avatarInitials}
          </div>
          <div>
            <p className="font-medium text-ink">{user.name}</p>
            <p className="text-xs text-slate capitalize mt-0.5">{user.role} · {user.department}</p>
          </div>
        </div>
        <EmptyState
          icon={SettingsIcon}
          title="More settings coming"
          description="Role permissions, notification preferences, and system config will live here."
        />
      </Card>
    </div>
  )
}
