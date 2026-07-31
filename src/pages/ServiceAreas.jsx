import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import SEO from '@/components/layout/SEO'
import Button from '@/components/ui/Button'
import { SERVICE_AREAS } from '@/data/content'

export default function ServiceAreas() {
  return (
    <>
      <SEO title="Service Areas" description="CanSani serves Lakewood Ranch, FL and nearby communities." path="/service-areas" />
      <section className="section-pad gradient-mesh">
        <div className="container-page">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Service areas</h1>
          <p className="mt-3 max-w-2xl text-muted">
            We clean bins across Lakewood Ranch, Florida and surrounding communities. Enter your address when booking to confirm.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {SERVICE_AREAS.map((area) => (
              <div
                key={area}
                className="flex items-center gap-2 rounded-2xl border border-charcoal/8 bg-white px-4 py-3 dark:border-mint/10 dark:bg-[#0c1e32]"
              >
                <MapPin size={16} className="text-teal" />
                <span className="text-sm font-medium">{area}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1477959858617-67f85b6b1cda?auto=format&fit=crop&w=1400&q=80"
              alt="Lakewood Ranch Florida community"
              className="aspect-[21/9] w-full object-cover"
            />
          </div>
          <Link to="/book" className="mt-8 inline-block">
            <Button>Check my address</Button>
          </Link>
        </div>
      </section>
    </>
  )
}
