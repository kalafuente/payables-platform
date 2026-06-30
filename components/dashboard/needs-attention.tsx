import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatCurrency, formatDate } from '@/lib/format'
import { STATUS_LABELS, type Bill } from '@/lib/mock-bills'
import { ReviewButton } from './review-button'

function BillRow({ bill }: { bill: Bill }) {
  const isOverdue = bill.status === 'overdue'
  const href = `/bills/${bill.id}`
  return (
    <div className="relative flex items-center gap-4 px-5 py-3.5 border-b border-line last:border-b-0 hover:bg-canvas transition-colors duration-100">
      {/*
        Invisible full-row link sits above the static content in the paint order
        so clicking anywhere on the row navigates. ReviewButton uses z-10 to sit
        above this link so its own click handler fires instead.
      */}
      <Link href={href} className="absolute inset-0" aria-hidden="true" tabIndex={-1} />

      <span className="flex-1 min-w-0 text-sm font-medium text-ink truncate">
        {bill.vendorName}
      </span>
      <Badge variant={bill.status}>{STATUS_LABELS[bill.status]}</Badge>
      <span className="shrink-0 w-20 text-right text-sm tabular-nums text-ink-muted">
        {formatCurrency(bill.amount)}
      </span>
      <span className={cn(
        'shrink-0 w-24 text-right text-sm tabular-nums',
        isOverdue ? 'text-overdue' : 'text-ink-subtle',
      )}>
        {formatDate(bill.dueDate)}
      </span>

      <ReviewButton href={href} />
    </div>
  )
}

interface GroupHeaderProps {
  label: string
  count: number
  variant?: 'default' | 'urgent'
}

function GroupHeader({ label, count, variant = 'default' }: GroupHeaderProps) {
  const isUrgent = variant === 'urgent'
  return (
    <div className={cn(
      'px-5 py-2.5 border-b border-line',
      isUrgent ? 'bg-danger-subtle' : 'bg-canvas',
    )}>
      <p className={cn(
        'text-2xs uppercase tracking-wide',
        isUrgent ? 'font-semibold text-overdue' : 'font-medium text-ink-muted',
      )}>
        {label} · {count} {count === 1 ? 'bill' : 'bills'}
      </p>
    </div>
  )
}

interface NeedsAttentionProps {
  overdue: Bill[]
  approved: Bill[]
  drafts: Bill[]
}

export function NeedsAttention({ overdue, approved, drafts }: NeedsAttentionProps) {
  const isEmpty = overdue.length === 0 && approved.length === 0 && drafts.length === 0

  return (
    <Card>
      <div className="px-5 py-4 border-b border-line">
        <h2 className="text-base font-semibold text-ink">Needs Your Attention</h2>
      </div>

      {isEmpty ? (
        <div className="px-5 py-10 text-center">
          <p className="text-sm font-medium text-ink">All caught up.</p>
          <p className="mt-1 text-sm text-ink-muted">No bills require your action right now.</p>
        </div>
      ) : (
        <>
          {overdue.length > 0 && (
            <>
              <GroupHeader label="Overdue" count={overdue.length} variant="urgent" />
              {overdue.map(b => <BillRow key={b.id} bill={b} />)}
            </>
          )}

          {approved.length > 0 && (
            <>
              <GroupHeader label="Ready to Pay" count={approved.length} />
              {approved.map(b => <BillRow key={b.id} bill={b} />)}
            </>
          )}

          {drafts.length > 0 && (
            <>
              <GroupHeader label="Awaiting Submission" count={drafts.length} />
              {drafts.map(b => <BillRow key={b.id} bill={b} />)}
            </>
          )}
        </>
      )}
    </Card>
  )
}
