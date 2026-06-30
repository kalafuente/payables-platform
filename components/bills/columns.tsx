'use client'

import Link from 'next/link'
import type { ColumnDef, RowData } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { VendorAvatar } from '@/components/ui/vendor-avatar'
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
    header: '',
    enableSorting: false,
    cell: ({ row }) => (
      // stopPropagation prevents the tr onClick from double-firing when
      // the user clicks the Review link — both go to the same URL anyway.
      <div
        className="flex justify-end"
        onClick={e => e.stopPropagation()}
      >
        <Link
          href={`/bills/${row.original.id}`}
          tabIndex={-1}
          className="inline-flex items-center justify-center h-8 px-3 text-xs font-medium select-none whitespace-nowrap rounded-sm bg-surface text-ink border border-line hover:bg-canvas hover:border-line-strong transition-colors duration-100 cursor-pointer"
        >
          Review
        </Link>
      </div>
    ),
  },
]
