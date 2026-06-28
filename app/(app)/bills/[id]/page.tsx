import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MOCK_BILLS, getBillDetail } from '@/lib/mock-bills'
import { BillSummary } from '@/components/bills/detail/bill-summary'
import { LineItemsCard } from '@/components/bills/detail/line-items-card'
import { ActivityCard } from '@/components/bills/detail/activity-card'
import { ActionCard } from '@/components/bills/detail/action-card'

export function generateStaticParams() {
  return MOCK_BILLS.map(bill => ({ id: bill.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const bill = getBillDetail(id)
  if (!bill) return { title: 'Bill not found — Payables' }
  return { title: `${bill.vendorName} ${bill.invoiceNumber} — Payables` }
}

function ChevronLeft() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-3.5"
    >
      <path d="M10 3L5 8l5 5" />
    </svg>
  )
}

export default async function BillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const bill = getBillDetail(id)

  if (!bill) notFound()

  return (
    <div>
      {/* Back navigation */}
      <Link
        href="/bills"
        className="group mb-6 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors duration-100"
      >
        <span className="transition-transform duration-100 group-hover:-translate-x-0.5">
          <ChevronLeft />
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
          <ActionCard status={bill.status} dueDate={bill.dueDate} />
        </div>

        <LineItemsCard lineItems={bill.lineItems} total={bill.amount} />

        <ActivityCard activity={bill.activity} />

      </div>
    </div>
  )
}
