'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={error || undefined}
      className={cn(
        'h-9 w-full rounded-sm border bg-surface px-3 text-sm text-ink',
        'placeholder:text-ink-subtle',
        'focus:outline-none focus:ring-2 focus:ring-accent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-colors duration-100',
        error
          ? 'border-overdue focus:border-overdue'
          : 'border-line focus:border-line-strong',
        className,
      )}
      {...props}
    />
  )
})

Input.displayName = 'Input'
