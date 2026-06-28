export type BillStatus =
  | 'draft'
  | 'pending'
  | 'approved'
  | 'scheduled'
  | 'paid'
  | 'overdue'

export const STATUS_LABELS: Record<BillStatus, string> = {
  draft:     'Draft',
  pending:   'Pending Approval',
  approved:  'Approved',
  scheduled: 'Scheduled',
  paid:      'Paid',
  overdue:   'Overdue',
}

export interface Bill {
  id: string
  vendorName: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  amount: number
  status: BillStatus
}

export interface LineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  amount: number
}

export type ActivityEntryType =
  | 'created'
  | 'submitted'
  | 'approved'
  | 'changes_requested'
  | 'scheduled'
  | 'paid'

export interface ActivityEntry {
  id: string
  type: ActivityEntryType
  label: string
  actor: string
  date: string
}

export interface BillDetail extends Bill {
  lineItems: LineItem[]
  activity: ActivityEntry[]
}

export const MOCK_BILLS: Bill[] = [
  // Draft
  { id: '1',  vendorName: 'Figma',              invoiceNumber: 'INV-2026-001', invoiceDate: '2026-06-20', dueDate: '2026-07-20', amount: 6_000,  status: 'draft'     },
  { id: '2',  vendorName: 'Linear',             invoiceNumber: 'INV-2026-002', invoiceDate: '2026-06-22', dueDate: '2026-07-22', amount: 3_600,  status: 'draft'     },
  { id: '3',  vendorName: 'Notion',             invoiceNumber: 'INV-2026-003', invoiceDate: '2026-06-25', dueDate: '2026-07-25', amount: 2_400,  status: 'draft'     },
  // Pending
  { id: '4',  vendorName: 'Stripe, Inc.',        invoiceNumber: 'INV-2026-004', invoiceDate: '2026-06-01', dueDate: '2026-07-01', amount: 11_500, status: 'pending'   },
  { id: '5',  vendorName: 'Amazon Web Services', invoiceNumber: 'INV-2026-005', invoiceDate: '2026-06-01', dueDate: '2026-07-15', amount: 8_240,  status: 'pending'   },
  { id: '6',  vendorName: 'Datadog',            invoiceNumber: 'INV-2026-006', invoiceDate: '2026-06-05', dueDate: '2026-07-05', amount: 14_800, status: 'pending'   },
  { id: '7',  vendorName: 'Salesforce',         invoiceNumber: 'INV-2026-007', invoiceDate: '2026-06-01', dueDate: '2026-07-01', amount: 42_000, status: 'pending'   },
  // Approved
  { id: '8',  vendorName: 'Vercel',             invoiceNumber: 'INV-2026-008', invoiceDate: '2026-05-15', dueDate: '2026-06-30', amount: 2_400,  status: 'approved'  },
  { id: '9',  vendorName: 'GitHub',             invoiceNumber: 'INV-2026-009', invoiceDate: '2026-05-20', dueDate: '2026-07-01', amount: 4_200,  status: 'approved'  },
  { id: '10', vendorName: 'HubSpot',            invoiceNumber: 'INV-2026-010', invoiceDate: '2026-06-01', dueDate: '2026-07-10', amount: 18_000, status: 'approved'  },
  // Scheduled
  { id: '11', vendorName: 'Twilio',             invoiceNumber: 'INV-2026-011', invoiceDate: '2026-05-25', dueDate: '2026-06-28', amount: 3_200,  status: 'scheduled' },
  { id: '12', vendorName: 'Cloudflare',         invoiceNumber: 'INV-2026-012', invoiceDate: '2026-06-01', dueDate: '2026-07-01', amount: 1_800,  status: 'scheduled' },
  // Paid
  { id: '13', vendorName: 'Slack',              invoiceNumber: 'INV-2026-013', invoiceDate: '2026-05-01', dueDate: '2026-06-01', amount: 7_200,  status: 'paid'      },
  { id: '14', vendorName: 'MongoDB',            invoiceNumber: 'INV-2026-014', invoiceDate: '2026-05-01', dueDate: '2026-06-01', amount: 5_600,  status: 'paid'      },
  { id: '15', vendorName: 'SendGrid',           invoiceNumber: 'INV-2026-015', invoiceDate: '2026-05-15', dueDate: '2026-06-15', amount: 1_200,  status: 'paid'      },
  // Overdue
  { id: '16', vendorName: 'Stripe, Inc.',        invoiceNumber: 'INV-2026-016', invoiceDate: '2026-05-01', dueDate: '2026-06-01', amount: 15_000, status: 'overdue'   },
  { id: '17', vendorName: 'Amazon Web Services', invoiceNumber: 'INV-2026-017', invoiceDate: '2026-05-10', dueDate: '2026-06-10', amount: 9_800,  status: 'overdue'   },
]

