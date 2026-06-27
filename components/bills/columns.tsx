import type { ColumnDef, RowData } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import type { Bill } from '@/lib/mock-bills'

// Extend TanStack column meta to carry per-column alignment
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: 'left' | 'center' | 'right'
  }
}

export const STATUS_LABELS: Record<Bill['status'], string> = {
  draft:     'Draft',
  pending:   'Pending Approval',
  approved:  'Approved',
  scheduled: 'Scheduled',
  paid:      'Paid',
  overdue:   'Overdue',
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
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
