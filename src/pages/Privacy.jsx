import SEO from '@/components/layout/SEO'
import { COMPANY } from '@/data/content'

const SECTIONS = [
  {
    title: 'Information we collect',
    body: 'We collect account details (name, email, phone), service addresses, payment metadata processed by Stripe, appointment history, and photos taken during cleaning when you opt in to photo reports.',
  },
  {
    title: 'How we use information',
    body: 'We use your data to schedule and perform bin cleaning, process payments, send reminders, improve routes, and provide customer support. We never sell your personal information.',
  },
  {
    title: 'Sharing',
    body: 'We share data with payment processors (Stripe), SMS/email providers, and map services only as needed to deliver CanSani. Technicians see job addresses assigned to them.',
  },
  {
    title: 'Retention & security',
    body: 'We retain records as long as your account is active and as required for tax and dispute resolution. Access is limited by role, and passwords are hashed.',
  },
  {
    title: 'Your choices',
    body: 'You may update profile data in the portal, opt out of marketing emails, or request account deletion by contacting us. Service-related notices remain required while you have an active subscription.',
  },
]

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy" path="/privacy" description="CanSani privacy policy for Lakewood Ranch bin cleaning customers." />
      <section className="section-pad">
        <div className="container-page max-w-3xl">
          <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-3 text-sm text-muted">Last updated July 30, 2026 · {COMPANY.name}, {COMPANY.address}</p>
          <div className="mt-10 space-y-8">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-xl font-semibold">{s.title}</h2>
                <p className="mt-2 text-muted leading-relaxed">{s.body}</p>
              </div>
            ))}
            <p className="rounded-2xl bg-mint/40 p-4 text-sm">
              Questions? Email{' '}
              <a className="font-medium text-teal" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              {' '}or call {COMPANY.phone}.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
