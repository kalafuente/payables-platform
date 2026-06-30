import { Skeleton } from '@/components/ui/skeleton'

// ── Bill Summary (left column, first row) ─────────────────────────────────────

function BillSummarySkeleton() {
  return (
    <div className="bg-surface border border-line rounded-lg p-6">
      {/* Vendor name + invoice number */}
      <div>
        <Skeleton className="h-6 w-40 rounded" />
        <Skeleton className="mt-1.5 h-3.5 w-28 rounded" />
      </div>
      {/* Amount due */}
      <div className="mt-6">
        <Skeleton className="h-2.5 w-20 rounded" />
        <Skeleton className="mt-2 h-9 w-36 rounded" />
      </div>
      {/* Dates */}
      <div className="mt-6 grid grid-cols-2 gap-x-8">
        <div>
          <Skeleton className="h-2.5 w-14 rounded" />
          <Skeleton className="mt-2 h-3.5 w-24 rounded" />
        </div>
        <div>
          <Skeleton className="h-2.5 w-14 rounded" />
          <Skeleton className="mt-2 h-3.5 w-24 rounded" />
        </div>
      </div>
    </div>
  )
}

// ── Action Card (right column, spans all rows) ────────────────────────────────

function ActionCardSkeleton() {
  return (
    <div className="bg-surface border border-line rounded-lg overflow-hidden">
      {/* Header: status badge */}
      <div className="px-5 py-4 border-b border-line flex items-center justify-between">
        <Skeleton className="h-3.5 w-16 rounded" />
        <Skeleton className="h-6 w-24 rounded-md" />
      </div>

      <div className="p-5 space-y-5">
        {/* Progress label */}
        <div>
          <Skeleton className="h-2.5 w-16 rounded mb-3" />
          {/* 5 lifecycle steps */}
          <ol className="space-y-3">
            {Array.from({ length: 5 }, (_, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <Skeleton className="size-4 rounded-full shrink-0" />
                <Skeleton className="h-3 rounded" style={{ width: 64 + i * 8 }} />
              </li>
            ))}
          </ol>
        </div>

        {/* Due date row */}
        <div className="pt-1">
          <Skeleton className="h-2.5 w-16 rounded mb-2" />
          <Skeleton className="h-3.5 w-24 rounded" />
        </div>

        {/* Action buttons */}
        <div className="space-y-2 pt-1">
          <Skeleton className="h-9 w-full rounded" />
          <Skeleton className="h-9 w-full rounded" />
        </div>
      </div>
    </div>
  )
}

// ── Line Items Card ───────────────────────────────────────────────────────────

function LineItemsCardSkeleton() {
  return (
    <div className="bg-surface border border-line rounded-lg overflow-hidden">
      <div className="px-5 py-3.5 border-b border-line">
        <Skeleton className="h-4 w-20 rounded" />
      </div>
      {/* Header row */}
      <div className="flex items-center gap-4 px-5 py-2.5 border-b border-line">
        <Skeleton className="h-3 flex-1 rounded" />
        <Skeleton className="h-3 w-8 rounded" />
        <Skeleton className="h-3 w-14 rounded" />
        <Skeleton className="h-3 w-14 rounded" />
      </div>
      {/* Rows */}
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="flex items-center gap-4 px-5 py-3 border-b border-line">
          <Skeleton className="h-3.5 flex-1 rounded" style={{ maxWidth: 120 + i * 32 }} />
          <Skeleton className="h-3 w-8 rounded ml-auto" />
          <Skeleton className="h-3 w-14 rounded" />
          <Skeleton className="h-3 w-14 rounded" />
        </div>
      ))}
      {/* Total */}
      <div className="flex items-center px-5 py-3 border-t border-line bg-slate-50">
        <Skeleton className="h-3.5 w-8 rounded" />
        <Skeleton className="h-3.5 w-20 rounded ml-auto" />
      </div>
    </div>
  )
}

// ── Activity Card ─────────────────────────────────────────────────────────────

function ActivityCardSkeleton() {
  return (
    <div className="bg-surface border border-line rounded-lg overflow-hidden">
      <div className="px-5 py-3.5 border-b border-line">
        <Skeleton className="h-4 w-16 rounded" />
      </div>
      <div className="p-5 space-y-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="mt-0.5 size-6 rounded-full shrink-0" />
            <div className="flex-1 min-w-0">
              <Skeleton className="h-3.5 rounded" style={{ width: `${65 - i * 8}%` }} />
              <Skeleton className="mt-1.5 h-3 w-24 rounded" />
            </div>
            <Skeleton className="h-3 w-10 rounded shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BillDetailLoading() {
  return (
    <div>
      {/* Back navigation */}
      <Skeleton className="mb-6 h-4 w-12 rounded" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_288px] lg:gap-x-6">
        <BillSummarySkeleton />

        {/* Action card: right column, spans all 3 rows */}
        <div className="lg:row-span-3 lg:self-start lg:sticky lg:top-8">
          <ActionCardSkeleton />
        </div>

        <LineItemsCardSkeleton />

        <ActivityCardSkeleton />
      </div>
    </div>
  )
}
