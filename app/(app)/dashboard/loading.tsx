import { Skeleton } from '@/components/ui/skeleton'

// ── Shared pieces ─────────────────────────────────────────────────────────────

function PageHeaderSkeleton() {
  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <div>
        <Skeleton className="h-12 w-36 " />
        <Skeleton className="mt-2 h-3.5 w-48 rounded" />
      </div>
      <Skeleton className="h-9 w-28 rounded" />
    </div>
  )
}

// ── Metric cards ──────────────────────────────────────────────────────────────

function MetricCardSkeleton() {
  return (
    <div className="border border-line bg-surface p-5">
      <Skeleton className="h-2.5 w-20 rounded" />
      <Skeleton className="mt-3 h-7 w-16 rounded" />
      <Skeleton className="mt-2 h-3.5 w-28 rounded" />
    </div>
  )
}

// ── Needs Attention ───────────────────────────────────────────────────────────

function BillRowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5 border-b border-line last:border-b-0">
      <Skeleton className="flex-1 h-3.5 rounded" />
      <Skeleton className="h-6 w-24 rounded-md shrink-0" />
      <Skeleton className="h-3.5 w-16 rounded shrink-0" />
      <Skeleton className="h-3 w-12 rounded shrink-0" />
    </div>
  )
}

function GroupHeaderSkeleton() {
  return (
    <div className="px-5 py-2.5 border-b border-line bg-canvas">
      <Skeleton className="h-2.5 w-32 rounded" />
    </div>
  )
}

function NeedsAttentionSkeleton() {
  return (
    <div className="bg-surface border border-line  overflow-hidden">
      <div className="px-5 py-4 border-b border-line">
        <Skeleton className="h-4 w-40 rounded" />
      </div>
      <GroupHeaderSkeleton />
      <BillRowSkeleton />
      <BillRowSkeleton />
      <GroupHeaderSkeleton />
      <BillRowSkeleton />
      <BillRowSkeleton />
      <BillRowSkeleton />
    </div>
  )
}

// ── Upcoming Payments ─────────────────────────────────────────────────────────

function PaymentRowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-5 py-3 border-b border-line last:border-b-0">
      <Skeleton className="flex-1 h-3.5 rounded" />
      <Skeleton className="h-3 w-14 rounded shrink-0" />
      <Skeleton className="h-3.5 w-16 rounded shrink-0" />
    </div>
  )
}

function UpcomingPaymentsSkeleton() {
  return (
    <div className="bg-surface border border-line  overflow-hidden">
      <div className="px-5 py-3.5 border-b border-line">
        <Skeleton className="h-4 w-36 rounded" />
      </div>
      <PaymentRowSkeleton />
      <PaymentRowSkeleton />
      <PaymentRowSkeleton />
    </div>
  )
}

// ── Recent Activity ───────────────────────────────────────────────────────────

function ActivityRowSkeleton() {
  return (
    <div className="flex items-start gap-3 px-5 py-3 border-b border-line last:border-b-0">
      <Skeleton className="mt-0.5 size-6 rounded-full shrink-0" />
      <div className="flex-1 min-w-0">
        <Skeleton className="h-3.5 w-3/4 rounded" />
        <Skeleton className="mt-1.5 h-3 w-1/2 rounded" />
      </div>
      <Skeleton className="h-3 w-10 rounded shrink-0" />
    </div>
  )
}

function RecentActivitySkeleton() {
  return (
    <div className="bg-surface border border-line  overflow-hidden">
      <div className="px-5 py-3.5 border-b border-line">
        <Skeleton className="h-4 w-28 rounded" />
      </div>
      <ActivityRowSkeleton />
      <ActivityRowSkeleton />
      <ActivityRowSkeleton />
      <ActivityRowSkeleton />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DashboardLoading() {
  return (
    <>
      <PageHeaderSkeleton />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">
        <NeedsAttentionSkeleton />
        <div className="flex flex-col gap-4">
          <UpcomingPaymentsSkeleton />
          <RecentActivitySkeleton />
        </div>
      </div>
    </>
  )
}
