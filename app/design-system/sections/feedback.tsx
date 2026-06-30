'use client'

import { SectionTitle, DocCard } from '../doc-components'
import { ToastDemo } from '../demos'

export function FeedbackSection() {
  return (
    <section>
      <SectionTitle
        eyebrow="Feedback"
        title="Toast"
        description="Non-blocking notifications that auto-dismiss after 4.5 s. Wired via ToastProvider in the root layout — survives client-side navigations."
      />
      <div className="space-y-5">
        <DocCard
          title="Variants — click to trigger"
          description="Four variants mapping to semantic status colors. Toasts stack and animate with Framer Motion."
        >
          <ToastDemo />
        </DocCard>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <DocCard title="API">
            <pre className="text-xs leading-relaxed text-ink-muted">{`import { useToast } from '@/components/ui/toaster'
import {
  SearchIcon,
  CheckCircleIcon,
  InfoCircleIcon,
  WarningTriangleIcon,
  XCircleIcon,
  XIcon,
  SpinnerIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  PlusIcon,
  CheckIcon,
  PdfIcon,
  MenuIcon,
  GridIcon,
  ReceiptIcon,
  StatusDotIcon,
  UploadCloudIcon,
} from '@/components/icons'

const { toast } = useToast()

toast({
  variant: 'success',   // success | info | warning | error
  title: 'Bill created',
  description: 'Saved as a draft.',  // optional
})`}</pre>
          </DocCard>

          <DocCard title="When to use each variant">
            <div className="space-y-3">
              {[
                { v: 'success', use: 'Completed actions — bill created, approved, updated.' },
                { v: 'info',    use: 'Neutral updates — sync started, data loading.'        },
                { v: 'warning', use: 'Non-blocking caution — payment may be delayed.'       },
                { v: 'error',   use: 'Failures — constraint violations, save errors.'       },
              ].map(({ v, use }) => (
                <div key={v} className="flex items-start gap-3">
                  <span className="w-14 shrink-0 font-mono text-xs font-medium text-ink">{v}</span>
                  <span className="text-xs text-ink-muted">{use}</span>
                </div>
              ))}
            </div>
          </DocCard>
        </div>
      </div>
    </section>
  )
}
