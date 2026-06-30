import { Skeleton } from '@/components/ui/skeleton'
import { PageHeaderSkeleton } from '@/components/ui/page-header-skeleton'

// Must stay in sync with bills-table.tsx COL_WIDTHS
const COL_WIDTHS = ['37%', '18%', '15%', '16%', '14%']

function ColGroup() {
  return (
    <colgroup>
      {COL_WIDTHS.map((w, i) => (
        <col key={i} style={{ width: w }} />
      ))}
    </colgroup>
  )
}

// Cell padding mirrors bills-table.tsx: first col lg:pl-8, last col lg:pr-8
const TOTAL = COL_WIDTHS.length

function cellPadding(i: number) {
  if (i === 0) return 'pl-5 lg:pl-8 pr-4'
  if (i === TOTAL - 1) return 'pl-4 pr-5 lg:pr-8'
  return 'px-4'
}

function TableRowSkeleton() {
  return (
    <tr className="border-b border-line last:border-0">
      <td className={`${cellPadding(0)} py-3 border-r border-line`}>
        <div className="flex items-center gap-3">
          <Skeleton className="size-[36px] shrink-0 rounded-full" />
          <div className="flex-1 min-w-0 space-y-1.5">
            <Skeleton className="h-3.5 w-32 rounded" />
            <Skeleton className="h-3 w-24 rounded" />
          </div>
        </div>
      </td>
      <td className={`${cellPadding(1)} py-3 border-r border-line`}>
        <Skeleton className="h-6 w-24 rounded-md" />
      </td>
      <td className={`${cellPadding(2)} py-3 text-right border-r border-line`}>
        <Skeleton className="h-3.5 w-16 rounded ml-auto" />
      </td>
      <td className={`${cellPadding(3)} py-3 text-right border-r border-line`}>
        <Skeleton className="h-3.5 w-20 rounded ml-auto" />
      </td>
      <td className={`${cellPadding(4)} py-3`}>
        <Skeleton className="h-8 w-full rounded-sm" />
      </td>
    </tr>
  )
}

export default function BillsLoading() {
  return (
    <>
      <PageHeaderSkeleton actionWidth={112} />

      {/* Bills content — mirrors the lg:-mx-8 break-out of the real page */}
      <div className="lg:-mx-8">

        <div className="flex items-end gap-1 px-2 lg:pl-8 pt-1 border-b border-line overflow-x-auto">
          {[56, 44, 56, 64, 72, 36, 52].map((w, i) => (
            <div key={i} className="px-1 py-2">
              <Skeleton className="h-4 rounded" style={{ width: w }} />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 p-4 lg:px-8 bg-surface-subtle border-b border-line">
          <Skeleton className="h-8 w-64 rounded-full" />
        </div>

        <div className="bg-surface overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">

              <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
                <ColGroup />
                <thead className="border-b border-line">
                  <tr>
                    <th className={`${cellPadding(0)} py-2.5 text-left border-r border-line`}>
                      <Skeleton className="h-3 w-12 rounded" />
                    </th>
                    <th className={`${cellPadding(1)} py-2.5 text-left border-r border-line`}>
                      <Skeleton className="h-3 w-10 rounded" />
                    </th>
                    <th className={`${cellPadding(2)} py-2.5 text-right border-r border-line`}>
                      <Skeleton className="h-3 w-12 rounded ml-auto" />
                    </th>
                    <th className={`${cellPadding(3)} py-2.5 text-right border-r border-line`}>
                      <Skeleton className="h-3 w-14 rounded ml-auto" />
                    </th>
                    <th className={`${cellPadding(4)} py-2.5 text-left`}>
                      <Skeleton className="h-3 w-12 rounded" />
                    </th>
                  </tr>
                </thead>
              </table>

              <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
                <ColGroup />
                <tbody>
                  {Array.from({ length: 8 }, (_, i) => (
                    <TableRowSkeleton key={i} />
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>

      </div>
    </>
  )
}
