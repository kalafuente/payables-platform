import type { BadgeVariant } from '@/components/ui/badge'
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

export const colorGroups = [
  {
    label: 'Surfaces',
    colors: [
      { token: 'canvas',         label: 'Canvas',         css: '--color-canvas'         },
      { token: 'surface',        label: 'Surface',        css: '--color-surface'        },
      { token: 'surface-subtle', label: 'Surface Subtle', css: '--color-surface-subtle' },
      { token: 'sidebar',        label: 'Sidebar',        css: '--color-sidebar'        },
    ],
  },
  {
    label: 'Text',
    colors: [
      { token: 'ink',          label: 'Ink',          css: '--color-ink'          },
      { token: 'ink-muted',    label: 'Ink Muted',    css: '--color-ink-muted'    },
      { token: 'ink-subtle',   label: 'Ink Subtle',   css: '--color-ink-subtle'   },
      { token: 'ink-disabled', label: 'Ink Disabled', css: '--color-ink-disabled' },
    ],
  },
  {
    label: 'Borders',
    colors: [
      { token: 'line',        label: 'Line',        css: '--color-line'        },
      { token: 'line-strong', label: 'Line Strong', css: '--color-line-strong' },
    ],
  },
  {
    label: 'Brand',
    colors: [
      { token: 'primary', label: 'Primary', css: '--color-primary' },
      { token: 'accent',  label: 'Accent',  css: '--color-accent'  },
      { token: 'danger',  label: 'Danger',  css: '--color-danger'  },
    ],
  },
]

export const statusColors = [
  { token: 'draft',     label: 'Draft',     bg: '--color-draft-bg',     fg: '--color-draft'     },
  { token: 'pending',   label: 'Pending',   bg: '--color-pending-bg',   fg: '--color-pending'   },
  { token: 'approved',  label: 'Approved',  bg: '--color-approved-bg',  fg: '--color-approved'  },
  { token: 'scheduled', label: 'Scheduled', bg: '--color-scheduled-bg', fg: '--color-scheduled' },
  { token: 'overdue',   label: 'Overdue',   bg: '--color-overdue-bg',   fg: '--color-overdue'   },
]

export const typeScale = [
  { name: 'display', cls: 'text-display font-semibold tracking-tight', sample: 'Display' },
  { name: '2xl',     cls: 'text-2xl font-semibold',                    sample: 'Heading 2XL' },
  { name: 'xl',      cls: 'text-xl font-semibold',                     sample: 'Heading XL' },
  { name: 'lg',      cls: 'text-lg font-medium',                       sample: 'Heading LG' },
  { name: 'base',    cls: 'text-base',                                  sample: 'Base — default paragraph size (16 px)' },
  { name: 'sm',      cls: 'text-sm',                                    sample: 'Small — default UI label size (14 px)' },
  { name: 'xs',      cls: 'text-xs',                                    sample: 'Extra small — captions and metadata (12 px)' },
  { name: '2xs',     cls: 'text-2xs',                                   sample: 'Two extra small — overlines (11 px)' },
]

export const radii = [
  { name: 'xs',   cls: 'rounded-xs'   },
  { name: 'sm',   cls: 'rounded-sm'   },
  { name: 'md',   cls: 'rounded-md'   },
  { name: 'lg',   cls: 'rounded-lg'   },
  { name: 'xl',   cls: 'rounded-xl'   },
  { name: '2xl',  cls: 'rounded-2xl'  },
  { name: 'full', cls: 'rounded-full' },
]

export const motionDurations = [
  { name: 'instant', ms: '50 ms',  use: 'State swap — no perceptible motion'        },
  { name: 'fast',    ms: '100 ms', use: 'Hover states, icon swaps'                  },
  { name: 'normal',  ms: '150 ms', use: 'Standard UI transition (default)'          },
  { name: 'slow',    ms: '250 ms', use: 'Deliberate, multi-property transitions'    },
  { name: 'slower',  ms: '400 ms', use: 'Page-level or cinematic moments'           },
]

export const motionVariants = [
  { name: 'fadeIn',    use: 'Overlays, tooltips — opacity only'              },
  { name: 'slideUp',   use: 'Dropdowns, cards entering from below'           },
  { name: 'slideDown', use: 'Toasts, notifications entering from above'      },
  { name: 'scaleIn',   use: 'Modals, context menus — scale + fade'           },
  { name: 'listItem',  use: 'Staggered list rows (staggerChildren: 0.05)'    },
]

