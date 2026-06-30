'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { useFormFieldContext } from './form-field'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, error, ...props },
  ref,
) {
  const ctx = useFormFieldContext()

  if (ctx) {
    return (
      <textarea
        ref={ref}
        aria-invalid={ctx.error || undefined}
        className={cn(
          'min-h-[72px] w-full bg-transparent text-sm text-ink',
          'placeholder:text-ink-subtle',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'resize-y',
          className,
        )}
        {...props}
      />
    )
  }

  return (
    <textarea
      ref={ref}
      aria-invalid={error || undefined}
      className={cn(
        'min-h-[96px] w-full border bg-surface px-3 py-2 text-sm text-ink',
        'placeholder:text-ink-subtle',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'resize-y transition-colors duration-100',
        error
          ? 'border-overdue'
          : 'border-line',
        className,
      )}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'
