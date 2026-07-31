import { Link } from 'react-router-dom'
import SEO from '@/components/layout/SEO'
import Button from '@/components/ui/Button'
import { COMPANY } from '@/data/content'

export default function About() {
  return (
    <>
      <SEO title="About" description="Meet CanSani — Lakewood Ranch's premium trash bin cleaning company." path="/about" />
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80"
          alt="Lakewood Ranch neighborhood"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="container-page relative py-24 md:py-32">
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl">About CanSani</h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">{COMPANY.tagline}</p>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold">Born for Lakewood Ranch curb appeal</h2>
            <p className="mt-4 text-muted leading-relaxed">
              CanSani started with a simple idea: trash bins deserve the same care as your lawn and driveway.
              We bring professional-grade hot water, eco-safe sanitizers, and photo-proof service to homes
              across Lakewood Ranch and nearby Florida communities.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              Every route is staffed by insured technicians who treat your property with respect — and leave
              your curb looking guest-ready.
            </p>
            <Link to="/book" className="mt-6 inline-block">
              <Button>Book your first clean</Button>
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80"
            alt="Clean bins"
            className="rounded-3xl shadow-xl object-cover aspect-[4/3] w-full"
          />
        </div>
      </section>
      <section className="section-pad bg-mint/30">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {[
            { title: 'Mission', text: 'Make every Lakewood Ranch curb cleaner, fresher, and more welcoming.' },
            { title: 'Values', text: 'Eco-safe methods, on-time routes, and transparent pricing.' },
            { title: 'Promise', text: 'Photo proof after every visit — or we make it right.' },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl bg-white p-6 dark:bg-[#0c1e32]">
              <h3 className="font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
