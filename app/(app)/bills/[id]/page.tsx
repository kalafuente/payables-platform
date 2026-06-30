import { cache } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/lib/db'
import type { BillDetail, BillStatus, ActivityEntryType } from '@/lib/mock-bills'
import { BillSummary } from '@/components/bills/detail/bill-summary'
import { LineItemsCard } from '@/components/bills/detail/line-items-card'
import { ActivityCard } from '@/components/bills/detail/activity-card'
import { ActionCard } from '@/components/bills/detail/action-card'
import { ChevronLeftIcon } from '@/components/icons'

export const dynamic = 'force-dynamic'

// cache() deduplicates the DB round-trip when both generateMetadata and the
// page component call this function with the same id in the same render pass.
const getBillDetail = cache(async (id: string): Promise<BillDetail | null> => {
  const row = await db.bill.findUnique({
    where: { id },
    select: {
      id:            true,
      invoiceNumber: true,
      invoiceDate:   true,
      dueDate:       true,
      amount:        true,
      status:        true,
      vendor:        { select: { name: true } },
      lineItems: {
        select: {
          id:          true,
          description: true,
          quantity:    true,
          unitPrice:   true,
          amount:      true,
        },
        orderBy: { sortOrder: 'asc' },
      },
      activityEntries: {
        select: {
          id:        true,
          type:      true,
          label:     true,
          actor:     true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!row) return null

  function toDateStr(value: Date | string): string {
    if (value instanceof Date) return value.toISOString().slice(0, 10)
    return String(value).slice(0, 10)
  }

  return {
    id:            row.id,
    vendorName:    row.vendor.name,
    invoiceNumber: row.invoiceNumber,
    invoiceDate:   toDateStr(row.invoiceDate),
    dueDate:       toDateStr(row.dueDate),
    amount:        Number(row.amount),
    status:        row.status as BillStatus,
    lineItems: row.lineItems.map(li => ({
      id:          li.id,
      description: li.description,
      quantity:    Number(li.quantity),
      unitPrice:   Number(li.unitPrice),
      amount:      Number(li.amount),
    })),
    activity: row.activityEntries.map(a => ({
      id:    a.id,
      type:  a.type as ActivityEntryType,
      label: a.label,
      actor: a.actor,
      date:  a.createdAt instanceof Date
        ? a.createdAt.toISOString().slice(0, 10)
        : String(a.createdAt).slice(0, 10),
    })),
  }
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const bill = await getBillDetail(id)
  if (!bill) return { title: 'Bill not found — Payables' }
  return { title: `${bill.vendorName} ${bill.invoiceNumber} — Payables` }
}


export default async function BillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const bill = await getBillDetail(id)

  if (!bill) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm font-medium text-ink">Bill not found</p>
        <p className="mt-1 max-w-xs text-sm text-ink-muted">
          This bill does not exist or may have been deleted.
        </p>
        <Link
          href="/bills"
          className="mt-4 text-sm text-ink-muted hover:text-ink transition-colors duration-100 underline underline-offset-2"
        >
          Back to Bills
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Back navigation */}
      <Link
        href="/bills"
        className="group mb-6 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors duration-100"
      >
        <span className="transition-transform duration-100 group-hover:-translate-x-0.5">
          <ChevronLeftIcon className="size-3.5" />
        </span>
        Bills
      </Link>

      {/*
        Grid layout: left column holds summary → line items → activity in reading
        order. Right column holds the action card and spans all three rows so it
        can remain sticky for the full scroll length of the left column.

        Mobile: single column, DOM order is summary → action → line items → activity
        so the user sees context and action before scrolling into the detail.
      */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_288px] lg:gap-x-6">

        <BillSummary bill={bill} />

        {/* Action card: right column, spans all three rows, sticky */}
        <div className="lg:row-span-3 lg:self-start lg:sticky lg:top-8">
          <ActionCard billId={bill.id} status={bill.status} dueDate={bill.dueDate} />
        </div>

        <LineItemsCard lineItems={bill.lineItems} total={bill.amount} />

        <ActivityCard activity={bill.activity} />

      </div>
    </div>
  )
}
