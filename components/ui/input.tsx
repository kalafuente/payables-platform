'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { useFormFieldContext } from './form-field'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, ...props },
  ref,
) {
  const ctx = useFormFieldContext()

  if (ctx) {
    return (
      <input
        ref={ref}
        aria-invalid={ctx.error || undefined}
        className={cn(
          'w-full bg-transparent text-sm text-ink',
          'placeholder:text-ink-subtle',
          'focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    )
  }

  return (
    <input
      ref={ref}
      aria-invalid={error || undefined}
      className={cn(
        'h-9 w-full border bg-surface px-3 text-sm text-ink',
        'placeholder:text-ink-subtle',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-colors duration-100',
        error
          ? 'border-overdue'
          : 'border-line',
        className,
      )}
      {...props}
    />
  )
})

Input.displayName = 'Input'