export const a11yRows = [
  {
    topic: 'Keyboard navigation',
    detail: 'All interactive elements reachable via Tab. Buttons and links activate with Enter or Space. No keyboard traps — Escape closes overlays.',
  },
  {
    topic: 'Focus-visible',
    detail: 'All focusable elements show a 2 px ring on :focus-visible (not :focus) using the primary color with ring-offset. No ring on mouse click.',
  },
  {
    topic: 'WCAG AA contrast',
    detail: 'ink on surface exceeds 7:1 (AAA). ink-muted on surface exceeds 4.5:1 (AA). All status foreground/background pairs pass AA. Danger meets AA for text and icons.',
  },
  {
    topic: 'Semantic HTML',
    detail: '<button> for every action — never <div onClick>. <label> wired via FormField. <table> for tabular data. <nav> with aria-label for navigation landmarks.',
  },
  {
    topic: 'ARIA',
    detail: 'aria-label on all icon-only controls. aria-live="polite" on the toast container. role="status" on each toast. aria-hidden="true" on decorative SVG icons.',
  },
]

export const systemIcons: { name: string; usage: string; icon: React.ReactNode }[] = [
  { name: 'Search',        usage: 'SearchInput',        icon: <SearchIcon className="size-4" /> },
  { name: 'CheckCircle',   usage: 'Toast success',      icon: <CheckCircleIcon className="size-4" /> },
  { name: 'InfoCircle',    usage: 'Toast info',         icon: <InfoCircleIcon className="size-4" /> },
  { name: 'Warning',       usage: 'Toast warning',      icon: <WarningTriangleIcon className="size-4" /> },
  { name: 'XCircle',       usage: 'Toast error',        icon: <XCircleIcon className="size-4" /> },
  { name: 'X',             usage: 'Dismiss / clear',    icon: <XIcon className="size-4" /> },
  { name: 'Spinner',       usage: 'Button loading',     icon: <SpinnerIcon className="size-4 animate-spin" /> },
  { name: 'ChevronDown',   usage: 'Select',             icon: <ChevronDownIcon className="size-4" /> },
  { name: 'ChevronLeft',   usage: 'Back navigation',    icon: <ChevronLeftIcon className="size-4" /> },
  { name: 'Plus',          usage: 'Add line item',      icon: <PlusIcon className="size-4" /> },
  { name: 'Check',         usage: 'Upload success',     icon: <CheckIcon className="size-4" /> },
  { name: 'Pdf',           usage: 'Invoice preview',    icon: <PdfIcon className="size-4" /> },
  { name: 'Menu',          usage: 'Mobile nav toggle',  icon: <MenuIcon className="size-4" /> },
  { name: 'Grid',          usage: 'Dashboard nav',      icon: <GridIcon className="size-4" /> },
  { name: 'Receipt',       usage: 'Bills nav',          icon: <ReceiptIcon className="size-4" /> },
  { name: 'StatusDot',     usage: 'Badge',              icon: <StatusDotIcon className="size-3" /> },
  { name: 'UploadCloud',   usage: 'Invoice upload',     icon: <UploadCloudIcon className="size-5" /> },
]

export const lineItems = [
  { description: 'Software infrastructure', qty: 1, amount: 9_800 },
  { description: 'API usage fees',          qty: 1, amount: 1_200 },
  { description: 'Support & maintenance',   qty: 1, amount:   500 },
]

export const bills: {
  id: string; vendor: string; invoice: string
  amount: number; due: string; status: BadgeVariant; label: string
}[] = [
  { id: '1', vendor: 'Stripe, Inc.',        invoice: 'INV-0834', amount: 11_500, due: 'Jan 15, 2026', status: 'pending',   label: 'Pending Approval' },
  { id: '2', vendor: 'Amazon Web Services', invoice: 'INV-0833', amount:  8_240, due: 'Jan 20, 2026', status: 'approved',  label: 'Approved'         },
  { id: '3', vendor: 'Figma',              invoice: 'INV-0832', amount:  6_000, due: 'Dec 31, 2025', status: 'overdue',   label: 'Overdue'          },
  { id: '4', vendor: 'Vercel',             invoice: 'INV-0831', amount:  2_400, due: 'Jan 30, 2026', status: 'scheduled', label: 'Scheduled'        },
  { id: '5', vendor: 'Notion',             invoice: 'INV-0830', amount:  1_200, due: 'Jan 10, 2026', status: 'paid',      label: 'Paid'             },
]
