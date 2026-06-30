'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/format'
import { STATUS_LABELS, type BillStatus } from '@/lib/mock-bills'
import { submitForApproval, approveBill } from '@/app/actions'
import { useToast } from '@/components/ui/toaster'


const LIFECYCLE_STEPS: { status: BillStatus; label: string }[] = [
  { status: 'draft',     label: 'Draft' },
  { status: 'pending',   label: 'Pending Approval' },
  { status: 'approved',  label: 'Approved' },
  { status: 'scheduled', label: 'Scheduled' },
  { status: 'paid',      label: 'Paid' },
]

function getLifecycleIndex(status: BillStatus): number {
  const mapped = status === 'overdue' ? 'pending' : status
  return LIFECYCLE_STEPS.findIndex(s => s.status === mapped)
}

function BillLifecycle({ status }: { status: BillStatus }) {
  const currentIndex = getLifecycleIndex(status)

  return (
    <div>
      <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-ink-subtle">
        Progress
      </p>
      <ol>
        {LIFECYCLE_STEPS.map(({ label }, i) => {
          const isCompleted = i < currentIndex
          const isCurrent   = i === currentIndex
          const isLast      = i === LIFECYCLE_STEPS.length - 1

          return (
            <li key={label} className="flex gap-2.5">
              <div className="flex flex-col items-center">
                <div className={cn(
                  'mt-[5px] size-2 shrink-0 rounded-full',
                  isCompleted  && 'bg-approved',
                  isCurrent    && 'bg-primary',
                  !isCompleted && !isCurrent && 'bg-line-strong',
                )} />
                {!isLast && (
                  <div className={cn(
                    'mt-1 min-h-[18px] w-px flex-1',
                    isCompleted ? 'bg-approved' : 'bg-line',
                  )} />
                )}
              </div>
              <p className={cn(
                'text-xs',
                !isLast     && 'pb-3',
                isCurrent   && 'font-medium text-ink',
                isCompleted && 'text-ink-muted',
                !isCompleted && !isCurrent && 'text-ink-subtle',
              )}>
                {label}
              </p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}


interface Description { state: string; action: string }

function getDescription(status: BillStatus, dueDate: string): Description {
  switch (status) {
    case 'draft':
      return {
        state:  'This bill has not been submitted for approval yet.',
        action: 'Review the line items and submit it when ready.',
      }
    case 'pending':
      return {
        state:  'This bill is awaiting approval.',
        action: 'Verify the line items and approve if the invoice is accurate.',
      }
    case 'approved':
      return {
        state:  'This bill has been approved and is ready for payment.',
        action: 'Schedule the payment to complete the process.',
      }
    case 'scheduled':
      return {
        state:  'Payment has been scheduled and is queued for processing.',
        action: 'No further action is required.',
      }
    case 'paid':
      return {
        state:  'This bill has been paid in full.',
        action: 'The payment has been sent to the vendor.',
      }
    case 'overdue':
      return {
        state:  `This bill was due on ${formatDate(dueDate)} and is past due.`,
        action: 'Immediate approval is required to initiate payment.',
      }
  }
}

// Destructive actions are plain text — never a styled button.
interface ActionSet {
  primary?:     string
  secondary?:   string
  destructive?: string
}

const ACTION_SETS: Record<BillStatus, ActionSet> = {
  draft:     { primary: 'Submit for Approval', secondary: 'Edit Bill',          destructive: 'Delete Bill'     },
  pending:   { primary: 'Approve Bill',         secondary: 'Request Changes',    destructive: 'Reject Bill'     },
  approved:  { primary: 'Schedule Payment',                                      destructive: 'Void Bill'       },
  scheduled: {                                  secondary: 'Reschedule',         destructive: 'Cancel Payment'  },
  paid:      {                                  secondary: 'Download Receipt'                                   },
  overdue:   { primary: 'Approve Bill',         secondary: 'Request Changes',    destructive: 'Reject Bill'     },
}


interface ActionCardProps {
  billId: string
  status: BillStatus
  dueDate: string
}

export function ActionCard({ billId, status, dueDate }: ActionCardProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const desc    = getDescription(status, dueDate)
  const actions = ACTION_SETS[status]
  const hasMainActions = actions.primary || actions.secondary
  const isOverdue = status === 'overdue'

  function toastOutOfScope() {
    toast({ variant: 'info', title: 'Not available in this MVP', description: 'This action is intentionally out of scope for the take-home.' })
  }

  function handlePrimary() {
    if (status === 'draft') {
      startTransition(async () => {
        await submitForApproval(billId)
        toast({ variant: 'success', title: 'Submitted for approval', description: 'The bill is now waiting for approval.' })
        router.refresh()
      })
      return
    }
    if (status === 'pending' || status === 'overdue') {
      startTransition(async () => {
        await approveBill(billId)
        toast({ variant: 'success', title: 'Bill approved', description: 'The bill is ready to be scheduled for payment.' })
        router.refresh()
      })
      return
    }
    toastOutOfScope()
  }

  function handleSecondary() {
    if (status === 'draft') {
      router.push(`/bills/${billId}/edit`)
      return
    }
    toastOutOfScope()
  }

  return (
    <Card className="overflow-hidden">

      <div className={cn(
        'px-5 pt-5 pb-5',
        isOverdue && 'bg-overdue-bg',
      )}>
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-ink-subtle">
          Status
        </p>
        <Badge variant={status}>
          {STATUS_LABELS[status]}
        </Badge>
        <p className="mt-3 text-sm text-ink-muted">{desc.state}</p>
        <p className="mt-1.5 text-sm text-ink-muted">{desc.action}</p>
      </div>

      {hasMainActions && (
        <>
          <div className="border-t border-line" />
          <div className="space-y-2 px-5 py-4">
            {actions.primary && (
              <Button
                variant="primary"
                fullWidth
                onClick={handlePrimary}
                disabled={isPending}
              >
                {status === 'draft' && isPending
                  ? 'Submitting…'
                  : (status === 'pending' || status === 'overdue') && isPending
                    ? 'Approving…'
                    : actions.primary}
              </Button>
            )}
            {actions.secondary && (
              <Button
                variant="secondary"
                fullWidth
                onClick={handleSecondary}
              >
                {actions.secondary}
              </Button>
            )}
          </div>
        </>
      )}

      {actions.destructive && (
        <>
          <div className="border-t border-line" />
          <div className="px-5 py-3">
            <button
              type="button"
              onClick={toastOutOfScope}
              className="cursor-pointer text-sm text-ink-subtle transition-colors duration-100 hover:text-overdue"
            >
              {actions.destructive}
            </button>
          </div>
        </>
      )}

      <div className="border-t border-line" />
      <div className="px-5 py-4">
        <BillLifecycle status={status} />
      </div>

    </Card>
  )
}
