import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'

export const metadata: Metadata = { title: 'Dashboard — Payables' }

export default function DashboardPage() {
  return (
    <PageHeader
      title="Dashboard"
      description="Overview of your accounts payable activity."
    />
  )
}
