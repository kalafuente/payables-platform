'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

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
    'focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1',
  ].join(' '),

  // High-emphasis CTA only — e.g. "New Bill", "Pay Now". Not for routine actions.
  accent: [
    'bg-accent text-accent-foreground',
    'enabled:hover:bg-accent-hover',
    'enabled:active:opacity-90',
    'focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-1',
  ].join(' '),

  secondary: [
    'bg-surface text-ink border border-line',
    'enabled:hover:bg-canvas enabled:hover:border-line-strong',
    'enabled:active:opacity-90',
    'focus-visible:ring-2 focus-visible:ring-line-strong focus-visible:ring-offset-1',
  ].join(' '),

  ghost: [
    'text-ink-muted',
    'enabled:hover:bg-slate-100 enabled:hover:text-ink',
    'enabled:active:opacity-90',
    'focus-visible:ring-2 focus-visible:ring-line-strong focus-visible:ring-offset-1',
  ].join(' '),

  danger: [
    'bg-danger text-danger-foreground',
    'enabled:hover:bg-danger-hover',
    'enabled:active:opacity-90',
    'focus-visible:ring-2 focus-visible:ring-danger/40 focus-visible:ring-offset-1',
  ].join(' '),
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-sm',
}

function Spinner() {
  return (
    <svg
      className="animate-spin size-3.5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
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
        // Base
        'inline-flex items-center justify-center font-medium select-none whitespace-nowrap',
        // Cursor — pointer on all buttons; not-allowed overrides on disabled
        'cursor-pointer disabled:cursor-not-allowed',
        // Transition
        'transition-colors duration-100',
        // Focus — only visible for keyboard navigation
        'focus-visible:outline-none',
        // Disabled — opacity only; pointer-events stay on so cursor renders correctly
        'disabled:opacity-40',
        // Variant + size
        variantClasses[variant],
        sizeClasses[size],
        // Modifiers
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading ? (
        <>
          <Spinner />
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
