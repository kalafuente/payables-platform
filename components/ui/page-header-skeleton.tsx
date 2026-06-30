import { Skeleton } from './skeleton'

interface PageHeaderSkeletonProps {
  actionWidth?: number
}

export function PageHeaderSkeleton({ actionWidth = 112 }: PageHeaderSkeletonProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <div>
        <Skeleton className="h-12 w-36 rounded-lg" />
        <Skeleton className="mt-2 h-3.5 w-48 rounded" />
      </div>
      <Skeleton className="h-9 rounded" style={{ width: actionWidth }} />
    </div>
  )
}
