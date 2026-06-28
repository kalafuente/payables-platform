import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { BillsClient } from '@/components/bills/bills-client'
import { NewBillButton } from '@/components/bills/new-bill-button'

export const metadata: Metadata = { title: 'Bills — Payables' }

export default function BillsPage() {
  return (
    <>
      <PageHeader
        title="Bills"
        description="Manage and track your bills and invoices."
        actions={<NewBillButton />}
      />
      <BillsClient />
    </>
  )
}
