import { Card } from '@/components/ui/card'
import { formatCurrency } from '@/lib/format'
import type { LineItem } from '@/lib/mock-bills'

interface LineItemsCardProps {
  lineItems: LineItem[]
  total: number
}

export function LineItemsCard({ lineItems, total }: LineItemsCardProps) {
  return (
    <Card>
      <div className="px-5 py-3.5 border-b border-line">
        <h2 className="text-sm font-medium text-ink">Line items</h2>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-line">
            <th className="px-5 py-2.5 text-left text-xs font-medium text-ink-muted">Description</th>
            <th className="px-5 py-2.5 text-right text-xs font-medium text-ink-muted">Qty</th>
            <th className="px-5 py-2.5 text-right text-xs font-medium text-ink-muted">Unit price</th>
            <th className="px-5 py-2.5 text-right text-xs font-medium text-ink-muted">Amount</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map(item => (
            <tr key={item.id} className="border-b border-line last:border-0">
              <td className="px-5 py-3 text-sm text-ink">{item.description}</td>
              <td className="px-5 py-3 text-sm text-ink-muted text-right tabular-nums">
                {item.quantity}
              </td>
              <td className="px-5 py-3 text-sm text-ink-muted text-right font-mono tabular-nums">
                {formatCurrency(item.unitPrice)}
              </td>
              <td className="px-5 py-3 text-sm text-ink text-right font-mono tabular-nums">
                {formatCurrency(item.amount)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-line bg-slate-50">
            <td className="px-5 py-3 text-sm font-medium text-ink" colSpan={3}>Total</td>
            <td className="px-5 py-3 text-sm font-semibold text-ink text-right font-mono tabular-nums">
              {formatCurrency(total)}
            </td>
          </tr>
        </tfoot>
      </table>
    </Card>
  )
}
