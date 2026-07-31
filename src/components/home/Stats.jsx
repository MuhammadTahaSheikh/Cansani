import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 12500, suffix: '+', label: 'Bins cleaned' },
  { value: 98, suffix: '%', label: '5-star reviews' },
  { value: 16, suffix: '', label: 'Lakewood Ranch neighborhoods' },
  { value: 4.9, suffix: '', label: 'Average rating', decimals: 1 },
]

function CountUp({ value, decimals = 0, active }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    const duration = 1400
    const start = performance.now()
    let raf
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(value * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, value])
  return decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString()
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-pad border-b border-charcoal/5 bg-white dark:bg-[#0c1e32]">
      <div className="container-page grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.45 }}
            className="text-center"
          >
            <p className="font-display text-3xl font-bold text-teal md:text-4xl">
              <CountUp value={s.value} decimals={s.decimals} active={inView} />
              {s.suffix}
            </p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
