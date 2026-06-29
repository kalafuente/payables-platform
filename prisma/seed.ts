import { neonConfig } from '@neondatabase/serverless'
import ws from 'ws'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '../lib/generated/prisma/client'

// Load .env before reading DATABASE_URL
process.loadEnvFile()

// Node.js requires an explicit WebSocket constructor for Neon's serverless driver
neonConfig.webSocketConstructor = ws

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

// ── Types ─────────────────────────────────────────────────────────────────────

type Status = 'draft' | 'pending' | 'approved' | 'scheduled' | 'paid' | 'overdue'
type Method = 'ach' | 'wire' | 'check'

interface LineItemDef {
  description: string
  quantity: number
  unitPrice: number
}

interface BillDef {
  vendor: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  status: Status
  paymentMethod?: Method
  scheduledDate?: string
  paidAt?: Date
  memo?: string
  lineItems: LineItemDef[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────

// Noon UTC avoids off-by-one date issues across timezones for @db.Date fields
function isoToDate(iso: string): Date {
  return new Date(`${iso}T12:00:00Z`)
}

// Compute bill total from line items with safe decimal rounding
function totalAmount(items: LineItemDef[]): string {
  const sum = items.reduce((acc, li) => acc + Math.round(li.quantity * li.unitPrice * 100), 0)
  return (sum / 100).toFixed(2)
}

// ── Vendor catalogue ──────────────────────────────────────────────────────────

const VENDORS = [
  { name: 'Stripe',                email: 'billing@stripe.com'       },
  { name: 'Amazon Web Services',   email: 'aws-billing@amazon.com'   },
  { name: 'Vercel',                email: 'billing@vercel.com'       },
  { name: 'Figma',                 email: 'billing@figma.com'        },
  { name: 'Notion',                email: 'billing@notion.so'        },
  { name: 'GitHub',                email: 'billing@github.com'       },
  { name: 'Slack Technologies',    email: 'billing@slack.com'        },
  { name: 'HubSpot',               email: 'billing@hubspot.com'      },
  { name: 'Linear',                email: 'billing@linear.app'       },
  { name: 'OpenAI',                email: 'billing@openai.com'       },
  { name: 'Datadog',               email: 'billing@datadoghq.com'    },
  { name: 'Twilio',                email: 'billing@twilio.com'       },
  { name: 'Cloudflare',            email: 'billing@cloudflare.com'   },
]

// ── Bill definitions ──────────────────────────────────────────────────────────
// Dates relative to 2026-06-29 (today):
//   Paid:      invoiced 4–6 months ago, paid around due date
//   Overdue:   invoiced 2–3 months ago, due date has passed
//   Approved:  invoiced 1–2 months ago, due date soon or just past
//   Scheduled: invoiced 1–2 months ago, payment scheduled in July
//   Pending:   invoiced 2–4 weeks ago, under review
//   Draft:     invoiced in the last 2 weeks

const BILLS: BillDef[] = [

  // ── STRIPE ────────────────────────────────────────────────────────────────
  {
    vendor: 'Stripe',
    invoiceNumber: 'STRIPE-2025-1089',
    invoiceDate: '2025-12-01', dueDate: '2025-12-31',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2025-12-28'),
    lineItems: [
      { description: 'Platform fee',             quantity: 1, unitPrice: 2500.00 },
      { description: 'Processing fees',          quantity: 1, unitPrice: 1547.50 },
      { description: 'Radar fraud protection',   quantity: 1, unitPrice:  312.00 },
    ],
  },
  {
    vendor: 'Stripe',
    invoiceNumber: 'STRIPE-2026-0218',
    invoiceDate: '2026-02-01', dueDate: '2026-03-03',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2026-02-27'),
    lineItems: [
      { description: 'Platform fee',           quantity: 1, unitPrice: 2500.00 },
      { description: 'Processing fees',        quantity: 1, unitPrice: 1839.20 },
      { description: 'Radar fraud protection', quantity: 1, unitPrice:  312.00 },
      { description: 'Billing add-on',         quantity: 1, unitPrice:  200.00 },
    ],
  },
  {
    vendor: 'Stripe',
    invoiceNumber: 'STRIPE-2026-0437',
    invoiceDate: '2026-04-15', dueDate: '2026-05-15',
    status: 'overdue',
    memo: 'Past due — escalate to finance',
    lineItems: [
      { description: 'Platform fee',           quantity: 1, unitPrice: 2500.00 },
      { description: 'Processing fees',        quantity: 1, unitPrice: 1789.60 },
      { description: 'Radar fraud protection', quantity: 1, unitPrice:  312.00 },
      { description: 'Billing add-on',         quantity: 1, unitPrice:  200.00 },
    ],
  },
  {
    vendor: 'Stripe',
    invoiceNumber: 'STRIPE-2026-0521',
    invoiceDate: '2026-05-15', dueDate: '2026-06-14',
    status: 'approved',
    lineItems: [
      { description: 'Platform fee',           quantity: 1, unitPrice: 2500.00 },
      { description: 'Processing fees',        quantity: 1, unitPrice: 1924.30 },
      { description: 'Radar fraud protection', quantity: 1, unitPrice:  312.00 },
    ],
  },
  {
    vendor: 'Stripe',
    invoiceNumber: 'STRIPE-2026-0601',
    invoiceDate: '2026-06-01', dueDate: '2026-07-01',
    status: 'pending',
    lineItems: [
      { description: 'Platform fee',           quantity: 1, unitPrice: 2500.00 },
      { description: 'Processing fees',        quantity: 1, unitPrice: 2087.40 },
      { description: 'Radar fraud protection', quantity: 1, unitPrice:  312.00 },
      { description: 'Billing add-on',         quantity: 1, unitPrice:  200.00 },
    ],
  },

  // ── AMAZON WEB SERVICES ────────────────────────────────────────────────────
  {
    vendor: 'Amazon Web Services',
    invoiceNumber: 'AWS-4821-2025-12',
    invoiceDate: '2025-12-01', dueDate: '2025-12-31',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2025-12-29'),
    lineItems: [
      { description: 'EC2 Compute — m7i.xlarge (4 instances)', quantity: 1, unitPrice:  8420.00 },
      { description: 'S3 Standard storage',                    quantity: 1, unitPrice:  1230.50 },
      { description: 'RDS PostgreSQL — db.r6g.large',          quantity: 1, unitPrice:  2100.00 },
      { description: 'CloudFront data transfer',               quantity: 1, unitPrice:   890.25 },
    ],
  },
  {
    vendor: 'Amazon Web Services',
    invoiceNumber: 'AWS-4821-2026-02',
    invoiceDate: '2026-02-01', dueDate: '2026-03-03',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2026-02-26'),
    lineItems: [
      { description: 'EC2 Compute — m7i.xlarge (4 instances)', quantity: 1, unitPrice:  9110.00 },
      { description: 'S3 Standard storage',                    quantity: 1, unitPrice:  1350.75 },
      { description: 'RDS PostgreSQL — db.r6g.large',          quantity: 1, unitPrice:  2100.00 },
      { description: 'CloudFront data transfer',               quantity: 1, unitPrice:   780.50 },
      { description: 'Lambda invocations',                     quantity: 1, unitPrice:   340.20 },
    ],
  },
  {
    vendor: 'Amazon Web Services',
    invoiceNumber: 'AWS-4821-2026-04',
    invoiceDate: '2026-04-01', dueDate: '2026-05-01',
    status: 'overdue',
    memo: 'AWS credits applied — verify final amount before paying',
    lineItems: [
      { description: 'EC2 Compute — m7i.xlarge (5 instances)', quantity: 1, unitPrice: 10480.00 },
      { description: 'S3 Standard storage',                    quantity: 1, unitPrice:  1410.00 },
      { description: 'RDS PostgreSQL — db.r6g.large',          quantity: 1, unitPrice:  2450.00 },
      { description: 'CloudFront data transfer',               quantity: 1, unitPrice:   930.00 },
    ],
  },
  {
    vendor: 'Amazon Web Services',
    invoiceNumber: 'AWS-4821-2026-05',
    invoiceDate: '2026-05-01', dueDate: '2026-05-31',
    status: 'approved',
    lineItems: [
      { description: 'EC2 Compute — m7i.xlarge (5 instances)', quantity: 1, unitPrice: 10200.00 },
      { description: 'S3 Standard storage',                    quantity: 1, unitPrice:  1620.00 },
      { description: 'RDS PostgreSQL — db.r6g.xlarge',         quantity: 1, unitPrice:  2800.00 },
      { description: 'CloudFront data transfer',               quantity: 1, unitPrice:  1240.00 },
      { description: 'Lambda invocations',                     quantity: 1, unitPrice:   480.00 },
    ],
  },
  {
    vendor: 'Amazon Web Services',
    invoiceNumber: 'AWS-4821-2026-06',
    invoiceDate: '2026-06-01', dueDate: '2026-07-01',
    status: 'pending',
    lineItems: [
      { description: 'EC2 Compute — m7i.xlarge (5 instances)', quantity: 1, unitPrice: 10890.00 },
      { description: 'S3 Standard storage',                    quantity: 1, unitPrice:  1780.00 },
      { description: 'RDS PostgreSQL — db.r6g.xlarge',         quantity: 1, unitPrice:  2800.00 },
      { description: 'CloudFront data transfer',               quantity: 1, unitPrice:  1380.00 },
      { description: 'Lambda invocations',                     quantity: 1, unitPrice:   530.00 },
    ],
  },

  // ── VERCEL ─────────────────────────────────────────────────────────────────
  {
    vendor: 'Vercel',
    invoiceNumber: 'VCL-2025-0089',
    invoiceDate: '2025-12-01', dueDate: '2025-12-31',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2025-12-24'),
    lineItems: [
      { description: 'Pro team plan — monthly', quantity: 1, unitPrice: 1800.00 },
      { description: 'Build minutes overage',   quantity: 1, unitPrice:  420.00 },
      { description: 'Bandwidth overage',       quantity: 1, unitPrice:  180.00 },
    ],
  },
  {
    vendor: 'Vercel',
    invoiceNumber: 'VCL-2026-0123',
    invoiceDate: '2026-03-01', dueDate: '2026-03-31',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2026-03-28'),
    lineItems: [
      { description: 'Pro team plan — monthly', quantity: 1, unitPrice: 1800.00 },
      { description: 'Build minutes overage',   quantity: 1, unitPrice:  580.00 },
      { description: 'Bandwidth overage',       quantity: 1, unitPrice:  260.00 },
      { description: 'Edge Config reads',       quantity: 1, unitPrice:   42.00 },
    ],
  },
  {
    vendor: 'Vercel',
    invoiceNumber: 'VCL-2026-0287',
    invoiceDate: '2026-05-01', dueDate: '2026-05-31',
    status: 'scheduled', paymentMethod: 'ach', scheduledDate: '2026-07-03',
    lineItems: [
      { description: 'Pro team plan — monthly',          quantity: 1, unitPrice: 1800.00 },
      { description: 'Build minutes overage',            quantity: 1, unitPrice:  640.00 },
      { description: 'Serverless function invocations',  quantity: 1, unitPrice:  320.00 },
      { description: 'Edge Config reads',                quantity: 1, unitPrice:   55.00 },
    ],
  },
  {
    vendor: 'Vercel',
    invoiceNumber: 'VCL-2026-0301',
    invoiceDate: '2026-06-01', dueDate: '2026-07-01',
    status: 'pending',
    lineItems: [
      { description: 'Pro team plan — monthly', quantity: 1, unitPrice: 1800.00 },
      { description: 'Build minutes overage',   quantity: 1, unitPrice:  720.00 },
      { description: 'Bandwidth overage',       quantity: 1, unitPrice:  310.00 },
    ],
  },
  {
    vendor: 'Vercel',
    invoiceNumber: 'VCL-2026-0318',
    invoiceDate: '2026-06-15', dueDate: '2026-07-15',
    status: 'draft',
    lineItems: [
      { description: 'Pro team plan — monthly', quantity: 1, unitPrice: 1800.00 },
      { description: 'Build minutes overage',   quantity: 1, unitPrice:  490.00 },
    ],
  },

  // ── FIGMA ──────────────────────────────────────────────────────────────────
  {
    vendor: 'Figma',
    invoiceNumber: 'FIG-2026-0041',
    invoiceDate: '2026-01-01', dueDate: '2026-01-31',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2026-01-27'),
    lineItems: [
      { description: 'Organization seats',  quantity: 12, unitPrice: 75.00 },
      { description: 'Dev Mode seats',      quantity:  6, unitPrice: 35.00 },
    ],
  },
  {
    vendor: 'Figma',
    invoiceNumber: 'FIG-2026-0189',
    invoiceDate: '2026-04-01', dueDate: '2026-05-01',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2026-04-28'),
    lineItems: [
      { description: 'Organization seats',  quantity: 14, unitPrice: 75.00 },
      { description: 'Dev Mode seats',      quantity:  6, unitPrice: 35.00 },
    ],
  },
  {
    vendor: 'Figma',
    invoiceNumber: 'FIG-2026-0287',
    invoiceDate: '2026-05-15', dueDate: '2026-06-14',
    status: 'approved',
    lineItems: [
      { description: 'Organization seats',  quantity: 14, unitPrice: 75.00 },
      { description: 'Dev Mode seats',      quantity:  8, unitPrice: 35.00 },
    ],
  },
  {
    vendor: 'Figma',
    invoiceNumber: 'FIG-2026-0301',
    invoiceDate: '2026-06-01', dueDate: '2026-07-01',
    status: 'draft',
    lineItems: [
      { description: 'Organization seats',  quantity: 16, unitPrice: 75.00 },
      { description: 'Dev Mode seats',      quantity:  8, unitPrice: 35.00 },
    ],
  },

  // ── NOTION ─────────────────────────────────────────────────────────────────
  {
    vendor: 'Notion',
    invoiceNumber: 'NOT-2026-0512',
    invoiceDate: '2026-02-01', dueDate: '2026-03-03',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2026-02-26'),
    lineItems: [
      { description: 'Business plan',    quantity: 20, unitPrice: 15.00 },
      { description: 'Notion AI add-on', quantity: 20, unitPrice:  8.00 },
    ],
  },
  {
    vendor: 'Notion',
    invoiceNumber: 'NOT-2026-0635',
    invoiceDate: '2026-04-01', dueDate: '2026-05-01',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2026-04-27'),
    lineItems: [
      { description: 'Business plan',    quantity: 20, unitPrice: 15.00 },
      { description: 'Notion AI add-on', quantity: 20, unitPrice:  8.00 },
    ],
  },
  {
    vendor: 'Notion',
    invoiceNumber: 'NOT-2026-0721',
    invoiceDate: '2026-05-15', dueDate: '2026-06-14',
    status: 'pending',
    lineItems: [
      { description: 'Business plan',    quantity: 22, unitPrice: 15.00 },
      { description: 'Notion AI add-on', quantity: 22, unitPrice:  8.00 },
    ],
  },
  {
    vendor: 'Notion',
    invoiceNumber: 'NOT-2026-0789',
    invoiceDate: '2026-06-01', dueDate: '2026-07-01',
    status: 'draft',
    lineItems: [
      { description: 'Business plan',    quantity: 22, unitPrice: 15.00 },
      { description: 'Notion AI add-on', quantity: 22, unitPrice:  8.00 },
    ],
  },

  // ── GITHUB ─────────────────────────────────────────────────────────────────
  {
    vendor: 'GitHub',
    invoiceNumber: 'GH-2025-INV-0991',
    invoiceDate: '2025-12-01', dueDate: '2025-12-31',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2025-12-26'),
    lineItems: [
      { description: 'GitHub Teams plan',          quantity: 40, unitPrice:  4.00 },
      { description: 'Actions minutes (100K)',      quantity:  1, unitPrice: 800.00 },
      { description: 'GitHub Copilot Business',    quantity: 30, unitPrice: 19.00 },
    ],
  },
  {
    vendor: 'GitHub',
    invoiceNumber: 'GH-2026-INV-0089',
    invoiceDate: '2026-03-01', dueDate: '2026-03-31',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2026-03-27'),
    lineItems: [
      { description: 'GitHub Teams plan',          quantity: 42, unitPrice:   4.00 },
      { description: 'Actions minutes (120K)',      quantity:  1, unitPrice: 960.00 },
      { description: 'GitHub Copilot Business',    quantity: 32, unitPrice:  19.00 },
      { description: 'Packages storage (200 GB)',  quantity:  1, unitPrice: 125.00 },
    ],
  },
  {
    vendor: 'GitHub',
    invoiceNumber: 'GH-2026-INV-0201',
    invoiceDate: '2026-06-01', dueDate: '2026-07-01',
    status: 'approved',
    lineItems: [
      { description: 'GitHub Teams plan',        quantity: 45, unitPrice:   4.00 },
      { description: 'Actions minutes (130K)',    quantity:  1, unitPrice: 1040.00 },
      { description: 'GitHub Copilot Business',  quantity: 35, unitPrice:  19.00 },
    ],
  },
  {
    vendor: 'GitHub',
    invoiceNumber: 'GH-2026-INV-0214',
    invoiceDate: '2026-06-15', dueDate: '2026-07-15',
    status: 'scheduled', paymentMethod: 'ach', scheduledDate: '2026-07-07',
    lineItems: [
      { description: 'GitHub Teams plan',          quantity: 45, unitPrice:   4.00 },
      { description: 'Actions minutes (130K)',      quantity:  1, unitPrice: 1040.00 },
      { description: 'GitHub Copilot Business',    quantity: 35, unitPrice:  19.00 },
      { description: 'Advanced Security (5 seats)',quantity:  5, unitPrice:  49.00 },
    ],
  },

  // ── SLACK TECHNOLOGIES ────────────────────────────────────────────────────
  {
    vendor: 'Slack Technologies',
    invoiceNumber: 'SLK-2025-1241',
    invoiceDate: '2025-12-01', dueDate: '2025-12-31',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2025-12-29'),
    lineItems: [
      { description: 'Business+ plan', quantity: 50, unitPrice: 12.50 },
      { description: 'Slack AI',        quantity: 50, unitPrice: 10.00 },
    ],
  },
  {
    vendor: 'Slack Technologies',
    invoiceNumber: 'SLK-2026-0312',
    invoiceDate: '2026-03-01', dueDate: '2026-03-31',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2026-03-26'),
    lineItems: [
      { description: 'Business+ plan', quantity: 52, unitPrice: 12.50 },
      { description: 'Slack AI',        quantity: 52, unitPrice: 10.00 },
    ],
  },
  {
    vendor: 'Slack Technologies',
    invoiceNumber: 'SLK-2026-0419',
    invoiceDate: '2026-04-15', dueDate: '2026-05-15',
    status: 'overdue',
    memo: 'Disputed — waiting on Slack support to resolve seat count discrepancy',
    lineItems: [
      { description: 'Business+ plan', quantity: 54, unitPrice: 12.50 },
      { description: 'Slack AI',        quantity: 54, unitPrice: 10.00 },
    ],
  },
  {
    vendor: 'Slack Technologies',
    invoiceNumber: 'SLK-2026-0521',
    invoiceDate: '2026-05-15', dueDate: '2026-06-14',
    status: 'scheduled', paymentMethod: 'ach', scheduledDate: '2026-07-05',
    lineItems: [
      { description: 'Business+ plan', quantity: 54, unitPrice: 12.50 },
      { description: 'Slack AI',        quantity: 54, unitPrice: 10.00 },
    ],
  },

  // ── HUBSPOT ────────────────────────────────────────────────────────────────
  {
    vendor: 'HubSpot',
    invoiceNumber: 'HS-2026-0089',
    invoiceDate: '2026-01-01', dueDate: '2026-01-31',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2026-01-28'),
    lineItems: [
      { description: 'Marketing Hub Professional',  quantity: 1, unitPrice: 800.00 },
      { description: 'Sales Hub Professional',      quantity: 1, unitPrice: 500.00 },
      { description: 'Additional CRM seats',        quantity: 5, unitPrice:  25.00 },
    ],
  },
  {
    vendor: 'HubSpot',
    invoiceNumber: 'HS-2026-0287',
    invoiceDate: '2026-04-01', dueDate: '2026-05-01',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2026-04-26'),
    lineItems: [
      { description: 'Marketing Hub Professional',  quantity: 1, unitPrice: 800.00 },
      { description: 'Sales Hub Professional',      quantity: 1, unitPrice: 500.00 },
      { description: 'Additional CRM seats',        quantity: 5, unitPrice:  25.00 },
    ],
  },
  {
    vendor: 'HubSpot',
    invoiceNumber: 'HS-2026-0389',
    invoiceDate: '2026-04-15', dueDate: '2026-05-15',
    status: 'overdue',
    lineItems: [
      { description: 'Marketing Hub Professional', quantity: 1, unitPrice: 800.00 },
      { description: 'Sales Hub Professional',     quantity: 1, unitPrice: 500.00 },
      { description: 'Service Hub Starter',        quantity: 1, unitPrice: 450.00 },
      { description: 'Additional CRM seats',       quantity: 5, unitPrice:  25.00 },
    ],
  },
  {
    vendor: 'HubSpot',
    invoiceNumber: 'HS-2026-0487',
    invoiceDate: '2026-05-15', dueDate: '2026-06-14',
    status: 'approved',
    lineItems: [
      { description: 'Marketing Hub Professional', quantity: 1, unitPrice: 800.00 },
      { description: 'Sales Hub Professional',     quantity: 1, unitPrice: 500.00 },
      { description: 'Service Hub Starter',        quantity: 1, unitPrice: 450.00 },
      { description: 'Additional CRM seats',       quantity: 5, unitPrice:  25.00 },
    ],
  },

  // ── LINEAR ─────────────────────────────────────────────────────────────────
  {
    vendor: 'Linear',
    invoiceNumber: 'LIN-2026-0124',
    invoiceDate: '2026-02-01', dueDate: '2026-03-03',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2026-02-26'),
    lineItems: [
      { description: 'Business plan',    quantity: 25, unitPrice: 12.00 },
      { description: 'Priority support', quantity:  1, unitPrice: 50.00 },
    ],
  },
  {
    vendor: 'Linear',
    invoiceNumber: 'LIN-2026-0287',
    invoiceDate: '2026-05-01', dueDate: '2026-05-31',
    status: 'pending',
    lineItems: [
      { description: 'Business plan',    quantity: 28, unitPrice: 12.00 },
      { description: 'Priority support', quantity:  1, unitPrice: 50.00 },
    ],
  },
  {
    vendor: 'Linear',
    invoiceNumber: 'LIN-2026-0301',
    invoiceDate: '2026-06-01', dueDate: '2026-07-01',
    status: 'approved',
    lineItems: [
      { description: 'Business plan',         quantity: 30, unitPrice: 12.00 },
      { description: 'Priority support',      quantity:  1, unitPrice: 50.00 },
      { description: 'Linear Triage add-on',  quantity:  1, unitPrice: 80.00 },
    ],
  },

  // ── OPENAI ─────────────────────────────────────────────────────────────────
  {
    vendor: 'OpenAI',
    invoiceNumber: 'OAI-2026-0156',
    invoiceDate: '2026-01-15', dueDate: '2026-02-14',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2026-02-10'),
    lineItems: [
      { description: 'GPT-4o API usage (token-based)',              quantity: 1, unitPrice: 6240.00 },
      { description: 'Embeddings API (text-embedding-3-large)',     quantity: 1, unitPrice: 1890.00 },
      { description: 'Whisper API (audio transcription)',           quantity: 1, unitPrice:  380.00 },
    ],
  },
  {
    vendor: 'OpenAI',
    invoiceNumber: 'OAI-2026-0289',
    invoiceDate: '2026-04-01', dueDate: '2026-05-01',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2026-04-27'),
    lineItems: [
      { description: 'GPT-4o API usage (token-based)', quantity: 1, unitPrice: 7320.00 },
      { description: 'GPT-4o mini API usage',          quantity: 1, unitPrice:  890.00 },
      { description: 'Embeddings API',                 quantity: 1, unitPrice:  990.00 },
    ],
  },
  {
    vendor: 'OpenAI',
    invoiceNumber: 'OAI-2026-0389',
    invoiceDate: '2026-04-15', dueDate: '2026-05-15',
    status: 'overdue',
    memo: 'Usage spike detected — confirm with engineering before approving',
    lineItems: [
      { description: 'GPT-4o API usage (token-based)', quantity: 1, unitPrice: 6890.00 },
      { description: 'GPT-4o mini API usage',          quantity: 1, unitPrice:  920.00 },
    ],
  },
  {
    vendor: 'OpenAI',
    invoiceNumber: 'OAI-2026-0487',
    invoiceDate: '2026-06-01', dueDate: '2026-07-01',
    status: 'draft',
    lineItems: [
      { description: 'GPT-4o API usage (token-based)',          quantity: 1, unitPrice:  9840.00 },
      { description: 'GPT-4o mini API usage',                   quantity: 1, unitPrice:  1240.00 },
      { description: 'Embeddings API (text-embedding-3-large)', quantity: 1, unitPrice:  1120.00 },
    ],
  },

  // ── DATADOG ────────────────────────────────────────────────────────────────
  {
    vendor: 'Datadog',
    invoiceNumber: 'DD-2026-0412',
    invoiceDate: '2026-03-01', dueDate: '2026-03-31',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2026-03-28'),
    lineItems: [
      { description: 'Infrastructure Monitoring Pro (10 hosts)', quantity: 10, unitPrice:  23.00 },
      { description: 'APM and Distributed Tracing',             quantity:  5, unitPrice:  40.00 },
      { description: 'Log Management (15 GB/day)',              quantity:  1, unitPrice: 420.00 },
    ],
  },
  {
    vendor: 'Datadog',
    invoiceNumber: 'DD-2026-0587',
    invoiceDate: '2026-05-01', dueDate: '2026-05-31',
    status: 'approved',
    lineItems: [
      { description: 'Infrastructure Monitoring Pro (13 hosts)', quantity: 13, unitPrice:  23.00 },
      { description: 'APM and Distributed Tracing',              quantity:  7, unitPrice:  40.00 },
      { description: 'Log Management (20 GB/day)',               quantity:  1, unitPrice: 560.00 },
    ],
  },
  {
    vendor: 'Datadog',
    invoiceNumber: 'DD-2026-0623',
    invoiceDate: '2026-06-01', dueDate: '2026-07-01',
    status: 'scheduled', paymentMethod: 'ach', scheduledDate: '2026-07-09',
    lineItems: [
      { description: 'Infrastructure Monitoring Pro (15 hosts)', quantity: 15, unitPrice:  23.00 },
      { description: 'APM and Distributed Tracing',              quantity:  8, unitPrice:  40.00 },
      { description: 'Log Management (20 GB/day)',               quantity:  1, unitPrice: 560.00 },
      { description: 'Synthetics API tests',                     quantity:  1, unitPrice: 180.00 },
    ],
  },

  // ── TWILIO ─────────────────────────────────────────────────────────────────
  {
    vendor: 'Twilio',
    invoiceNumber: 'TWL-2026-0234',
    invoiceDate: '2026-02-01', dueDate: '2026-03-03',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2026-02-27'),
    lineItems: [
      { description: 'Outbound SMS — domestic (10,000 messages)',  quantity: 1, unitPrice:  79.00 },
      { description: 'Voice calls — outbound (5,000 minutes)',     quantity: 1, unitPrice:  70.00 },
      { description: 'Verify — phone verification (2,000)',        quantity: 1, unitPrice: 100.00 },
    ],
  },
  {
    vendor: 'Twilio',
    invoiceNumber: 'TWL-2026-0378',
    invoiceDate: '2026-04-01', dueDate: '2026-05-01',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2026-04-27'),
    lineItems: [
      { description: 'Outbound SMS — domestic (12,000 messages)', quantity: 1, unitPrice:  94.80 },
      { description: 'Voice calls — outbound (6,000 minutes)',    quantity: 1, unitPrice:  84.00 },
      { description: 'SendGrid email delivery (50,000)',          quantity: 1, unitPrice:  25.00 },
    ],
  },
  {
    vendor: 'Twilio',
    invoiceNumber: 'TWL-2026-0489',
    invoiceDate: '2026-05-15', dueDate: '2026-06-14',
    status: 'pending',
    lineItems: [
      { description: 'Outbound SMS — domestic (14,000 messages)',  quantity: 1, unitPrice: 110.60 },
      { description: 'Voice calls — outbound (7,200 minutes)',     quantity: 1, unitPrice: 100.80 },
      { description: 'Verify — phone verification (3,500)',        quantity: 1, unitPrice: 175.00 },
    ],
  },
  {
    vendor: 'Twilio',
    invoiceNumber: 'TWL-2026-0501',
    invoiceDate: '2026-06-15', dueDate: '2026-07-15',
    status: 'draft',
    lineItems: [
      { description: 'Outbound SMS — domestic (15,000 messages)', quantity: 1, unitPrice: 118.50 },
      { description: 'Voice calls — outbound (7,500 minutes)',    quantity: 1, unitPrice: 105.00 },
      { description: 'Verify — phone verification (4,000)',       quantity: 1, unitPrice: 200.00 },
      { description: 'SendGrid email delivery (80,000)',          quantity: 1, unitPrice:  40.00 },
    ],
  },

  // ── CLOUDFLARE ─────────────────────────────────────────────────────────────
  {
    vendor: 'Cloudflare',
    invoiceNumber: 'CF-2026-0189',
    invoiceDate: '2026-02-01', dueDate: '2026-03-03',
    status: 'paid', paymentMethod: 'ach', paidAt: isoToDate('2026-02-25'),
    lineItems: [
      { description: 'Business plan (5 zones)',   quantity: 1, unitPrice: 200.00 },
      { description: 'Argo Smart Routing',         quantity: 1, unitPrice: 100.00 },
      { description: 'R2 Object Storage',          quantity: 1, unitPrice:  95.00 },
      { description: 'Workers Paid plan',          quantity: 1, unitPrice:  50.00 },
    ],
  },
  {
    vendor: 'Cloudflare',
    invoiceNumber: 'CF-2026-0312',
    invoiceDate: '2026-05-01', dueDate: '2026-05-31',
    status: 'scheduled', paymentMethod: 'ach', scheduledDate: '2026-07-05',
    lineItems: [
      { description: 'Business plan (5 zones)',        quantity: 1, unitPrice: 200.00 },
      { description: 'Argo Smart Routing',              quantity: 1, unitPrice: 100.00 },
      { description: 'R2 Object Storage',               quantity: 1, unitPrice: 130.00 },
      { description: 'Workers Paid plan',               quantity: 1, unitPrice:  50.00 },
      { description: 'Images (1,000 transformations)', quantity: 1, unitPrice:  50.00 },
    ],
  },
  {
    vendor: 'Cloudflare',
    invoiceNumber: 'CF-2026-0401',
    invoiceDate: '2026-06-01', dueDate: '2026-07-01',
    status: 'pending',
    lineItems: [
      { description: 'Business plan (5 zones)',        quantity: 1, unitPrice: 200.00 },
      { description: 'Argo Smart Routing',              quantity: 1, unitPrice: 100.00 },
      { description: 'R2 Object Storage',               quantity: 1, unitPrice: 155.00 },
      { description: 'Workers Paid plan',               quantity: 1, unitPrice:  50.00 },
      { description: 'Images (2,000 transformations)', quantity: 1, unitPrice: 100.00 },
    ],
  },
]

// ── Seed ─────────────────────────────────────────────────────────────────────

async function main() {
  // Clear in FK-safe order: bills cascade to line items automatically
  console.log('Clearing existing data...')
  await prisma.bill.deleteMany()
  await prisma.vendor.deleteMany()

  console.log(`Seeding ${VENDORS.length} vendors and ${BILLS.length} bills...\n`)

  for (const vendor of VENDORS) {
    const vendorBills = BILLS.filter(b => b.vendor === vendor.name)

    await prisma.vendor.create({
      data: {
        name:  vendor.name,
        email: vendor.email,
        bills: {
          create: vendorBills.map(bill => ({
            invoiceNumber: bill.invoiceNumber,
            invoiceDate:   isoToDate(bill.invoiceDate),
            dueDate:       isoToDate(bill.dueDate),
            amount:        totalAmount(bill.lineItems),
            status:        bill.status,
            paymentMethod: bill.paymentMethod,
            scheduledDate: bill.scheduledDate ? isoToDate(bill.scheduledDate) : undefined,
            paidAt:        bill.paidAt,
            memo:          bill.memo,
            lineItems: {
              createMany: {
                data: bill.lineItems.map((li, i) => ({
                  description: li.description,
                  quantity:    li.quantity.toFixed(4),
                  unitPrice:   li.unitPrice.toFixed(2),
                  amount:      (Math.round(li.quantity * li.unitPrice * 100) / 100).toFixed(2),
                  sortOrder:   i,
                })),
              },
            },
          })),
        },
      },
    })

    console.log(`  ✓ ${vendor.name.padEnd(24)} ${vendorBills.length} bills`)
  }

  // Summary
  const [vendors, bills, lineItems] = await Promise.all([
    prisma.vendor.count(),
    prisma.bill.count(),
    prisma.lineItem.count(),
  ])

  const byStatus = await prisma.bill.groupBy({
    by: ['status'],
    _count: { _all: true },
    orderBy: { status: 'asc' },
  })

  console.log(`\nSeed complete`)
  console.log(`  ${vendors} vendors · ${bills} bills · ${lineItems} line items`)
  console.log('\nStatus distribution:')
  for (const row of byStatus) {
    console.log(`  ${row.status.padEnd(10)} ${row._count._all}`)
  }
}

main()
  .catch((err) => { console.error(err); process.exit(1) })
  .finally(() => prisma.$disconnect())
