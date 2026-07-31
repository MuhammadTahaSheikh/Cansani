import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { PLANS } from '@/data/content'
import { formatCurrency, cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import api from '@/lib/api'

export default function PlanStep({ data, onChange, onNext, onBack }) {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const { data: res } = await api.get('/pricing')
        const items = res.data?.plans || res.data?.items || (Array.isArray(res.data) ? res.data : [])
        if (items.length) {
          setPlans(
            items.map((p) => ({
              id: String(p.id),
              name: p.name,
              price: Number(p.price_per_bin ?? p.price ?? 0),
              period: p.plan_type || 'per clean',
              description: p.description || '',
              popular: Boolean(p.is_popular),
              features: Array.isArray(p.features) ? p.features : [],
            }))
          )
        } else {
          setPlans(PLANS)
        }
      } catch {
        setPlans(PLANS)
        toast.error('Using offline plan list')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-bold">Choose a plan</h2>
        <p className="mt-1 text-sm text-muted">Select the cadence that fits your home.</p>
      </div>
      {loading ? (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {plans.map((plan) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => onChange({ planId: plan.id, pricing_id: Number(plan.id) || plan.id })}
              className={cn(
                'rounded-3xl border p-4 text-left transition',
                String(data.planId) === String(plan.id)
                  ? 'border-teal bg-mint/40 ring-2 ring-teal/30'
                  : 'border-charcoal/10 hover:border-teal/40'
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-display font-semibold">{plan.name}</span>
                {plan.popular && <Badge>Popular</Badge>}
                {String(data.planId) === String(plan.id) && <Check size={18} className="text-teal" />}
              </div>
              <p className="mt-2 font-display text-xl font-bold">
                {formatCurrency(plan.price)}
                <span className="text-xs font-medium text-muted"> {plan.period}</span>
              </p>
              {plan.description && <p className="mt-1 text-xs text-muted">{plan.description}</p>}
            </button>
          ))}
        </div>
      )}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button disabled={!data.planId} onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  )
}
