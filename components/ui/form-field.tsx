import { cn } from '@/lib/utils'
import { Label } from './label'

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
    <div className={cn('flex flex-col', className)}>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>

      {description && (
        <p className="mt-0.5 text-xs text-ink-muted">{description}</p>
      )}

      <div className="mt-1.5">{children}</div>

      {error && (
        <p role="alert" className="mt-1.5 text-xs text-overdue">
          {error}
        </p>
      )}
    </div>
  )
}
