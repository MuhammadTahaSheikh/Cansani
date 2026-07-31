import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-charcoal/8 last:border-0 dark:border-mint/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="font-display text-base font-semibold text-charcoal dark:text-white">
          {title}
        </span>
        <ChevronDown
          className={cn('shrink-0 text-teal transition-transform', open && 'rotate-180')}
          size={18}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm leading-relaxed text-muted">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Accordion({ items = [] }) {
  return (
    <div className="rounded-3xl border border-charcoal/8 bg-white px-5 dark:border-mint/10 dark:bg-[#0c1e32]">
      {items.map((item) => (
        <AccordionItem key={item.q || item.title} title={item.q || item.title}>
          {item.a || item.content}
        </AccordionItem>
      ))}
    </div>
  )
}
