'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, error, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      aria-invalid={error || undefined}
      className={cn(
        'min-h-[96px] w-full rounded-sm border bg-surface px-3 py-2 text-sm text-ink',
        'placeholder:text-ink-subtle',
        'focus:outline-none focus:ring-2 focus:ring-accent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'resize-y transition-colors duration-100',
        error
          ? 'border-overdue focus:border-overdue'
          : 'border-line focus:border-line-strong',
        className,
      )}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'
