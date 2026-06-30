import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/format'
import type { ActivityEntry, ActivityEntryType } from '@/lib/mock-bills'

const DOT_COLOR: Record<ActivityEntryType, string> = {
  created:           'bg-ink-disabled',
  updated:           'bg-ink-disabled',
  submitted:         'bg-pending',
  approved:          'bg-approved',
  changes_requested: 'bg-pending',
  scheduled:         'bg-scheduled',
  paid:              'bg-paid',
}

function ActivityDot({ type }: { type: ActivityEntryType }) {
  return <div className={cn('size-2 rounded-full shrink-0 mt-[5px]', DOT_COLOR[type])} />
}

interface ActivityCardProps {
  activity: ActivityEntry[]
}

function ActivityEntryItem({ entry, isLast }: { entry: ActivityEntry; isLast: boolean }) {
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
        </p>
      </div>
    </li>
  )
}

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Card>
      <div className="px-5 py-3.5 border-b border-line">
        <h2 className="text-sm font-medium text-ink">Activity</h2>
      </div>

      <div className="px-5 py-4">
        {activity.length === 0 ? (
          <p className="text-sm text-ink-muted">No activity yet.</p>
        ) : (
          <ol className="space-y-0">
            {activity.map((entry, i) => (
              <ActivityEntryItem
                key={entry.id}
                entry={entry}
                isLast={i === activity.length - 1}
              />
            ))}
          </ol>
        )}
      </div>
    </Card>
  )
}
