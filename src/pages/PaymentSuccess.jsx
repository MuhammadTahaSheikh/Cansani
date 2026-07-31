import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import SEO from '@/components/layout/SEO'
import Button from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

export default function PaymentSuccess() {
  const { state } = useLocation()
  const plan = state?.plan
  const amount = state?.amount
  const confirmationId = state?.confirmationId

  return (
    <>
      <SEO title="Payment successful" path="/payment-success" />
      <section className="section-pad gradient-mesh">
        <div className="container-page max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-mint text-teal">
            <CheckCircle2 size={36} />
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold md:text-4xl">You&apos;re all set</h1>
          <p className="mt-3 text-muted">
            Thanks for booking with CanSani. A confirmation email is on the way.
          </p>
          <div className="mt-8 rounded-3xl border border-charcoal/8 bg-white p-6 text-left dark:border-mint/10 dark:bg-[#0c1e32]">
            {confirmationId && (
              <p className="text-sm text-muted">
                Confirmation <span className="font-semibold text-charcoal dark:text-mint">{confirmationId}</span>
              </p>
            )}
            {plan && (
              <p className="mt-2 font-display text-lg font-semibold">{plan}</p>
            )}
            {amount != null && (
              <p className="mt-1 text-teal font-semibold">{formatCurrency(amount)}</p>
            )}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/dashboard">
              <Button>Go to dashboard</Button>
            </Link>
            <Link to="/">
              <Button variant="outline">Back home</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
