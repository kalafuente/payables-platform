import { cn } from '@/lib/utils'

interface MetricCardProps {
  label: string
  value: string
  detail?: string
  variant?: 'default' | 'overdue'
}

export function MetricCard({ label, value, detail, variant = 'default' }: MetricCardProps) {
  const isOverdue = variant === 'overdue'
  return (
    <div
      className={cn(
        'rounded-sm border p-5',
        isOverdue ? 'bg-overdue-bg border-overdue/20' : 'bg-surface border-line',
      )}
    >
      <p
        className={cn(
          'text-2xs font-medium uppercase tracking-wide',
          isOverdue ? 'text-overdue/70' : 'text-ink-muted',
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          'mt-2 text-2xl font-semibold tabular-nums',
          isOverdue ? 'text-overdue' : 'text-ink',
        )}
      >
        {value}
      </p>
      {detail && (
        <p
          className={cn(
            'mt-0.5 text-sm',
            isOverdue ? 'text-overdue/70' : 'text-ink-muted',
          )}
        >
          {detail}
        </p>
      )}
    </div>
  )
}
