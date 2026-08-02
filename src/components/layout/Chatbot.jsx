import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { COMPANY } from '@/data/content'

const replies = [
  `Hi! I'm CanSani Assist. We clean trash bins across Lakewood Ranch, Florida. Ask about pricing, areas, or booking.`,
  `Our popular Bi-Weekly plan is $29 per clean. Monthly is $39. Want me to point you to Book Now?`,
  `We serve Lakewood Ranch plus Sarasota, Bradenton, University Park, Palmer Ranch, Parrish, and more. Enter your address on /book to confirm.`,
  `You can reach us at ${COMPANY.phone} or book online in under 5 minutes.`,
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'bot', text: replies[0] },
  ])
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', text }])
    const lower = text.toLowerCase()
    let reply = replies[3]
    if (lower.includes('price') || lower.includes('plan') || lower.includes('cost')) reply = replies[1]
    else if (lower.includes('area') || lower.includes('lakewood') || lower.includes('florida') || lower.includes('sarasota') || lower.includes('bradenton') || lower.includes('serve')) reply = replies[2]
    else if (lower.includes('book') || lower.includes('appoint'))
      reply = 'Great — head to Book Now and we will walk you through address, plan, and payment.'
    setTimeout(() => setMessages((m) => [...m, { role: 'bot', text: reply }]), 500)
  }

  return (
    <div className="fixed right-4 z-50 safe-bottom sm:right-5">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="mb-3 flex h-[min(70dvh,420px)] w-[min(calc(100vw-2rem),360px)] flex-col overflow-hidden rounded-3xl border border-charcoal/10 bg-white shadow-2xl dark:border-mint/10 dark:bg-[#0c1e32]"
          >
            <div className="flex items-center justify-between bg-teal px-4 py-3 text-white">
              <div>
                <p className="font-display text-sm font-semibold">CanSani Assist</p>
                <p className="text-xs text-white/80">Usually replies instantly</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4 scrollbar-thin">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    m.role === 'user'
                      ? 'ml-auto bg-teal text-white'
                      : 'bg-mint/60 text-charcoal dark:bg-teal/20 dark:text-mint'
                  }`}
                >
                  {m.text}
                </div>
              ))}
              <div ref={endRef} />
            </div>
            <form onSubmit={send} className="flex gap-2 border-t border-charcoal/8 p-3 dark:border-mint/10">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about pricing..."
                className="min-w-0 flex-1 rounded-2xl border border-charcoal/10 bg-transparent px-3 py-2.5 text-base outline-none focus:border-teal dark:border-mint/15 sm:text-sm"
              />
              <button type="submit" className="rounded-2xl bg-teal p-2.5 text-white">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white shadow-xl shadow-teal/30"
        aria-label="Open chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>
    </div>
  )
}
