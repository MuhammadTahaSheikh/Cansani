import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PLANS, EXTRAS } from '@/data/content'
import { formatCurrency, cn } from '@/lib/utils'

const EXTRA_BIN = EXTRAS.find((e) => e.id === 'extra-bin')?.price ?? 15
const BIN_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1)

function BinCard({ plan, bins, onBinsChange, index }) {
  const color = plan.popular ? 'green' : 'blue'
  const total = plan.price + Math.max(0, bins - 1) * EXTRA_BIN

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn('bin-card', plan.popular && 'bin-card--featured')}
    >
      {plan.popular && (
        <p className="mb-2 text-center text-xs font-extrabold uppercase tracking-widest text-leaf">
          Most Popular
        </p>
      )}
      <div className={cn('bin-lid', color === 'green' ? 'bin-lid--green' : 'bin-lid--blue')}>
        <span className="bin-lid-shine" />
      </div>
      <div className={cn('bin-body', color === 'green' ? 'bin-body--green' : 'bin-body--blue')}>
        <h3 className="text-center text-xl font-extrabold tracking-wide">{plan.name}</h3>
        <p className="mt-1 text-center font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {formatCurrency(total)}
        </p>
        <p className="mt-1 text-center text-xs font-medium text-white/85">{plan.period}</p>

        <div className="bin-divider" />
        <p className="text-center text-sm font-medium leading-snug text-white/95">{plan.description}</p>
        <div className="bin-divider" />
        <p className="text-center text-base font-extrabold uppercase tracking-wide">{plan.washesLabel}</p>
        <div className="bin-divider" />

        <label className="mt-1 block text-center text-sm font-semibold">
          Up to
          <select
            className="bin-select mt-1.5"
            value={bins}
            onChange={(e) => onBinsChange(Number(e.target.value))}
            aria-label={`${plan.name} bin count`}
          >
            {BIN_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'Bin' : 'Bins'}
              </option>
            ))}
          </select>
        </label>

        <Link to={`/book?plan=${plan.id}&bins=${bins}`} className="bin-cta mt-5">
          Sign Up
        </Link>
      </div>
      <div className="bin-shadow" />
    </motion.div>
  )
}

export default function PricingCards() {
  const [binsByPlan, setBinsByPlan] = useState(() =>
    Object.fromEntries(PLANS.map((p) => [p.id, 1]))
  )

  const setBins = (planId, value) => {
    setBinsByPlan((prev) => ({ ...prev, [planId]: value }))
  }

  return (
    <section className="section-pad gradient-mesh overflow-hidden">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-2xl font-extrabold text-charcoal sm:text-3xl md:text-4xl dark:text-white">
            Choose One Of Our Cleaning Options
          </h2>
          <p className="mt-3 text-muted">
            Pick a cadence, select how many bins, and we&apos;ll keep your curb sparkling.
          </p>
        </motion.div>

        <div className="bin-pricing mt-12 grid grid-cols-1 items-end gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan, index) => (
            <BinCard
              key={plan.id}
              plan={plan}
              bins={binsByPlan[plan.id]}
              onBinsChange={(v) => setBins(plan.id, v)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
