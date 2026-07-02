'use client'

import type { ColumnDef, RowData } from '@tanstack/react-table'
import { VendorAvatar } from '@/components/ui/vendor-avatar'
import type { Vendor } from '@/lib/mock-bills'
import { formatCurrency, formatDate } from '@/lib/format'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: 'left' | 'center' | 'right'
  }
}

export const columns: ColumnDef<Vendor>[] = [
  {
    accessorKey: 'name',
    header: 'Vendor',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <VendorAvatar name={row.original.name} />
        <p className="font-medium text-ink truncate">{row.original.name}</p>
      </div>
    ),
  },
  {
    accessorKey: 'billCount',
    header: 'Bills',
    meta: { align: 'right' },
    cell: ({ row }) => (
      <span className="tabular-nums text-ink-muted">{row.original.billCount}</span>
    ),
  },
  {
    accessorKey: 'outstandingAmount',
    header: 'Outstanding',
    meta: { align: 'right' },
    cell: ({ row }) => (
      <span className="tabular-nums text-ink">
        {row.original.outstandingAmount > 0
          ? formatCurrency(row.original.outstandingAmount)
          : <span className="text-ink-muted">—</span>}
      </span>
    ),
  },
  {
    accessorKey: 'lastInvoiceDate',
    header: 'Last invoice',
    meta: { align: 'right' },
    cell: ({ row }) => (
      <span className="tabular-nums text-ink-muted">
        {row.original.lastInvoiceDate ? formatDate(row.original.lastInvoiceDate) : '—'}
      </span>
    ),
  },
]
