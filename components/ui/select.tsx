'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

function ChevronDown() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  )
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, error, children, ...props },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={error || undefined}
        className={cn(
          'h-9 w-full appearance-none rounded-sm border bg-surface px-3 pr-8 text-sm text-ink',
          'focus:outline-none focus:ring-2 focus:ring-accent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-colors duration-100',
          error
            ? 'border-overdue focus:border-overdue'
            : 'border-line focus:border-line-strong',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-subtle">
        <ChevronDown />
      </div>
    </div>
  )
})

Select.displayName = 'Select'
