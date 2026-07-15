import { cn } from '@/lib/cn'

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'w-full px-3 py-2 rounded-md border border-line bg-panel text-sm text-ink placeholder:text-slate',
        'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors',
        className
      )}
      {...props}
    />
  )
}

export function Select({ className, children, ...props }) {
  return (
    <select
      className={cn(
        'px-3 py-2 rounded-md border border-line bg-panel text-sm text-ink',
        'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}
