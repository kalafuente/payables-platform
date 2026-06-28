import type { Metadata } from 'next'
import { BillCreateClient } from '@/components/bills/create/bill-create-client'

export const metadata: Metadata = { title: 'Create Bill — Payables' }

export default function CreateBillPage() {
  return <BillCreateClient />
}
