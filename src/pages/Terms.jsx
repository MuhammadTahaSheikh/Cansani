import SEO from '@/components/layout/SEO'
import { COMPANY } from '@/data/content'

const SECTIONS = [
  {
    title: 'Services',
    body: 'CanSani provides professional trash, recycling, and compost bin cleaning in covered Lakewood Ranch-area routes. Service is subject to weather, access, and bin placement at the curb.',
  },
  {
    title: 'Bookings & subscriptions',
    body: 'Appointments and subscriptions are confirmed after payment authorization. Subscribers may pause, resume, or cancel from the customer portal subject to plan terms. Skips within 24 hours of service may still be billed.',
  },
  {
    title: 'Access & safety',
    body: 'You agree to place bins curbside, unlock gates as needed, and disclose hazards (pets, steep grades, blocked access). We may reschedule if we cannot safely complete the clean.',
  },
  {
    title: 'Payments',
    body: 'Prices are listed at booking and may include tax. Failed payments may pause service. Refunds for incomplete cleans are evaluated case-by-case.',
  },
  {
    title: 'Liability',
    body: 'We take care with property and carts. Liability is limited to the cost of the affected service visit except where prohibited by law. Photo reports document completed work.',
  },
]

export default function Terms() {
  return (
    <>
      <SEO title="Terms of Service" path="/terms" description="CanSani terms of service for bin cleaning in Lakewood Ranch, FL." />
      <section className="section-pad">
        <div className="container-page max-w-3xl">
          <h1 className="font-display text-4xl font-bold">Terms of Service</h1>
          <p className="mt-3 text-sm text-muted">Last updated July 30, 2026 · {COMPANY.name}</p>
          <div className="mt-10 space-y-8">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-xl font-semibold">{s.title}</h2>
                <p className="mt-2 text-muted leading-relaxed">{s.body}</p>
              </div>
            ))}
            <p className="text-sm text-muted">
              Contact {COMPANY.email} or {COMPANY.phone} for questions about these terms.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
