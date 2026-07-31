import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SERVICE_AREAS } from '@/data/content'
import Button from '@/components/ui/Button'

export default function ServiceAreaMap() {
  return (
    <section className="section-pad gradient-mesh">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Serving Lakewood Ranch & nearby</h2>
          <p className="mt-3 text-muted">
            From Lakewood Ranch to Sarasota and Bradenton — check if we roll to your curb.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {SERVICE_AREAS.slice(0, 10).map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-charcoal shadow-sm dark:bg-[#0c1e32] dark:text-mint"
              >
                <MapPin size={12} className="text-teal" />
                {area}
              </span>
            ))}
          </div>
          <Link to="/service-areas" className="mt-6 inline-block">
            <Button variant="outline">See all service areas</Button>
          </Link>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-charcoal/8 shadow-lg dark:border-mint/10">
          <img
            src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=80"
            alt="Lakewood Ranch service area"
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-4">
            <p className="font-display text-sm font-semibold text-charcoal">Lakewood Ranch, FL coverage</p>
            <p className="text-xs text-muted">Enter your address at booking to confirm eligibility.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
