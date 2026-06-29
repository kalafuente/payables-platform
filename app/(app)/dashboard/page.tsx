import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { NewBillButton } from '@/components/bills/new-bill-button'
import { MetricCard } from '@/components/dashboard/metric-card'
import { NeedsAttention } from '@/components/dashboard/needs-attention'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { db } from '@/lib/db'
import { formatCurrency } from '@/lib/format'
import type { Bill, BillStatus } from '@/lib/mock-bills'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Dashboard — Payables' }

function toDateStr(value: Date | string): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value).slice(0, 10)
}

export default async function DashboardPage() {
  const [statusGroups, attentionRows] = await Promise.all([
    // One groupBy covers all four metric cards.
    db.bill.groupBy({
      by: ['status'],
      _count: { _all: true },
      _sum:   { amount: true },
    }),
    // NeedsAttention: overdue, ready-to-pay, and draft bills ordered soonest-first.
    db.bill.findMany({
      where: { status: { in: ['overdue', 'approved', 'draft'] } },
      select: {
        id:            true,
        invoiceNumber: true,
        invoiceDate:   true,
        dueDate:       true,
        amount:        true,
        status:        true,
        vendor:        { select: { name: true } },
      },
      orderBy: { dueDate: 'asc' },
    }),
  ])

  // Build O(1) lookup from groupBy results.
  const byStatus = new Map(
    statusGroups.map(g => [
      g.status as string,
      { count: g._count?._all ?? 0, sum: Number(g._sum?.amount ?? 0) },
    ])
  )
  const stat = (s: string) => byStatus.get(s) ?? { count: 0, sum: 0 }

  const overdue = stat('overdue')
  const pending = stat('pending')
  const paid    = stat('paid')

  // Outstanding = every status except paid.
  const outstandingCount = statusGroups
    .filter(g => g.status !== 'paid')
    .reduce((n, g) => n + (g._count?._all ?? 0), 0)
  const outstandingSum = statusGroups
    .filter(g => g.status !== 'paid')
    .reduce((s, g) => s + Number(g._sum?.amount ?? 0), 0)

  // Map Prisma rows → Bill type, then split by status for NeedsAttention.
  const attentionBills: Bill[] = attentionRows.map(row => ({
    id:            row.id,
    vendorName:    row.vendor.name,
    invoiceNumber: row.invoiceNumber,
    invoiceDate:   toDateStr(row.invoiceDate),
    dueDate:       toDateStr(row.dueDate),
    amount:        Number(row.amount),
    status:        row.status as BillStatus,
  }))

  const overdueBills  = attentionBills.filter(b => b.status === 'overdue')
  const approvedBills = attentionBills.filter(b => b.status === 'approved')
  const draftBills    = attentionBills.filter(b => b.status === 'draft')

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Accounts payable overview."
        actions={<NewBillButton />}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <MetricCard
          label="Total Outstanding"
          value={formatCurrency(outstandingSum)}
          detail={`${outstandingCount} bills`}
        />
        <MetricCard
          label="Overdue"
          value={formatCurrency(overdue.sum)}
          detail={`${overdue.count} ${overdue.count === 1 ? 'bill' : 'bills'}`}
          variant={overdue.count > 0 ? 'overdue' : 'default'}
        />
        <MetricCard
          label="In Review"
          value={String(pending.count)}
          detail={pending.count > 0 ? formatCurrency(pending.sum) : 'None pending'}
        />
        <MetricCard
          label="Paid This Month"
          value={formatCurrency(paid.sum)}
          detail={`${paid.count} ${paid.count === 1 ? 'bill' : 'bills'}`}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">
        <NeedsAttention overdue={overdueBills} approved={approvedBills} drafts={draftBills} />
        <RecentActivity entries={[]} />
      </div>
    </>
  )
}
