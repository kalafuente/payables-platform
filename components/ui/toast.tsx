'use client'

import { cn } from '@/lib/utils'

export type ToastVariant = 'success' | 'info' | 'warning' | 'error'

export interface ToastData {
  id: string
  variant: ToastVariant
  title: string
  description?: string
}

// ── Icons ────────────────────────────────────────────────────────────────────

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="8" cy="8" r="6.5" />
      <path d="M5 8.5 7 10.5 11 6" />
    </svg>
  )
}

function InfoCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 5v0" strokeWidth="2.5" />
      <line x1="8" y1="7.5" x2="8" y2="11" />
    </svg>
  )
}

function WarningTriangleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 3 14 13H2L8 3z" />
      <line x1="8" y1="7" x2="8" y2="9.5" />
      <path d="M8 11.5v0" strokeWidth="2.5" />
    </svg>
  )
}

function XCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="8" cy="8" r="6.5" />
      <path d="M6 6l4 4M10 6l-4 4" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  )
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
