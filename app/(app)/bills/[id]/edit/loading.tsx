import { Skeleton } from '@/components/ui/skeleton'

function FormFieldSkeleton() {
  return (
    <div className="space-y-1.5">
      <Skeleton className="h-3.5 w-20 rounded" />
      <Skeleton className="h-10 w-full rounded" />
    </div>
  )
}

function LineItemRowSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="flex-1 h-10 rounded" />
      <Skeleton className="h-10 w-20 rounded" />
      <Skeleton className="h-10 w-28 rounded" />
      <Skeleton className="h-10 w-28 rounded" />
      <Skeleton className="size-8 rounded" />
    </div>
  )
}

export default function EditBillLoading() {
  return (
    <div>
      {/* Back link */}
      <Skeleton className="mb-6 h-4 w-8 rounded" />

      {/* Page title */}
      <Skeleton className="mb-6 h-7 w-24 rounded" />

      <div className="space-y-4">
        {/* Invoice details card */}
        <div className="bg-surface border border-line rounded-lg p-6">
          <Skeleton className="mb-5 h-4 w-28 rounded" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormFieldSkeleton />
            <FormFieldSkeleton />
            <FormFieldSkeleton />
            <FormFieldSkeleton />
          </div>
        </div>

        {/* Line items card */}
        <div className="bg-surface border border-line rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-line">
            <Skeleton className="h-4 w-20 rounded" />
          </div>
          <div className="p-6 space-y-3">
            {/* Column labels */}
            <div className="flex items-center gap-3">
              <Skeleton className="flex-1 h-3 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-3 w-28 rounded" />
              <Skeleton className="h-3 w-28 rounded" />
              <Skeleton className="size-8 rounded opacity-0" />
            </div>
            <LineItemRowSkeleton />
            <LineItemRowSkeleton />
            {/* Add row button */}
            <Skeleton className="h-9 w-32 rounded" />
          </div>
        </div>

        {/* Memo card */}
        <div className="bg-surface border border-line rounded-lg p-6">
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-10 rounded" />
            <Skeleton className="h-20 w-full rounded" />
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <Skeleton className="h-9 w-16 rounded" />
          <Skeleton className="h-9 w-24 rounded" />
          <Skeleton className="h-9 w-20 rounded" />
        </div>
      </div>
    </div>
  )
}
