import type { ColumnDef, RowData } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { type Bill, STATUS_LABELS } from '@/lib/mock-bills'
import { formatCurrency, formatDate } from '@/lib/format'

// Extend TanStack column meta to carry per-column alignment
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: 'left' | 'center' | 'right'
  }
}

export const columns: ColumnDef<Bill>[] = [
  {
    accessorKey: 'vendorName',
    header: 'Vendor',
    cell: ({ row }) => (
      <span className="font-medium text-ink">{row.original.vendorName}</span>
    ),
  },
  {
    accessorKey: 'invoiceNumber',
    header: 'Invoice',
    cell: ({ row }) => (
      <span className="font-mono text-ink-muted">{row.original.invoiceNumber}</span>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    meta: { align: 'right' },
    cell: ({ row }) => (
      <span className="font-mono tabular-nums text-ink">
        {formatCurrency(row.original.amount)}
      </span>
    ),
  },
  {
    accessorKey: 'dueDate',
    header: 'Due',
    cell: ({ row }) => {
      const isOverdue = row.original.status === 'overdue'
      return (
        <span className={isOverdue ? 'text-overdue font-medium' : 'text-ink-muted'}>
          {formatDate(row.original.dueDate)}
        </span>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.original.status}>
        {STATUS_LABELS[row.original.status]}
      </Badge>
    ),
    enableSorting: false,
  },
]
