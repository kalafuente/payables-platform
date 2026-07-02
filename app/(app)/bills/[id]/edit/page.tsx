import { cache } from 'react'
import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { db } from '@/lib/db'
import { BillCreateClient } from '@/components/bills/create/bill-create-client'

export const dynamic = 'force-dynamic'

const getBillForEdit = cache(async (id: string) => {
  return db.bill.findUnique({
    where: { id },
    select: {
      id:            true,
      status:        true,
      invoiceNumber: true,
      invoiceDate:   true,
      dueDate:       true,
      memo:          true,
      vendor:        { select: { id: true, name: true, email: true } },
      lineItems: {
        select: { id: true, description: true, quantity: true, unitPrice: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
  })
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const bill = await getBillForEdit(id)
  if (!bill || bill.status !== 'draft') return { title: 'Edit Bill — Payables' }
  return { title: `Edit ${bill.vendor.name} ${bill.invoiceNumber} — Payables` }
}

function toDateStr(value: Date | string): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value).slice(0, 10)
}

export default async function EditBillPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [bill, vendors] = await Promise.all([
    getBillForEdit(id),
    db.vendor.findMany({
      select:  { id: true, name: true, email: true },
      orderBy: { name: 'asc' },
    }),
  ])

  if (!bill) notFound()
  // Non-draft bills are read-only — redirect to detail page.
  if (bill.status !== 'draft') redirect(`/bills/${id}`)

  const initialValues = {
    invoiceNumber: bill.invoiceNumber,
    invoiceDate:   toDateStr(bill.invoiceDate),
    dueDate:       toDateStr(bill.dueDate),
    memo:          bill.memo ?? '',
    lineItems:     bill.lineItems.map(li => ({
      id:          li.id,
      description: li.description,
      quantity:    String(parseFloat(String(li.quantity))),
      unitPrice:   Number(li.unitPrice).toFixed(2),
    })),
  }

  const initialVendor = {
    id:    bill.vendor.id,
    name:  bill.vendor.name,
    email: bill.vendor.email,
  }

  return (
    <BillCreateClient
      billId={id}
      initialValues={initialValues}
      vendors={vendors}
      initialVendor={initialVendor}
    />
  )
}
