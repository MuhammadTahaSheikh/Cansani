import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function Modal({ open, onClose, title, children, className = '' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className={cn(
              'relative z-10 max-h-[min(92dvh,40rem)] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-4 shadow-2xl sm:rounded-3xl sm:p-6 dark:bg-[#0c1e32]',
              className
            )}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              {title && <h3 className="font-display text-xl font-semibold">{title}</h3>}
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-2 text-muted hover:bg-mint/40 hover:text-charcoal"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
