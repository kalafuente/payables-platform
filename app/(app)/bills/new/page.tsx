import type { Metadata } from 'next'
import { db } from '@/lib/db'
import { BillCreateClient } from '@/components/bills/create/bill-create-client'

export const metadata: Metadata = { title: 'Create Bill — Payables' }

export default async function CreateBillPage() {
  const vendors = await db.vendor.findMany({
    select:  { id: true, name: true, email: true },
    orderBy: { name: 'asc' },
  })

  return <BillCreateClient vendors={vendors} />
}
