import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { NewBillButton } from '@/components/bills/new-bill-button'
import { MetricCard } from '@/components/dashboard/metric-card'
import { NeedsAttention } from '@/components/dashboard/needs-attention'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { UpcomingPayments, type ScheduledBill } from '@/components/dashboard/upcoming-payments'
import { db } from '@/lib/db'
import { formatCurrency } from '@/lib/format'
import type { Bill, BillStatus, ActivityEntryType } from '@/lib/mock-bills'
import type { ActivityFeedEntry } from '@/lib/dashboard-data'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Dashboard — Payables' }

function toDateStr(value: Date | string): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value).slice(0, 10)
}

export default async function DashboardPage() {
  // "Due This Week" = non-paid, non-scheduled bills with dueDate in the next 7 days.
  const today        = new Date(); today.setUTCHours(0, 0, 0, 0)
  const sevenDaysOut = new Date(today); sevenDaysOut.setUTCDate(today.getUTCDate() + 7)

  const [statusGroups, attentionRows, activityRows, scheduledRows, dueThisWeek] = await Promise.all([
    // Single groupBy covers all four metric cards.
    db.bill.groupBy({
      by:    ['status'],
      _count: { _all: true },
      _sum:   { amount: true },
    }),

    // NeedsAttention: overdue, ready-to-pay, and drafts ordered soonest first.
    db.bill.findMany({
      where:   { status: { in: ['overdue', 'approved', 'draft'] } },
      select:  {
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

    // Recent Activity: workflow state-change events only.
    // Excludes 'created' and 'updated' (passive) so every visible entry is meaningful.
    db.activityEntry.findMany({
      take:  8,
      where: { type: { in: ['submitted', 'approved', 'scheduled', 'paid'] } },
      select: {
        id:        true,
        type:      true,
        label:     true,
        actor:     true,
        createdAt: true,
        billId:    true,
        bill:      { select: { vendor: { select: { name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    }),

    // Upcoming Payments: scheduled bills ordered by payment date ascending.
    db.bill.findMany({
      where:   { status: 'scheduled' },
      select:  {
        id:            true,
        invoiceNumber: true,
        amount:        true,
        scheduledDate: true,
        vendor:        { select: { name: true } },
      },
      orderBy: { scheduledDate: 'asc' },
      take:    6,
    }),

    // Due This Week: upcoming (not past-due) bills that still need action.
    db.bill.aggregate({
      where: {
        dueDate: { gt: today, lte: sevenDaysOut },
        status:  { notIn: ['paid', 'scheduled', 'overdue'] },
      },
      _count: { _all: true },
      _sum:   { amount: true },
    }),
  ])

  // O(1) lookup from groupBy results.
  const byStatus = new Map(
    statusGroups.map(g => [
      g.status as string,
      { count: g._count?._all ?? 0, sum: Number(g._sum?.amount ?? 0) },
    ])
  )
  const stat = (s: string) => byStatus.get(s) ?? { count: 0, sum: 0 }

  const overdue  = stat('overdue')
  const approved = stat('approved')
  const pending  = stat('pending')

  const dueCount  = dueThisWeek._count?._all ?? 0
  const dueAmount = Number(dueThisWeek._sum?.amount ?? 0)

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

  const recentActivity: ActivityFeedEntry[] = activityRows.map(a => ({
    id:         a.id,
    type:       a.type as ActivityEntryType,
    label:      a.label,
    actor:      a.actor,
    date:       a.createdAt instanceof Date
      ? a.createdAt.toISOString().slice(0, 10)
      : String(a.createdAt).slice(0, 10),
    billId:     a.billId,
    vendorName: a.bill.vendor.name,
  }))

  const upcomingBills: ScheduledBill[] = scheduledRows
    .filter(r => r.scheduledDate != null)
    .map(r => ({
      id:            r.id,
      vendorName:    r.vendor.name,
      invoiceNumber: r.invoiceNumber,
      amount:        Number(r.amount),
      scheduledDate: toDateStr(r.scheduledDate!),
    }))

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Accounts payable overview."
        actions={<NewBillButton />}
      />

      {/*
        KPI cards ordered by operational priority:
        1. Overdue       — past-due bills requiring immediate action
        2. Ready to Pay  — approved bills awaiting payment scheduling
        3. Pending Approval — bills in review that may need follow-up
        4. Due This Week — upcoming bills that will need action soon
      */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <MetricCard
          label="Overdue"
          value={overdue.count > 0 ? formatCurrency(overdue.sum) : '—'}
          detail={overdue.count > 0 ? `${overdue.count} ${overdue.count === 1 ? 'bill' : 'bills'}` : 'None overdue'}
          variant={overdue.count > 0 ? 'overdue' : 'default'}
        />
        <MetricCard
          label="Ready to Pay"
          value={approved.count > 0 ? String(approved.count) : '—'}
          detail={approved.count > 0 ? formatCurrency(approved.sum) : 'Nothing to schedule'}
        />
        <MetricCard
          label="Pending Approval"
          value={pending.count > 0 ? String(pending.count) : '—'}
          detail={pending.count > 0 ? formatCurrency(pending.sum) : 'None in review'}
        />
        <MetricCard
          label="Due This Week"
          value={dueCount > 0 ? String(dueCount) : '—'}
          detail={dueCount > 0 ? formatCurrency(dueAmount) : 'Nothing due soon'}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">
        <NeedsAttention overdue={overdueBills} approved={approvedBills} drafts={draftBills} />

        {/* Right column: upcoming payments above recent activity */}
        <div className="flex flex-col gap-4">
          <UpcomingPayments bills={upcomingBills} />
          <RecentActivity entries={recentActivity} />
        </div>
      </div>
    </>
  )
}