// ---------------------------------------------------------------------------
// Bill detail: line items and activity (newest first)
// ---------------------------------------------------------------------------

const LINE_ITEMS: Record<string, LineItem[]> = {
  '1': [
    { id: '1a', description: 'Figma Organization — 3 seats', quantity: 3, unitPrice: 2_000, amount: 6_000 },
  ],
  '2': [
    { id: '2a', description: 'Linear Business — annual subscription', quantity: 1, unitPrice: 3_600, amount: 3_600 },
  ],
  '3': [
    { id: '3a', description: 'Notion Team plan — 12 seats', quantity: 12, unitPrice: 200, amount: 2_400 },
  ],
  '4': [
    { id: '4a', description: 'Payment processing volume fee', quantity: 1, unitPrice: 8_000, amount: 8_000 },
    { id: '4b', description: 'Stripe Radar — fraud detection', quantity: 1, unitPrice: 2_000, amount: 2_000 },
    { id: '4c', description: 'Premium support',               quantity: 1, unitPrice: 1_500, amount: 1_500 },
  ],
  '5': [
    { id: '5a', description: 'EC2 compute instances',         quantity: 1, unitPrice: 5_200, amount: 5_200 },
    { id: '5b', description: 'S3 storage and requests',       quantity: 1, unitPrice: 840,   amount: 840   },
    { id: '5c', description: 'CloudFront CDN',                quantity: 1, unitPrice: 1_200, amount: 1_200 },
    { id: '5d', description: 'AWS Support — Business tier',   quantity: 1, unitPrice: 1_000, amount: 1_000 },
  ],
  '6': [
    { id: '6a', description: 'APM Pro — 10 hosts',            quantity: 10, unitPrice: 1_280, amount: 12_800 },
    { id: '6b', description: 'Log management — 30-day retention', quantity: 1, unitPrice: 2_000, amount: 2_000 },
  ],
  '7': [
    { id: '7a', description: 'Sales Cloud Professional — 20 seats', quantity: 20, unitPrice: 1_750, amount: 35_000 },
    { id: '7b', description: 'Premier support',               quantity: 1, unitPrice: 7_000, amount: 7_000 },
  ],
  '8': [
    { id: '8a', description: 'Pro team plan — annual',        quantity: 1, unitPrice: 1_800, amount: 1_800 },
    { id: '8b', description: 'Build minutes overage',         quantity: 1, unitPrice: 600,   amount: 600   },
  ],
  '9': [
    { id: '9a', description: 'GitHub Enterprise — 30 seats',  quantity: 30, unitPrice: 140, amount: 4_200 },
  ],
  '10': [
    { id: '10a', description: 'Marketing Hub Professional',   quantity: 1, unitPrice: 12_000, amount: 12_000 },
    { id: '10b', description: 'Sales Hub Starter — 10 seats', quantity: 10, unitPrice: 600,   amount: 6_000  },
  ],
  '11': [
    { id: '11a', description: 'Programmable SMS — outbound',  quantity: 1, unitPrice: 1_800, amount: 1_800 },
    { id: '11b', description: 'Programmable Voice — minutes', quantity: 1, unitPrice: 1_000, amount: 1_000 },
    { id: '11c', description: 'Phone number rental',          quantity: 1, unitPrice: 400,   amount: 400   },
  ],
  '12': [
    { id: '12a', description: 'Business plan — annual',       quantity: 1, unitPrice: 1_200, amount: 1_200 },
    { id: '12b', description: 'Workers compute usage',        quantity: 1, unitPrice: 600,   amount: 600   },
  ],
  '13': [
    { id: '13a', description: 'Slack Pro plan — 60 seats',    quantity: 60, unitPrice: 120, amount: 7_200 },
  ],
  '14': [
    { id: '14a', description: 'Atlas M30 cluster — dedicated', quantity: 1, unitPrice: 4_200, amount: 4_200 },
    { id: '14b', description: 'Continuous backup',            quantity: 1, unitPrice: 1_400, amount: 1_400 },
  ],
  '15': [
    { id: '15a', description: 'Email API — Essentials plan',  quantity: 1, unitPrice: 900, amount: 900 },
    { id: '15b', description: 'Dedicated IP add-on',          quantity: 1, unitPrice: 300, amount: 300 },
  ],
  '16': [
    { id: '16a', description: 'Payment processing volume fee', quantity: 1, unitPrice: 10_500, amount: 10_500 },
    { id: '16b', description: 'Stripe Radar — fraud detection', quantity: 1, unitPrice: 3_000, amount: 3_000 },
    { id: '16c', description: 'Premium support',               quantity: 1, unitPrice: 1_500, amount: 1_500 },
  ],
  '17': [
    { id: '17a', description: 'EC2 compute instances',         quantity: 1, unitPrice: 6_200, amount: 6_200 },
    { id: '17b', description: 'RDS database instances',        quantity: 1, unitPrice: 2_400, amount: 2_400 },
    { id: '17c', description: 'Data transfer — outbound',      quantity: 1, unitPrice: 1_200, amount: 1_200 },
  ],
}

