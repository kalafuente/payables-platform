import { Card } from '@/components/ui/card'
import { VendorAvatar } from '@/components/ui/vendor-avatar'
import { formatCurrency } from '@/lib/format'
import type { VendorDetail, BillStatus } from '@/lib/mock-bills'

const OUTSTANDING_STATUSES: BillStatus[] = ['draft', 'pending', 'approved', 'scheduled', 'overdue']

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-wider text-ink-subtle mb-1">
      {children}
    </p>
  )
}

export function VendorSummary({ vendor }: { vendor: VendorDetail }) {
  const paidCount       = vendor.bills.filter(b => b.status === 'paid').length
  const outstandingCount = vendor.bills.filter(b => (OUTSTANDING_STATUSES as string[]).includes(b.status)).length

  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <VendorAvatar name={vendor.name} size={48} />
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-ink leading-tight">{vendor.name}</h1>
          {vendor.email && (
            <p className="mt-0.5 text-sm text-ink-muted">{vendor.email}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Label>Outstanding balance</Label>
        <p className="text-3xl font-semibold text-ink font-mono tabular-nums leading-none">
          {vendor.outstandingBalance > 0 ? formatCurrency(vendor.outstandingBalance) : '—'}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-x-4">
        <div>
          <Label>Total bills</Label>
          <p className="text-sm text-ink">{vendor.totalBills}</p>
        </div>
        <div>
          <Label>Outstanding</Label>
          <p className="text-sm text-ink">{outstandingCount}</p>
        </div>
        <div>
          <Label>Paid</Label>
          <p className="text-sm text-ink">{paidCount}</p>
        </div>
      </div>
    </Card>
  )
}
