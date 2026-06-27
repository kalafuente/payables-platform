import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = { title: 'Bills — Payables' }

export default function BillsPage() {
  return (
    <PageHeader
      title="Bills"
      description="Manage and track your bills and invoices."
      actions={<Button variant="accent">New Bill</Button>}
    />
  )
}
