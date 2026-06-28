import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatCurrency, formatDate } from '@/lib/format'
import { type BillDetail } from '@/lib/mock-bills'

interface BillSummaryProps {
  bill: BillDetail
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-wider text-ink-subtle mb-1">
      {children}
    </p>
  )
}

export function BillSummary({ bill }: BillSummaryProps) {
  const isOverdue = bill.status === 'overdue'

  return (
    <Card className="p-6">
      {/* Identity row */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-ink leading-tight">{bill.vendorName}</h1>
          <p className="mt-0.5 text-sm font-mono text-ink-muted">{bill.invoiceNumber}</p>
        </div>
      </div>

      {/* Amount — the focal point */}
      <div className="mt-6">
        <Label>Amount due</Label>
        <p className="text-3xl font-semibold text-ink font-mono tabular-nums leading-none">
          {formatCurrency(bill.amount)}
        </p>
      </div>

      {/* Dates */}
      <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-0">
        <div>
          <Label>Invoiced</Label>
          <p className="text-sm text-ink">{formatDate(bill.invoiceDate)}</p>
        </div>
        <div>
          <Label>Due date</Label>
          <p className={cn('text-sm', isOverdue ? 'text-overdue font-medium' : 'text-ink')}>
            {formatDate(bill.dueDate)}
            {isOverdue && <span className="ml-1.5 text-xs font-normal">· Overdue</span>}
          </p>
        </div>
      </div>
    </Card>
  )
}
