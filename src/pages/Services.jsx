import { Link } from 'react-router-dom'
import { Droplets, Wind, Recycle, Sparkles, Leaf, PawPrint } from 'lucide-react'
import SEO from '@/components/layout/SEO'
import Button from '@/components/ui/Button'

const services = [
  {
    icon: Droplets,
    title: 'Hot-pressure wash',
    text: 'Interior and exterior scrub with high-temp water that lifts grease, dirt, and residue.',
  },
  {
    icon: Wind,
    title: 'Odor neutralization',
    text: 'Professional deodorizing so bins smell clean — even in Florida heat.',
  },
  {
    icon: Sparkles,
    title: 'Germ & grime removal',
    text: 'Sanitize lids, handles, and interiors to eliminate bacteria and buildup.',
  },
  {
    icon: Recycle,
    title: 'Trash, recycle & compost',
    text: 'All residential cart types cleaned with eco-safe detergents.',
  },
  {
    icon: Leaf,
    title: 'Eco-friendly process',
    text: 'Biodegradable wash solutions and responsible wastewater practices.',
  },
  {
    icon: PawPrint,
    title: 'Pet-friendly finish',
    text: 'Family- and pet-safe sanitizing so the curb is fresh for everyone.',
  },
]

export default function Services() {
  return (
    <>
      <SEO title="Services" description="Eco-friendly trash can cleaning from Can Sani in Lakewood Ranch, FL." path="/services" />
      <section className="section-pad gradient-mesh">
        <div className="container-page">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-leaf">What we do</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">Services</h1>
          <p className="mt-3 max-w-2xl text-muted">
            Full-service garbage can cleaning designed for busy Lakewood Ranch households, businesses, and HOAs.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="rounded-3xl border border-charcoal/8 bg-white p-6 dark:border-mint/10 dark:bg-[#0c283c]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-teal">
                  <s.icon size={22} />
                </div>
                <h2 className="mt-4 font-display text-xl font-semibold">{s.title}</h2>
                <p className="mt-2 text-sm text-muted">{s.text}</p>
              </div>
            ))}
          </div>
          <Link to="/book" className="mt-10 inline-block">
            <Button size="lg">Book a service</Button>
          </Link>
        </div>
      </section>
    </>
  )
}
