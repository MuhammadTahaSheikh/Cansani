import { Link } from 'react-router-dom'
import SEO from '@/components/layout/SEO'
import Button from '@/components/ui/Button'
import BrandLogo from '@/components/BrandLogo'
import { COMPANY } from '@/data/content'

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description={`Meet ${COMPANY.name} — eco-friendly professional trash can cleaning in Lakewood Ranch.`}
        path="/about"
      />
      <section className="relative overflow-hidden bg-charcoal">
        <div className="absolute inset-0 brand-pattern opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-leaf-dark/80" />
        <div className="container-page relative py-24 md:py-32">
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-aqua">
            Garbage can cleaner
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight text-white md:text-5xl">
            About {COMPANY.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{COMPANY.tagline}</p>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-extrabold">Born to keep Florida bins fresh</h2>
            <p className="mt-4 text-muted leading-relaxed">{COMPANY.description}</p>
            <p className="mt-4 text-muted leading-relaxed">
              We bring professional-grade hot water, eco-safe sanitizers, and photo-proof service to homes
              and businesses across Lakewood Ranch and nearby Florida communities. Every route is staffed
              by insured technicians who treat your property with respect.
            </p>
            <Link to="/book" className="mt-6 inline-block">
              <Button>Book your first clean</Button>
            </Link>
          </div>
          <BrandLogo
            variant="primary"
            className="mx-auto w-full max-w-md rounded-3xl bg-white p-6 shadow-xl dark:bg-[#0c283c]"
          />
        </div>
      </section>
      <section className="section-pad bg-mint/30">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {[
            { title: 'Mission', text: COMPANY.mission },
            { title: 'Values', text: 'Eco-safe methods, on-time routes, and transparent pricing.' },
            { title: 'Promise', text: 'Photo proof after every visit — or we make it right.' },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl bg-white p-6 dark:bg-[#0c283c]">
              <h3 className="font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
