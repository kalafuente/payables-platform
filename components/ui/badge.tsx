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

export function Badge({ variant = 'default', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm',
        'px-2 py-[3px]',
        'text-xs font-medium leading-none whitespace-nowrap',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
