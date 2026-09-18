import { Leaf, ShieldCheck, Sparkles, Wind } from 'lucide-react'

const badges = [
  { icon: Leaf, title: 'Eco-friendly', text: 'Biodegradable wash, safer for home & planet' },
  { icon: Wind, title: 'Odor removal', text: 'Neutralize smells even in Florida heat' },
  { icon: ShieldCheck, title: 'Germ & grime', text: 'Sanitize interiors, lids, and handles' },
  { icon: Sparkles, title: 'Sparkling finish', text: 'Photo proof after every visit' },
]

export default function TrustBadges() {
  return (
    <section className="section-pad gradient-mesh">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-leaf">
            Why neighbors choose Can Sani
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">
            A cleaner can. A healthier curb.
          </h2>
          <p className="mt-3 text-muted">
            Professional trash can cleaning that eliminates germs, odors, and grime.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((b) => (
            <div key={b.title} className="rounded-3xl border border-charcoal/8 bg-white/80 p-6 text-center backdrop-blur dark:border-mint/10 dark:bg-[#0c283c]/80">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-teal">
                <b.icon size={22} />
              </div>
              <h3 className="mt-4 font-display font-semibold">{b.title}</h3>
              <p className="mt-1 text-sm text-muted">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
