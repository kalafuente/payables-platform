import { cache } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/lib/db'
import type { VendorDetail, BillStatus, ActivityEntryType } from '@/lib/mock-bills'
import { VendorSummary } from '@/components/vendors/detail/vendor-summary'
import { VendorBillsCard } from '@/components/vendors/detail/vendor-bills-card'
import { VendorInfoCard } from '@/components/vendors/detail/vendor-info-card'
import { VendorActivityCard } from '@/components/vendors/detail/vendor-activity-card'
import { ChevronLeftIcon } from '@/components/icons'

export const dynamic = 'force-dynamic'

function toDateStr(value: Date | string): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value).slice(0, 10)
}

const getVendorDetail = cache(async (id: string): Promise<VendorDetail | null> => {
  const row = await db.vendor.findUnique({
    where: { id },
    select: {
      id:        true,
      name:      true,
      email:     true,
      createdAt: true,
      bills: {
        select: {
          id:            true,
          invoiceNumber: true,
          invoiceDate:   true,
          dueDate:       true,
          amount:        true,
          status:        true,
          activityEntries: {
            select: {
              id:        true,
              type:      true,
              label:     true,
              actor:     true,
              createdAt: true,
            },
          },
        },
        orderBy: { dueDate: 'desc' },
      },
    },
  })

  if (!row) return null

  const bills = row.bills.map(b => ({
    id:            b.id,
    vendorName:    row.name,
    invoiceNumber: b.invoiceNumber,
    invoiceDate:   toDateStr(b.invoiceDate),
    dueDate:       toDateStr(b.dueDate),
    amount:        Number(b.amount),
    status:        b.status as BillStatus,
  }))

  const outstandingBalance = bills
    .filter(b => b.status !== 'paid')
    .reduce((sum, b) => sum + b.amount, 0)

  const recentActivity = row.bills
    .flatMap(b =>
      b.activityEntries.map(a => ({
        id:            a.id,
        type:          a.type as ActivityEntryType,
        label:         a.label,
        actor:         a.actor,
        date:          toDateStr(a.createdAt),
        billId:        b.id,
        invoiceNumber: b.invoiceNumber,
      }))
    )
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 10)

  return {
    id:               row.id,
    name:             row.name,
    email:            row.email,
    createdAt:        toDateStr(row.createdAt),
    outstandingBalance,
    totalBills:       bills.length,
    bills,
    recentActivity,
  }
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const vendor = await getVendorDetail(id)
  if (!vendor) return { title: 'Vendor not found — Payables' }
  return { title: `${vendor.name} — Payables` }
}

export default async function VendorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const vendor = await getVendorDetail(id)

  if (!vendor) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm font-medium text-ink">Vendor not found</p>
        <p className="mt-1 max-w-xs text-sm text-ink-muted">
          This vendor does not exist or may have been removed.
        </p>
        <Link
          href="/vendors"
          className="mt-4 text-sm text-ink-muted hover:text-ink transition-colors duration-100 underline underline-offset-2"
        >
          Back to Vendors
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link
        href="/vendors"
        className="group mb-6 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors duration-100"
      >
        <span className="transition-transform duration-100 group-hover:-translate-x-0.5">
          <ChevronLeftIcon className="size-3.5" />
        </span>
        Vendors
      </Link>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_288px] lg:gap-x-6">

        <VendorSummary vendor={vendor} />

        <div className="lg:row-span-3 lg:self-start lg:sticky lg:top-8">
          <VendorInfoCard vendor={vendor} />
        </div>

        <VendorBillsCard bills={vendor.bills} />

        <VendorActivityCard activity={vendor.recentActivity} />

      </div>
    </div>
  )
}
