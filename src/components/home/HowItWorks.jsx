import { CalendarCheck, Droplets, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    icon: CalendarCheck,
    title: 'Book online',
    text: 'Pick your address, plan, and preferred window in minutes.',
  },
  {
    icon: Droplets,
    title: 'We wash & sanitize',
    text: 'Hot-pressure clean, eco detergent, and odor neutralization.',
  },
  {
    icon: Sparkles,
    title: 'Photo-ready curb',
    text: 'Bins left sparkling with proof in your portal.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-pad bg-white dark:bg-[#0c1e32]">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">How it works</h2>
          <p className="mt-3 text-muted">Three simple steps to a cleaner curb.</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.12, duration: 0.45 }}
              className="relative text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal text-white shadow-lg shadow-teal/25">
                <s.icon size={24} />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-teal">
                Step {i + 1}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
