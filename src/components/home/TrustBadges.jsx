import { Leaf, ShieldCheck, Camera, Clock } from 'lucide-react'

const badges = [
  { icon: Leaf, title: 'Eco-safe wash', text: 'Biodegradable detergents' },
  { icon: ShieldCheck, title: 'Insured techs', text: 'Fully bonded crews' },
  { icon: Camera, title: 'Photo proof', text: 'After every visit' },
  { icon: Clock, title: 'On-time routes', text: 'SMS day-of updates' },
]

export default function TrustBadges() {
  return (
    <section className="section-pad gradient-mesh">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Why Lakewood Ranch trusts CanSani</h2>
          <p className="mt-3 text-muted">Premium care for the carts you roll out every week.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((b) => (
            <div key={b.title} className="rounded-3xl border border-charcoal/8 bg-white/80 p-6 text-center backdrop-blur dark:border-mint/10 dark:bg-[#0c1e32]/80">
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
