'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        'h-8 w-full rounded-sm border border-line bg-surface px-3 text-sm text-ink',
        'placeholder:text-ink-subtle',
        'focus:outline-none focus:border-line-strong focus:ring-1 focus:ring-line-strong',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-colors duration-100',
        className,
      )}
      {...props}
    />
  )
})

Input.displayName = 'Input'
