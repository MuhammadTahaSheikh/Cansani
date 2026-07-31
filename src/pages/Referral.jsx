import { Link } from 'react-router-dom'
import { Gift, Sparkles, Users } from 'lucide-react'
import SEO from '@/components/layout/SEO'
import Button from '@/components/ui/Button'

export default function Referral() {
  return (
    <>
      <SEO title="Referrals" description="Refer friends to CanSani and earn credits." path="/referral" />
      <section className="section-pad gradient-mesh">
        <div className="container-page max-w-3xl">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal text-white">
              <Gift size={28} />
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold">Give $20, get $20</h1>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              Share CanSani with a neighbor. When they book their first clean, you both receive account credit.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Users, title: 'Invite', text: 'Share your unique code from the customer portal.' },
              { icon: Sparkles, title: 'They book', text: 'Friends register with your code and schedule a clean.' },
              { icon: Gift, title: 'You both win', text: 'Credits land after their first completed service.' },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-charcoal/8 bg-white p-5 dark:border-mint/10 dark:bg-[#0c1e32]"
              >
                <item.icon className="text-teal" size={22} />
                <h2 className="mt-3 font-display text-lg font-semibold">{item.title}</h2>
                <p className="mt-1 text-sm text-muted">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/register">
              <Button>Create account</Button>
            </Link>
            <Link to="/dashboard/referrals">
              <Button variant="outline">View my referrals</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
