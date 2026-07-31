import { Star } from 'lucide-react'
import { TESTIMONIALS } from '@/data/content'

export default function Testimonials() {
  return (
    <section className="section-pad gradient-mesh">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Neighbors love CanSani</h2>
          <p className="mt-3 text-muted">Real stories from Lakewood Ranch households.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-3xl border border-charcoal/8 bg-white p-6 dark:border-mint/10 dark:bg-[#0c1e32]"
            >
              <div className="flex gap-0.5 text-teal">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/85 dark:text-mint/85">
                “{t.text}”
              </p>
              <footer className="mt-4 text-sm font-semibold">
                {t.name}
                <span className="font-normal text-muted"> · {t.area}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