const ACTIVITY: Record<string, ActivityEntry[]> = {
  '1': [
    { id: '1-a', type: 'created',   label: 'Bill created',              actor: 'Karen L.', date: '2026-06-20' },
  ],
  '2': [
    { id: '2-a', type: 'created',   label: 'Bill created',              actor: 'Karen L.', date: '2026-06-22' },
  ],
  '3': [
    { id: '3-a', type: 'created',   label: 'Bill created',              actor: 'Karen L.', date: '2026-06-25' },
  ],
  '4': [
    { id: '4-b', type: 'submitted', label: 'Submitted for approval',    actor: 'Karen L.', date: '2026-06-03' },
    { id: '4-a', type: 'created',   label: 'Bill created',              actor: 'Karen L.', date: '2026-06-01' },
  ],
  '5': [
    { id: '5-b', type: 'submitted', label: 'Submitted for approval',    actor: 'Karen L.', date: '2026-06-03' },
    { id: '5-a', type: 'created',   label: 'Bill created',              actor: 'Karen L.', date: '2026-06-01' },
  ],
  '6': [
    { id: '6-b', type: 'submitted', label: 'Submitted for approval',    actor: 'Karen L.', date: '2026-06-07' },
    { id: '6-a', type: 'created',   label: 'Bill created',              actor: 'Karen L.', date: '2026-06-05' },
  ],
  '7': [
    { id: '7-b', type: 'submitted', label: 'Submitted for approval',    actor: 'Karen L.', date: '2026-06-03' },
    { id: '7-a', type: 'created',   label: 'Bill created',              actor: 'Karen L.', date: '2026-06-01' },
  ],
  '8': [
    { id: '8-c', type: 'approved',  label: 'Approved',                  actor: 'David M.', date: '2026-05-22' },
    { id: '8-b', type: 'submitted', label: 'Submitted for approval',    actor: 'Karen L.', date: '2026-05-18' },
    { id: '8-a', type: 'created',   label: 'Bill created',              actor: 'Karen L.', date: '2026-05-15' },
  ],
  '9': [
    { id: '9-c', type: 'approved',  label: 'Approved',                  actor: 'David M.', date: '2026-06-05' },
    { id: '9-b', type: 'submitted', label: 'Submitted for approval',    actor: 'Karen L.', date: '2026-05-25' },
    { id: '9-a', type: 'created',   label: 'Bill created',              actor: 'Karen L.', date: '2026-05-20' },
  ],
  '10': [
    { id: '10-c', type: 'approved',  label: 'Approved',                 actor: 'David M.', date: '2026-06-12' },
    { id: '10-b', type: 'submitted', label: 'Submitted for approval',   actor: 'Karen L.', date: '2026-06-08' },
    { id: '10-a', type: 'created',   label: 'Bill created',             actor: 'Karen L.', date: '2026-06-01' },
  ],
  '11': [
    { id: '11-d', type: 'scheduled', label: 'Payment scheduled for Jun 28', actor: 'Karen L.', date: '2026-06-06' },
    { id: '11-c', type: 'approved',  label: 'Approved',                     actor: 'David M.', date: '2026-06-04' },
    { id: '11-b', type: 'submitted', label: 'Submitted for approval',        actor: 'Karen L.', date: '2026-05-30' },
    { id: '11-a', type: 'created',   label: 'Bill created',                  actor: 'Karen L.', date: '2026-05-25' },
  ],
  '12': [
    { id: '12-d', type: 'scheduled', label: 'Payment scheduled for Jul 1', actor: 'Karen L.', date: '2026-06-12' },
    { id: '12-c', type: 'approved',  label: 'Approved',                    actor: 'David M.', date: '2026-06-10' },
    { id: '12-b', type: 'submitted', label: 'Submitted for approval',       actor: 'Karen L.', date: '2026-06-07' },
    { id: '12-a', type: 'created',   label: 'Bill created',                 actor: 'Karen L.', date: '2026-06-01' },
  ],
  '13': [
    { id: '13-e', type: 'paid',      label: 'Payment sent',                 actor: 'System',   date: '2026-06-01' },
    { id: '13-d', type: 'scheduled', label: 'Payment scheduled for Jun 1',  actor: 'Karen L.', date: '2026-05-28' },
    { id: '13-c', type: 'approved',  label: 'Approved',                     actor: 'David M.', date: '2026-05-22' },
    { id: '13-b', type: 'submitted', label: 'Submitted for approval',        actor: 'Karen L.', date: '2026-05-12' },
    { id: '13-a', type: 'created',   label: 'Bill created',                  actor: 'Karen L.', date: '2026-05-01' },
  ],
  '14': [
    { id: '14-e', type: 'paid',      label: 'Payment sent',                 actor: 'System',   date: '2026-06-01' },
    { id: '14-d', type: 'scheduled', label: 'Payment scheduled for Jun 1',  actor: 'Karen L.', date: '2026-05-27' },
    { id: '14-c', type: 'approved',  label: 'Approved',                     actor: 'David M.', date: '2026-05-18' },
    { id: '14-b', type: 'submitted', label: 'Submitted for approval',        actor: 'Karen L.', date: '2026-05-10' },
    { id: '14-a', type: 'created',   label: 'Bill created',                  actor: 'Karen L.', date: '2026-05-01' },
  ],
  '15': [
    { id: '15-e', type: 'paid',      label: 'Payment sent',                 actor: 'System',   date: '2026-06-15' },
    { id: '15-d', type: 'scheduled', label: 'Payment scheduled for Jun 15', actor: 'Karen L.', date: '2026-06-12' },
    { id: '15-c', type: 'approved',  label: 'Approved',                     actor: 'David M.', date: '2026-06-08' },
    { id: '15-b', type: 'submitted', label: 'Submitted for approval',        actor: 'Karen L.', date: '2026-05-25' },
    { id: '15-a', type: 'created',   label: 'Bill created',                  actor: 'Karen L.', date: '2026-05-15' },
  ],
  '16': [
    { id: '16-b', type: 'submitted', label: 'Submitted for approval',    actor: 'Karen L.', date: '2026-05-15' },
    { id: '16-a', type: 'created',   label: 'Bill created',              actor: 'Karen L.', date: '2026-05-01' },
  ],
  '17': [
    { id: '17-b', type: 'submitted', label: 'Submitted for approval',    actor: 'Karen L.', date: '2026-05-18' },
    { id: '17-a', type: 'created',   label: 'Bill created',              actor: 'Karen L.', date: '2026-05-10' },
  ],
}

export function getBillDetail(id: string): BillDetail | null {
  const bill = MOCK_BILLS.find(b => b.id === id)
  if (!bill) return null
  return {
    ...bill,
    lineItems: LINE_ITEMS[id] ?? [],
    activity: ACTIVITY[id] ?? [],
  }
}
