import { Star } from 'lucide-react'
import { REVIEWS } from '@/data/content'

export default function GoogleReviews() {
  return (
    <section className="section-pad bg-white dark:bg-[#0c1e32]">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Google reviews</h2>
            <p className="mt-2 flex items-center gap-2 text-muted">
              <span className="inline-flex items-center gap-1 font-semibold text-teal">
                <Star size={16} fill="currentColor" /> 4.9
              </span>
              based on 240+ reviews
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <article
              key={r.author}
              className="rounded-3xl border border-charcoal/8 bg-[var(--page-bg)] p-5 dark:border-mint/10"
            >
              <div className="flex gap-0.5 text-amber-500">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed">{r.text}</p>
              <p className="mt-3 text-xs font-semibold">
                {r.author}
                <span className="font-normal text-muted"> · {r.date}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
