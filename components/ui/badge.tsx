import { cn } from '@/lib/utils'

export type BadgeVariant =
  | 'default'
  | 'draft'
  | 'pending'
  | 'approved'
  | 'scheduled'
  | 'paid'
  | 'overdue'

export interface BadgeProps {
  variant?: BadgeVariant
  className?: string
  children: React.ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  default:   'bg-slate-100 text-slate-600',
  draft:     'bg-draft-bg text-draft',
  pending:   'bg-pending-bg text-pending',
  approved:  'bg-approved-bg text-approved',
  scheduled: 'bg-scheduled-bg text-scheduled',
  paid:      'bg-paid-bg text-paid',
  overdue:   'bg-overdue-bg text-overdue',
}

function StatusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" />
      <path fill="currentColor" d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
    </svg>
  )
}

export function Badge({ variant = 'default', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md',
        'px-2.5 py-1',
        'text-xs font-medium leading-none whitespace-nowrap',
        variantClasses[variant],
        className,
      )}
    >
      <StatusIcon />
      {children}
    </span>
  )
}
