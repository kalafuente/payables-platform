'use client'

import { cn } from '@/lib/utils'
import {
  CheckCircleIcon,
  InfoCircleIcon,
  WarningTriangleIcon,
  XCircleIcon,
  XIcon,
} from '@/components/icons'

export type ToastVariant = 'success' | 'info' | 'warning' | 'error'

export interface ToastData {
  id: string
  variant: ToastVariant
  title: string
  description?: string
}

// ── Variant config ────────────────────────────────────────────────────────────

interface VariantConfig {
  Icon: (props: { className?: string }) => React.ReactElement
  iconClass: string
}

const variantConfig: Record<ToastVariant, VariantConfig> = {
  success: { Icon: CheckCircleIcon,    iconClass: 'text-approved'  },
  info:    { Icon: InfoCircleIcon,     iconClass: 'text-scheduled' },
  warning: { Icon: WarningTriangleIcon, iconClass: 'text-pending'  },
  error:   { Icon: XCircleIcon,        iconClass: 'text-overdue'   },
}

// ── Toast ─────────────────────────────────────────────────────────────────────

interface ToastProps extends ToastData {
  onDismiss: () => void
}

export function Toast({ variant, title, description, onDismiss }: ToastProps) {
  const { Icon, iconClass } = variantConfig[variant]

  return (
    <div
      role="status"
      className="pointer-events-auto flex w-full items-start gap-3 rounded-lg border border-line bg-surface px-4 py-3 shadow-md"
    >
      <Icon className={cn('mt-0.5 size-4 shrink-0', iconClass)} />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ink leading-snug">{title}</p>
        {description && (
          <p className="mt-1 text-sm text-ink-muted leading-snug">{description}</p>
        )}
      </div>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="mt-0.5 shrink-0 text-ink-subtle hover:text-ink transition-colors duration-100 cursor-pointer"
      >
        <XIcon className="size-3.5" />
      </button>
    </div>
  )
}
