import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { formatCurrency, formatDate } from '@/lib/format'

export interface ScheduledBill {
  id:            string
  vendorName:    string
  invoiceNumber: string
  amount:        number
  scheduledDate: string
}

interface UpcomingPaymentsProps {
  bills: ScheduledBill[]
}

export function UpcomingPayments({ bills }: UpcomingPaymentsProps) {
  return (
    <Card>
      <div className="px-5 py-3.5 border-b border-line">
        <h2 className="text-sm font-medium text-ink">Upcoming Payments</h2>
      </div>

      {bills.length === 0 ? (
        <div className="px-5 py-5">
          <p className="text-sm text-ink-muted">No payments scheduled.</p>
        </div>
      ) : (
        <div>
          {bills.map(bill => (
            <Link
              key={bill.id}
              href={`/bills/${bill.id}`}
              className="flex items-center gap-3 px-5 py-3 border-b border-line last:border-b-0 hover:bg-canvas transition-colors duration-100"
            >
              <span className="flex-1 min-w-0 text-sm font-medium text-ink truncate">
                {bill.vendorName}
              </span>
              <span className="shrink-0 text-xs text-ink-subtle tabular-nums">
                {formatDate(bill.scheduledDate)}
              </span>
              <span className="shrink-0 w-20 text-right text-sm tabular-nums text-ink-muted">
                {formatCurrency(bill.amount)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </Card>
  )
}
