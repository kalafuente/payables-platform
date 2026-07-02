'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/format'
import type { VendorActivityEntry, ActivityEntryType } from '@/lib/mock-bills'

const DOT_COLOR: Record<ActivityEntryType, string> = {
  created:           'bg-ink-disabled',
  updated:           'bg-ink-disabled',
  submitted:         'bg-pending',
  approved:          'bg-approved',
  changes_requested: 'bg-pending',
  scheduled:         'bg-scheduled',
  paid:              'bg-paid',
}

interface VendorActivityCardProps {
  activity: VendorActivityEntry[]
}

function ActivityDot({ type }: { type: ActivityEntryType }) {
  return <div className={cn('size-2 rounded-full shrink-0 mt-[5px]', DOT_COLOR[type])} />
}

function ActivityItem({
  entry,
  isLast,
  onNavigateToBill,
}: {
  entry: VendorActivityEntry
  isLast: boolean
  onNavigateToBill: (billId: string) => void
}) {
  return (
    <li className="flex gap-3">
      <div className="flex flex-col items-center">
        <ActivityDot type={entry.type} />
        {!isLast && <div className="w-px flex-1 min-h-[20px] bg-line mt-1.5" />}
      </div>
      <div className={cn('pb-4', isLast && 'pb-0')}>
        <p className="text-sm text-ink leading-snug">{entry.label}</p>
        <p className="mt-0.5 text-xs text-ink-subtle">
          {entry.actor} · {formatDate(entry.date)}
          {' · '}
          <button
            type="button"
            onClick={() => onNavigateToBill(entry.billId)}
            className="text-ink-subtle hover:text-ink underline underline-offset-2 transition-colors duration-100 cursor-pointer"
          >
            {entry.invoiceNumber}
          </button>
        </p>
      </div>
    </li>
  )
}

export function VendorActivityCard({ activity }: VendorActivityCardProps) {
  const router = useRouter()

  return (
    <Card>
      <div className="px-5 py-3.5 border-b border-line">
        <h2 className="text-sm font-medium text-ink">Recent activity</h2>
      </div>

      <div className="px-5 py-4">
        {activity.length === 0 ? (
          <p className="text-sm text-ink-muted">No activity yet.</p>
        ) : (
          <ol className="space-y-0">
            {activity.map((entry, i) => (
              <ActivityItem
                key={entry.id}
                entry={entry}
                isLast={i === activity.length - 1}
                onNavigateToBill={(billId) => router.push(`/bills/${billId}`)}
              />
            ))}
          </ol>
        )}
      </div>
    </Card>
  )
}
