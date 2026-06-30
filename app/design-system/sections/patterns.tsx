import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { VendorAvatar } from '@/components/ui/vendor-avatar'
import { formatCurrency } from '@/lib/format'
import { SectionTitle } from '../doc-components'
import { bills } from '../data'

export function PatternsSection() {
  return (
    <section>
      <SectionTitle
        eyebrow="Patterns"
        title="Bill List"
        description="Five-column data table: vendor (with avatar), invoice number, amount, due date, status. Rows hover to bg-surface-subtle."
      />
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <p className="text-sm font-semibold text-ink">Recent Bills</p>
          <Button variant="ghost" size="sm">View all</Button>
        </div>
        <table className="w-full">
          <thead className="border-b border-line bg-surface-subtle">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-ink-muted">Vendor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-ink-muted">Invoice</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-ink-muted">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-ink-muted">Due</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-ink-muted">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {bills.map((bill) => (
              <tr key={bill.id} className="transition-colors duration-75 hover:bg-surface-subtle">
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <VendorAvatar name={bill.vendor} size={28} />
                    <span className="text-sm font-medium text-ink">{bill.vendor}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5 font-mono text-sm text-ink-muted">{bill.invoice}</td>
                <td className="px-6 py-3.5 text-right font-mono tabular-nums text-sm text-ink">{formatCurrency(bill.amount)}</td>
                <td className="px-6 py-3.5 text-sm text-ink-muted">{bill.due}</td>
                <td className="px-6 py-3.5"><Badge variant={bill.status}>{bill.label}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </section>
  )
}
