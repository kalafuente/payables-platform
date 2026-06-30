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

function IdentityRow({ vendorName, invoiceNumber }: { vendorName: string; invoiceNumber: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold text-ink leading-tight">{vendorName}</h1>
        <p className="mt-0.5 text-sm font-mono text-ink-muted">{invoiceNumber}</p>
      </div>
    </div>
  )
}

function AmountSection({ amount }: { amount: number }) {
  return (
    <div className="mt-6">
      <Label>Amount due</Label>
      <p className="text-3xl font-semibold text-ink font-mono tabular-nums leading-none">
        {formatCurrency(amount)}
      </p>
    </div>
  )
}

function DatesSection({ invoiceDate, dueDate, isOverdue }: { invoiceDate: string; dueDate: string; isOverdue: boolean }) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-0">
      <div>
        <Label>Invoiced</Label>
        <p className="text-sm text-ink">{formatDate(invoiceDate)}</p>
      </div>
      <div>
        <Label>Due date</Label>
        <p className={cn('text-sm', isOverdue ? 'text-overdue font-medium' : 'text-ink')}>
          {formatDate(dueDate)}
          {isOverdue && <span className="ml-1.5 text-xs font-normal">· Overdue</span>}
        </p>
      </div>
    </div>
  )
}

export function BillSummary({ bill }: BillSummaryProps) {
  const isOverdue = bill.status === 'overdue'

  return (
    <Card className="p-6">
      <IdentityRow vendorName={bill.vendorName} invoiceNumber={bill.invoiceNumber} />
      <AmountSection amount={bill.amount} />
      <DatesSection invoiceDate={bill.invoiceDate} dueDate={bill.dueDate} isOverdue={isOverdue} />
    </Card>
  )
}
