import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { VendorsClient } from '@/components/vendors/vendors-client'
import { NewVendorButton } from '@/components/vendors/new-vendor-button'
import { db } from '@/lib/db'
import type { Vendor } from '@/lib/mock-bills'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Vendors — Payables' }

function toDateStr(value: Date | string): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value).slice(0, 10)
}

async function getVendors(): Promise<Vendor[]> {
  const rows = await db.vendor.findMany({
    select: {
      id:   true,
      name: true,
      bills: {
        select: {
          amount:      true,
          status:      true,
          invoiceDate: true,
        },
      },
    },
    orderBy: { name: 'asc' },
  })

  return rows.map(row => {
    const outstandingAmount = row.bills
      .filter(b => b.status !== 'paid')
      .reduce((sum, b) => sum + Number(b.amount), 0)

    const invoiceDates = row.bills
      .map(b => toDateStr(b.invoiceDate))
      .sort()

    const lastInvoiceDate = invoiceDates.length > 0
      ? invoiceDates[invoiceDates.length - 1]
      : null

    return {
      id:               row.id,
      name:             row.name,
      billCount:        row.bills.length,
      outstandingAmount,
      lastInvoiceDate,
    }
  })
}

export default async function VendorsPage() {
  const vendors = await getVendors()

  return (
    <>
      <PageHeader
        title="Vendors"
        description="View and manage your vendor relationships."
        actions={<NewVendorButton />}
      />
      <div className="lg:-mx-8">
        <VendorsClient vendors={vendors} />
      </div>
    </>
  )
}
