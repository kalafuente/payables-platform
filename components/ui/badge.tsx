import { cn } from '@/lib/utils'
import { StatusDotIcon } from '@/components/icons'

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
      <StatusDotIcon className="size-3 shrink-0" />
      {children}
    </span>
  )
}
