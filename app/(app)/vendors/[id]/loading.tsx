import { Skeleton } from '@/components/ui/skeleton'

function VendorSummarySkeleton() {
  return (
    <div className="bg-surface border border-line p-6">
      <div className="flex items-start gap-4">
        <Skeleton className="size-12 rounded-full shrink-0" />
        <div>
          <Skeleton className="h-6 w-40 rounded" />
          <Skeleton className="mt-1.5 h-3.5 w-28 rounded" />
        </div>
      </div>
      <div className="mt-6">
        <Skeleton className="h-2.5 w-32 rounded" />
        <Skeleton className="mt-2 h-9 w-36 rounded" />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-x-4">
        {[20, 24, 16].map((w, i) => (
          <div key={i}>
            <Skeleton className="h-2.5 rounded" style={{ width: w * 4 }} />
            <Skeleton className="mt-2 h-3.5 w-6 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

function VendorInfoSkeleton() {
  return (
    <div className="bg-surface border border-line overflow-hidden">
      <div className="px-5 py-5">
        <Skeleton className="h-2.5 w-14 rounded mb-3" />
        <Skeleton className="h-3.5 w-36 rounded" />
      </div>
      <div className="border-t border-line" />
      <div className="px-5 py-5">
        <Skeleton className="h-2.5 w-24 rounded mb-3" />
        <Skeleton className="h-3.5 w-28 rounded" />
      </div>
    </div>
  )
}

function VendorBillsSkeleton() {
  return (
    <div className="bg-surface border border-line overflow-hidden">
      <div className="px-5 py-3.5 border-b border-line">
        <Skeleton className="h-4 w-10 rounded" />
      </div>
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="flex items-center gap-4 px-5 py-3 border-b border-line last:border-0">
          <div className="flex-1 min-w-0">
            <Skeleton className="h-3.5 w-24 rounded" />
            <Skeleton className="mt-1.5 h-3 w-16 rounded" />
          </div>
          <Skeleton className="h-6 w-24 rounded-md shrink-0" />
          <Skeleton className="h-3.5 w-16 rounded shrink-0 ml-auto" />
          <Skeleton className="h-3.5 w-20 rounded shrink-0" />
        </div>
      ))}
    </div>
  )
}

function VendorActivitySkeleton() {
  return (
    <div className="bg-surface border border-line overflow-hidden">
      <div className="px-5 py-3.5 border-b border-line">
        <Skeleton className="h-4 w-28 rounded" />
      </div>
      <div className="p-5 space-y-4">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="mt-0.5 size-2 rounded-full shrink-0" />
            <div className="flex-1 min-w-0">
              <Skeleton className="h-3.5 rounded" style={{ width: `${70 - i * 8}%` }} />
              <Skeleton className="mt-1.5 h-3 w-32 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function VendorDetailLoading() {
  return (
    <div>
      <Skeleton className="mb-6 h-4 w-14 rounded" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_288px] lg:gap-x-6">
        <VendorSummarySkeleton />
        <div className="lg:row-span-3 lg:self-start lg:sticky lg:top-8">
          <VendorInfoSkeleton />
        </div>

        <VendorBillsSkeleton />
        <VendorActivitySkeleton />
      </div>
    </div>
  )
}
