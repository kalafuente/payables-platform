'use client'

import type { ColumnDef, RowData } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { VendorAvatar } from '@/components/ui/vendor-avatar'
import { type Bill, STATUS_LABELS } from '@/lib/mock-bills'
import { formatCurrency, formatDate } from '@/lib/format'
import { ReviewButton } from '../dashboard/review-button'

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
      <div className="flex items-center gap-3">
        <VendorAvatar name={row.original.vendorName} />
        <div className="min-w-0">
          <p className="font-medium text-ink truncate">{row.original.vendorName}</p>
          <p className="text-xs text-ink-subtle truncate">
            {row.original.invoiceNumber} · {formatDate(row.original.invoiceDate)}
          </p>
        </div>
      </div>
    ),
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
  {
    accessorKey: 'amount',
    header: 'Amount',
    meta: { align: 'right' },
    cell: ({ row }) => (
      <span className="tabular-nums text-ink">
        {formatCurrency(row.original.amount)}
      </span>
    ),
  },
  {
    accessorKey: 'dueDate',
    header: 'Due date',
    meta: { align: 'right' },
    cell: ({ row }) => {
      const isOverdue = row.original.status === 'overdue'
      return (
        <span className={[
          'tabular-nums',
          isOverdue ? 'text-overdue font-medium' : 'text-ink-muted',
        ].join(' ')}>
          {formatDate(row.original.dueDate)}
        </span>
      )
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    enableSorting: false,
    cell: ({ row }) => (
      // stopPropagation prevents the tr onClick from double-firing when
      // the user clicks the Review link — both go to the same URL anyway.
      <div onClick={e => e.stopPropagation()}>
        <ReviewButton href={`/bills/${row.original.id}`} />
      </div>
    ),
  },
]
