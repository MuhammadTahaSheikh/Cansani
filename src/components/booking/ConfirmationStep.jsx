import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { format } from 'date-fns'
import { PLANS } from '@/data/content'
import { formatCurrency } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function ConfirmationStep({ data }) {
  const plan = PLANS.find((p) => p.id === data.planId)

  return (
    <div className="space-y-5 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint text-teal">
        <CheckCircle2 size={36} />
      </div>
      <div>
        <h2 className="font-display text-2xl font-bold">You are booked!</h2>
        <p className="mt-2 text-sm text-muted">
          Confirmation <strong className="text-charcoal dark:text-mint">{data.confirmationId}</strong> sent to{' '}
          {data.email}
        </p>
      </div>
      <div className="rounded-3xl border border-charcoal/10 p-5 text-left text-sm space-y-2">
        <p><span className="text-muted">Plan:</span> {plan?.name}</p>
        <p>
          <span className="text-muted">When:</span>{' '}
          {data.date ? format(new Date(data.date), 'EEEE, MMM d') : '—'} · {data.timeSlot}
        </p>
        <p>
          <span className="text-muted">Where:</span> {data.street}, {data.city} {data.zip}
        </p>
        <p>
          <span className="text-muted">Paid:</span> {formatCurrency(data.amountPaid || 0)}
        </p>
      </div>
      <div className="flex flex-col-reverse justify-center gap-3 sm:flex-row sm:flex-wrap">
        <Link to="/" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            Back home
          </Button>
        </Link>
        <Link to="/dashboard" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">Go to dashboard</Button>
        </Link>
      </div>
    </div>
  )
}
