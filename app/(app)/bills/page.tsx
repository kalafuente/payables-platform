import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { BillsClient } from '@/components/bills/bills-client'
import { NewBillButton } from '@/components/bills/new-bill-button'
import { db } from '@/lib/db'
import type { Bill } from '@/lib/mock-bills'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Bills — Payables' }

async function getBills(): Promise<Bill[]> {
  const rows = await db.bill.findMany({
    select: {
      id:            true,
      invoiceNumber: true,
      invoiceDate:   true,
      dueDate:       true,
      amount:        true,
      status:        true,
      vendor:        { select: { name: true } },
    },
    orderBy: { dueDate: 'desc' },
  })

  return rows.map(row => ({
    id:            row.id,
    vendorName:    row.vendor.name,
    invoiceNumber: row.invoiceNumber,
    // @db.Date fields come back as Date objects at midnight UTC; slice to YYYY-MM-DD
    invoiceDate:   row.invoiceDate instanceof Date
                     ? row.invoiceDate.toISOString().slice(0, 10)
                     : String(row.invoiceDate).slice(0, 10),
    dueDate:       row.dueDate instanceof Date
                     ? row.dueDate.toISOString().slice(0, 10)
                     : String(row.dueDate).slice(0, 10),
    amount:        Number(row.amount),
    status:        row.status as Bill['status'],
  }))
}

export default async function BillsPage() {
  const bills = await getBills()

  return (
    <>
      <PageHeader
        title="Bills"
        description="Manage and track your bills and invoices."
        actions={<NewBillButton />}
      />
      {/*
        On desktop the bills content breaks out of the global p-8 container so
        the table stretches to the sidebar edge. Tabs and toolbar restore their
        own lg:px-8 so they stay horizontally aligned with the page header.
        Mobile layout is unchanged (no negative margin below lg).
      */}
      <div className="lg:-mx-8">
        <BillsClient bills={bills} />
      </div>
    </>
  )
}
