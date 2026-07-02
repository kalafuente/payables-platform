'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/lib/format'
import { STATUS_LABELS, type Bill } from '@/lib/mock-bills'

interface VendorBillsCardProps {
  bills: Bill[]
}

export function VendorBillsCard({ bills }: VendorBillsCardProps) {
  const router = useRouter()

  return (
    <Card>
      <div className="px-5 py-3.5 border-b border-line">
        <h2 className="text-sm font-medium text-ink">Bills</h2>
      </div>

      {bills.length === 0 ? (
        <div className="px-5 py-6 text-sm text-ink-muted">No bills yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[480px]">
            <thead>
              <tr className="border-b border-line">
                <th className="px-5 py-2.5 text-left text-xs font-medium text-ink-muted">Invoice</th>
                <th className="px-5 py-2.5 text-left text-xs font-medium text-ink-muted">Status</th>
                <th className="px-5 py-2.5 text-right text-xs font-medium text-ink-muted">Amount</th>
                <th className="px-5 py-2.5 text-right text-xs font-medium text-ink-muted">Due date</th>
              </tr>
            </thead>
            <tbody>
              {bills.map(bill => (
                <motion.tr
                  key={bill.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.12, ease: [0, 0, 0.2, 1] }}
                  tabIndex={0}
                  aria-label={`${bill.invoiceNumber} — ${STATUS_LABELS[bill.status]}`}
                  onClick={() => router.push(`/bills/${bill.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      router.push(`/bills/${bill.id}`)
                    }
                  }}
                  className="border-b border-line last:border-0 hover:bg-slate-50 focus-visible:bg-slate-50 transition-colors duration-75 cursor-pointer"
                >
                  <td className="px-5 py-3">
                    <p className="text-sm font-medium text-ink font-mono">{bill.invoiceNumber}</p>
                    <p className="text-xs text-ink-subtle mt-0.5">{formatDate(bill.invoiceDate)}</p>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={bill.status}>{STATUS_LABELS[bill.status]}</Badge>
                  </td>
                  <td className="px-5 py-3 text-right text-sm tabular-nums text-ink">
                    {formatCurrency(bill.amount)}
                  </td>
                  <td className="px-5 py-3 text-right text-sm tabular-nums text-ink-muted">
                    {formatDate(bill.dueDate)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
