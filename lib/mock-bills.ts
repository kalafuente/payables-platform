export type BillStatus =
  | 'draft'
  | 'pending'
  | 'approved'
  | 'scheduled'
  | 'paid'
  | 'overdue'

export interface Bill {
  id: string
  vendorName: string
  invoiceNumber: string
  invoiceDate: string  // ISO date
  dueDate: string      // ISO date
  amount: number
  status: BillStatus
}

export const MOCK_BILLS: Bill[] = [
  // Draft
  { id: '1',  vendorName: 'Figma',             invoiceNumber: 'INV-2026-001', invoiceDate: '2026-06-20', dueDate: '2026-07-20', amount: 6_000,  status: 'draft'     },
  { id: '2',  vendorName: 'Linear',             invoiceNumber: 'INV-2026-002', invoiceDate: '2026-06-22', dueDate: '2026-07-22', amount: 3_600,  status: 'draft'     },
  { id: '3',  vendorName: 'Notion',             invoiceNumber: 'INV-2026-003', invoiceDate: '2026-06-25', dueDate: '2026-07-25', amount: 2_400,  status: 'draft'     },
  // Pending
  { id: '4',  vendorName: 'Stripe, Inc.',       invoiceNumber: 'INV-2026-004', invoiceDate: '2026-06-01', dueDate: '2026-07-01', amount: 11_500, status: 'pending'   },
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
  { id: '16', vendorName: 'Stripe, Inc.',       invoiceNumber: 'INV-2026-016', invoiceDate: '2026-05-01', dueDate: '2026-06-01', amount: 15_000, status: 'overdue'   },
  { id: '17', vendorName: 'Amazon Web Services', invoiceNumber: 'INV-2026-017', invoiceDate: '2026-05-10', dueDate: '2026-06-10', amount: 9_800,  status: 'overdue'   },
]
