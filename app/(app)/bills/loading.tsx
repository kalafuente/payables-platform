import { Skeleton } from '@/components/ui/skeleton'

// Column widths must match bills-table.tsx so the header aligns with skeleton rows.
const COL_WIDTHS = ['42%', '22%', '18%', '18%']

function ColGroup() {
  return (
    <colgroup>
      {COL_WIDTHS.map((w, i) => (
        <col key={i} style={{ width: w }} />
      ))}
    </colgroup>
  )
}

function TableRowSkeleton() {
  return (
    <tr className="border-b border-line last:border-0">
      {/* Vendor — avatar + two-line text */}
      <td className="px-5 py-3">
        <div className="flex items-center gap-3">
          <Skeleton className="size-9 rounded-lg shrink-0" />
          <div className="flex-1 min-w-0 space-y-1.5">
            <Skeleton className="h-3.5 w-32 rounded" />
            <Skeleton className="h-3 w-24 rounded" />
          </div>
        </div>
      </td>
      {/* Status */}
      <td className="px-5 py-3">
        <Skeleton className="h-6 w-24 rounded-md" />
      </td>
      {/* Amount */}
      <td className="px-5 py-3 text-right">
        <Skeleton className="h-3.5 w-16 rounded ml-auto" />
      </td>
      {/* Due date */}
      <td className="px-5 py-3">
        <Skeleton className="h-3.5 w-20 rounded" />
      </td>
    </tr>
  )
}

export default function BillsLoading() {
  return (
    <>
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <Skeleton className="h-12 w-20 rounded-lg" />
          <Skeleton className="mt-2 h-3.5 w-52 rounded" />
        </div>
        <Skeleton className="h-9 w-28 rounded" />
      </div>

      {/* Card: tabs + search + table */}
      <div className="bg-surface border border-line rounded-lg overflow-hidden">

        {/* Filter tabs skeleton */}
        <div className="flex items-end gap-1 px-2 pt-1 border-b border-line">
          {[56, 44, 56, 64, 72, 36, 52].map((w, i) => (
            <div key={i} className="px-1 py-2">
              <Skeleton className="h-4 rounded" style={{ width: w }} />
            </div>
          ))}
        </div>

        {/* Search bar row */}
        <div className="flex items-center gap-4 p-4 bg-surface-subtle border-b border-line">
          <Skeleton className="h-8 w-64 rounded-full" />
        </div>

        {/* Table header — static, not animated in real UI */}
        <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
          <ColGroup />
          <thead className="border-b border-line">
            <tr>
              <th className="px-5 py-2.5 text-left">
                <Skeleton className="h-3 w-12 rounded" />
              </th>
              <th className="px-5 py-2.5 text-left">
                <Skeleton className="h-3 w-10 rounded" />
              </th>
              <th className="px-5 py-2.5 text-right">
                <Skeleton className="h-3 w-12 rounded ml-auto" />
              </th>
              <th className="px-5 py-2.5 text-left">
                <Skeleton className="h-3 w-14 rounded" />
              </th>
            </tr>
          </thead>
        </table>

        {/* Table body rows */}
        <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
          <ColGroup />
          <tbody>
            {Array.from({ length: 8 }, (_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </tbody>
        </table>

      </div>
    </>
  )
}
