export function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {Icon && (
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Icon size={22} className="text-primary" strokeWidth={1.8} />
        </div>
      )}
      <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
      <p className="text-sm text-slate mt-1 max-w-sm">{description}</p>
    </div>
  )
}
