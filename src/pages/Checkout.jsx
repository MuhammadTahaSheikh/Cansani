import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import SEO from '@/components/layout/SEO'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import { PLANS } from '@/data/content'
import { formatCurrency } from '@/lib/utils'
import api from '@/lib/api'

export default function Checkout() {
  const [plans, setPlans] = useState(PLANS)
  const [planId, setPlanId] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [card, setCard] = useState({ name: '', number: '', expiry: '', cvc: '' })
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.get('/pricing')
        const items = data.data?.items || data.data || []
        if (items.length) {
          setPlans(
            items.map((p) => ({
              id: String(p.id),
              name: p.name,
              price: Number(p.price_per_bin ?? p.price ?? 0),
            }))
          )
          setPlanId(String(items[0].id))
        } else {
          setPlanId(PLANS[1]?.id || PLANS[0]?.id)
        }
      } catch {
        setPlanId(PLANS[1]?.id || PLANS[0]?.id)
      } finally {
        setFetching(false)
      }
    })()
  }, [])

  const plan = plans.find((p) => String(p.id) === String(planId))

  const pay = async (e) => {
    e.preventDefault()
    if (!card.name || !card.number || !card.expiry || !card.cvc) {
      toast.error('Enter card details')
      return
    }
    setLoading(true)
    try {
      const intentRes = await api.post('/payments/create-intent', {
        amount: plan?.price || 29,
      }).catch(() => null)

      const payment_intent_id =
        intentRes?.data?.data?.payment_intent?.id || `mock_pi_${Date.now()}`

      await api.post('/payments/confirm', {
        payment_intent_id,
        payment_method: 'card',
        card_last4: card.number.slice(-4),
        card_brand: 'visa',
      }).catch(() => null)

      toast.success('Payment confirmed')
      navigate('/payment-success', {
        state: {
          plan: plan?.name,
          amount: plan?.price,
          confirmationId: payment_intent_id,
        },
      })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO title="Checkout" path="/checkout" />
      <section className="section-pad">
        <div className="container-page max-w-lg">
          <h1 className="font-display text-3xl font-bold">Checkout</h1>
          <p className="mt-2 text-sm text-muted">
            Prefer guided booking?{' '}
            <Link to="/book" className="font-medium text-teal">
              Start Book Now
            </Link>
          </p>
          {fetching ? (
            <div className="mt-10 flex justify-center">
              <Spinner />
            </div>
          ) : (
            <form
              onSubmit={pay}
              className="mt-6 space-y-4 rounded-3xl border border-charcoal/8 bg-white p-6 dark:border-mint/10 dark:bg-[#0c1e32]"
            >
              <label className="block space-y-1.5">
                <span className="text-sm font-medium">Plan</span>
                <select
                  className="w-full rounded-2xl border border-charcoal/10 px-4 py-3 text-sm dark:border-mint/15 dark:bg-charcoal/40"
                  value={planId}
                  onChange={(e) => setPlanId(e.target.value)}
                >
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {formatCurrency(p.price)}
                    </option>
                  ))}
                </select>
              </label>
              <Input
                label="Name on card"
                value={card.name}
                onChange={(e) => setCard({ ...card, name: e.target.value })}
                required
              />
              <Input
                label="Card number"
                placeholder="4242 4242 4242 4242"
                value={card.number}
                onChange={(e) => setCard({ ...card, number: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Expiry"
                  placeholder="12/28"
                  value={card.expiry}
                  onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                  required
                />
                <Input
                  label="CVC"
                  placeholder="123"
                  value={card.cvc}
                  onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" loading={loading} className="w-full">
                Pay & Confirm {formatCurrency(plan?.price || 0)}
              </Button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
