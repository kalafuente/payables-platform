import { cn } from '@/lib/utils'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export function Label({ className, children, required, ...props }: LabelProps) {
  return (
    <label
      className={cn('block text-sm font-medium text-ink', className)}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-0.5 text-overdue" aria-hidden="true">*</span>
      )}
    </label>
  )
}
