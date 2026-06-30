'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { SpinnerIcon } from '@/components/icons'

export type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Replaces children with a spinner and marks the button as busy */
  loading?: boolean
  /** Stretches the button to fill its container */
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-primary text-primary-foreground',
    'enabled:hover:bg-primary-hover',
    'enabled:active:opacity-90',
  ].join(' '),

  // High-emphasis CTA only — e.g. "New Bill", "Pay Now". Not for routine actions.
  accent: [
    'bg-accent text-accent-foreground',
    'enabled:hover:bg-accent-hover',
    'enabled:active:opacity-90',
  ].join(' '),

  secondary: [
    'bg-surface text-ink border border-line',
    'enabled:hover:bg-canvas enabled:hover:border-line-strong',
    'enabled:active:opacity-90',
  ].join(' '),

  ghost: [
    'text-ink-muted',
    'enabled:hover:bg-slate-100 enabled:hover:text-ink',
    'enabled:active:opacity-90',
  ].join(' '),

  danger: [
    'bg-danger text-danger-foreground',
    'enabled:hover:bg-danger-hover',
    'enabled:active:opacity-90',
  ].join(' '),
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-sm',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    disabled,
    className,
    children,
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center font-medium select-none whitespace-nowrap',
        // Cursor — pointer on all buttons; not-allowed overrides on disabled
        'cursor-pointer disabled:cursor-not-allowed',
        'transition-colors duration-100',
        // Focus — accent ring, only visible for keyboard navigation
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        // Disabled — opacity only; pointer-events stay on so cursor renders correctly
        'disabled:opacity-40',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading ? (
        <>
          <SpinnerIcon className="animate-spin size-3.5 shrink-0" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }
