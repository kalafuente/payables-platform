'use client'

import { createContext, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { variants } from '@/lib/motion'
import { Toast, type ToastData, type ToastVariant } from './toast'

// ── Context ───────────────────────────────────────────────────────────────────

export interface AddToastOptions {
  variant: ToastVariant
  title: string
  description?: string
}

interface ToastContextValue {
  toast: (opts: AddToastOptions) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

// ── Provider ──────────────────────────────────────────────────────────────────

const DISMISS_AFTER_MS = 4500

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  function dismiss(id: string) {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  function addToast({ variant, title, description }: AddToastOptions) {
    const id = crypto.randomUUID()
    setToasts(prev => [...prev, { id, variant, title, description }])
    setTimeout(() => dismiss(id), DISMISS_AFTER_MS)
  }

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}

      {/*
        Toast stack — fixed bottom-right, grows upward.
        pointer-events-none on the container so it never blocks the page;
        pointer-events-auto is restored on each Toast.
      */}
      <div
        aria-live="polite"
        aria-label="Notifications"
        className="fixed top-4 right-4 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2 pointer-events-none"
      >
        <AnimatePresence initial={false}>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              layout
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants.slideDown}
            >
              <Toast {...t} onDismiss={() => dismiss(t.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
