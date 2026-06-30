'use client'

import { createContext, useContext } from 'react'
import { cn } from '@/lib/utils'

// Input, Textarea, and Select read this to render without their own border,
// background, or focus ring when composed inside a FormField container.
export interface FormFieldContextValue {
  error: boolean
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(null)

export function useFormFieldContext() {
  return useContext(FormFieldContext)
}

export interface FormFieldProps {
  label: string
  htmlFor?: string
  description?: string
  error?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}

export function FormField({
  label,
  htmlFor,
  description,
  error,
  required,
  className,
  children,
}: FormFieldProps) {
  return (
    <FormFieldContext.Provider value={{ error: !!error }}>
      <div className={cn('flex flex-col', className)}>
        <div
          className={cn(
            'flex flex-col border bg-surface px-3 pt-2 pb-2.5',
            'transition-colors duration-100',
            'focus-within:outline-none focus-within:ring-2 focus-within:ring-accent',
            error
              ? 'border-overdue focus-within:border-overdue'
              : 'border-line focus-within:border-line-strong',
          )}
        >
          <label
            htmlFor={htmlFor}
            className="mb-0.5 text-xs font-medium text-ink-subtle"
          >
            {label}
            {required && (
              <span className="ml-0.5 text-overdue" aria-hidden="true">*</span>
            )}
          </label>

          {description && (
            <p className="mb-1 text-xs text-ink-muted">{description}</p>
          )}

          {children}
        </div>

        {error && (
          <p
            role="alert"
            id={htmlFor ? `${htmlFor}-error` : undefined}
            className="mt-1.5 text-xs text-overdue"
          >
            {error}
          </p>
        )}
      </div>
    </FormFieldContext.Provider>
  )
}
