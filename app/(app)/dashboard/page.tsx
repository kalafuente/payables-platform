import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { NewBillButton } from '@/components/bills/new-bill-button'
import { MetricCard } from '@/components/dashboard/metric-card'
import { NeedsAttention } from '@/components/dashboard/needs-attention'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import {
  getOutstandingBills,
  getOverdueBills,
  getPendingBills,
  getPaidBills,
  sumAmount,
} from '@/lib/dashboard-data'
import { formatCurrency } from '@/lib/format'

export const metadata: Metadata = { title: 'Dashboard — Payables' }

export default function DashboardPage() {
  const outstanding = getOutstandingBills()
  const overdue = getOverdueBills()
  const pending = getPendingBills()
  const paid = getPaidBills()

  const hasOverdue = overdue.length > 0

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Accounts payable overview."
        actions={<NewBillButton />}
      />

      {/* Summary metrics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <MetricCard
          label="Total Outstanding"
          value={formatCurrency(sumAmount(outstanding))}
          detail={`${outstanding.length} bills`}
        />
        <MetricCard
          label="Overdue"
          value={formatCurrency(sumAmount(overdue))}
          detail={`${overdue.length} ${overdue.length === 1 ? 'bill' : 'bills'}`}
          variant={hasOverdue ? 'overdue' : 'default'}
        />
        <MetricCard
          label="In Review"
          value={String(pending.length)}
          detail={pending.length > 0 ? formatCurrency(sumAmount(pending)) : 'None pending'}
        />
        <MetricCard
          label="Paid This Month"
          value={formatCurrency(sumAmount(paid))}
          detail={`${paid.length} ${paid.length === 1 ? 'bill' : 'bills'}`}
        />
      </div>

      {/* Action + feed */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">
        <NeedsAttention />
        <RecentActivity />
      </div>
    </>
  )
}
