import { Skeleton } from '@/components/ui/skeleton'
import { PageHeaderSkeleton } from '@/components/ui/page-header-skeleton'

// Must stay in sync with vendors-table.tsx COL_WIDTHS
const COL_WIDTHS = ['40%', '15%', '25%', '20%']

function ColGroup() {
  return (
    <colgroup>
      {COL_WIDTHS.map((w, i) => (
        <col key={i} style={{ width: w }} />
      ))}
    </colgroup>
  )
}

const TOTAL = COL_WIDTHS.length

function cellPadding(i: number) {
  if (i === 0)          return 'pl-5 lg:pl-8 pr-4'
  if (i === TOTAL - 1)  return 'pl-4 pr-5 lg:pr-8'
  return 'px-4'
}

function TableRowSkeleton() {
  return (
    <tr className="border-b border-line last:border-0">
      <td className={`${cellPadding(0)} py-3 border-r border-line`}>
        <div className="flex items-center gap-3">
          <Skeleton className="size-[36px] shrink-0 rounded-full" />
          <Skeleton className="h-3.5 w-32 rounded" />
        </div>
      </td>
      <td className={`${cellPadding(1)} py-3 text-right border-r border-line`}>
        <Skeleton className="h-3.5 w-8 rounded ml-auto" />
      </td>
      <td className={`${cellPadding(2)} py-3 text-right border-r border-line`}>
        <Skeleton className="h-3.5 w-20 rounded ml-auto" />
      </td>
      <td className={`${cellPadding(3)} py-3 text-right`}>
        <Skeleton className="h-3.5 w-20 rounded ml-auto" />
      </td>
    </tr>
  )
}

export default function VendorsLoading() {
  return (
    <>
      <PageHeaderSkeleton />

      <div className="lg:-mx-8">
        <div className="flex items-center gap-4 p-4 lg:px-8 bg-surface-subtle border-b border-line">
          <Skeleton className="h-8 w-64 rounded-full" />
        </div>

        <div className="bg-surface overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[560px]">

              <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
                <ColGroup />
                <thead className="border-b border-line">
                  <tr>
                    <th className={`${cellPadding(0)} py-2.5 text-left border-r border-line`}>
                      <Skeleton className="h-3 w-12 rounded" />
                    </th>
                    <th className={`${cellPadding(1)} py-2.5 text-right border-r border-line`}>
                      <Skeleton className="h-3 w-8 rounded ml-auto" />
                    </th>
                    <th className={`${cellPadding(2)} py-2.5 text-right border-r border-line`}>
                      <Skeleton className="h-3 w-20 rounded ml-auto" />
                    </th>
                    <th className={`${cellPadding(3)} py-2.5 text-right`}>
                      <Skeleton className="h-3 w-18 rounded ml-auto" />
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
