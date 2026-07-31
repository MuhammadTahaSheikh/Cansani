import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { PLANS, EXTRAS } from '@/data/content'
import { formatCurrency } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Spinner from '@/components/ui/Spinner'
import api from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

const DEMO_CARD = {
  cardName: 'Demo Customer',
  cardNumber: '4242 4242 4242 4242',
  expiry: '12/28',
  cvc: '123',
}

export default function PaymentStep({ data, onChange, onNext, onBack }) {
  const { user, token } = useAuthStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [quote, setQuote] = useState(null)
  const [quoting, setQuoting] = useState(true)

  const plan = PLANS.find((p) => String(p.id) === String(data.planId))
  const binCount = Object.values(data.bins || {}).reduce((a, b) => a + Number(b), 0) || 1
  const extraIds = data.extras || []

  useEffect(() => {
    if (!token || !user) {
      toast.error('Please log in to complete your booking')
      navigate('/login', { state: { from: '/book' }, replace: true })
      return
    }
    if (!data.cardNumber) onChange({ ...DEMO_CARD })
    onChange({
      firstName: user.first_name || data.firstName,
      lastName: user.last_name || data.lastName,
      email: user.email,
      phone: data.phone || user.phone || '',
      cardName:
        data.cardName ||
        user.name ||
        `${user.first_name || ''} ${user.last_name || ''}`.trim() ||
        DEMO_CARD.cardName,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!token) return
    ;(async () => {
      setQuoting(true)
      try {
        const pricing_id = data.pricing_id || data.planId
        const { data: res } = await api.post('/booking/quote', {
          pricing_id,
          bin_count: binCount,
          extra_ids: extraIds.filter((id) => !Number.isNaN(Number(id))).map(Number),
          coupon_code: data.coupon || undefined,
        })
        setQuote(res.data)
        onChange({ quote: res.data })
      } catch {
        const extrasTotal = extraIds
          .map((id) => EXTRAS.find((e) => e.id === id)?.price || 0)
          .reduce((a, b) => a + b, 0)
        const extraBins = Math.max(0, binCount - 2)
        const subtotal = (plan?.price || 0) + extrasTotal + extraBins * 15
        const fallback = { subtotal, tax: 0, discount: 0, total: subtotal }
        setQuote(fallback)
        onChange({ quote: fallback })
      } finally {
        setQuoting(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.planId, data.pricing_id, binCount, JSON.stringify(extraIds), data.coupon])

  const total = quote?.total ?? quote?.subtotal ?? plan?.price ?? 0

  const pay = async (e) => {
    e.preventDefault()
    if (!token || !user?.email) {
      toast.error('Please log in to buy a service')
      navigate('/login', { state: { from: '/book' } })
      return
    }

    setLoading(true)
    try {
      const dateStr = data.date
        ? format(new Date(data.date), 'yyyy-MM-dd')
        : format(new Date(), 'yyyy-MM-dd')

      const payload = {
        pricing_id: data.pricing_id || data.planId,
        bin_count: binCount,
        extra_ids: extraIds.filter((id) => !Number.isNaN(Number(id))).map(Number),
        appointment_date: dateStr,
        time_slot: data.timeSlot || '9:00 AM – 11:00 AM',
        address_line1: data.street || '8140 Lakewood Ranch Blvd',
        city: data.city || 'Lakewood Ranch',
        state: data.state || 'FL',
        zip_code: data.zip || '34202',
        special_instructions: data.notes,
        first_name: data.firstName || user.first_name,
        last_name: data.lastName || user.last_name,
        email: user.email,
        phone: data.phone || user.phone || undefined,
        coupon_code: data.coupon || undefined,
        dummy_payment: true,
      }

      const { data: bookingRes } = await api.post('/booking/create', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const booking = bookingRes.data || {}
      const appointmentId = booking.appointment?.id || booking.appointment_id

      if (!appointmentId) {
        throw new Error(bookingRes.message || 'Booking was not saved')
      }

      const paymentIntentId =
        booking.payment_intent?.id || booking.payment_intent_id || `pi_demo_${Date.now()}`

      await api
        .post(
          '/payments/confirm',
          {
            payment_intent_id: paymentIntentId,
            appointment_id: appointmentId,
            payment_method: 'card',
            card_last4: '4242',
            card_brand: 'visa',
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .catch(() => null)

      onChange({
        paymentComplete: true,
        amountPaid: Number(booking.totals?.total ?? total),
        confirmationId: booking.confirmation_code || `CS-${appointmentId}`,
        appointmentId,
        email: user.email,
      })
      toast.success('Payment successful — booking saved to your account!')
      onNext()
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error('Please log in to buy a service')
        navigate('/login', { state: { from: '/book' } })
        return
      }
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        err.message ||
        'Booking failed'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  if (!token || !user) {
    return (
      <div className="space-y-4 text-center">
        <h2 className="font-display text-2xl font-bold">Log in required</h2>
        <p className="text-sm text-muted">You must have an account before purchasing a service.</p>
        <div className="flex justify-center gap-3">
          <Link to="/login" state={{ from: '/book' }}>
            <Button>Log in</Button>
          </Link>
          <Link to="/register" state={{ from: '/book' }}>
            <Button variant="outline">Create account</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-bold">Payment</h2>
        <p className="mt-1 text-sm text-muted">
          Charging <strong>{user.email}</strong> — booking will appear on your dashboard after pay.
        </p>
      </div>

      <div className="rounded-2xl border border-teal/25 bg-mint/50 px-4 py-3 text-sm text-teal-dark">
        Test card: <strong>4242 4242 4242 4242</strong> · Expiry <strong>12/28</strong> · CVC{' '}
        <strong>123</strong>
      </div>

      {quoting ? (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      ) : (
        <div className="rounded-2xl bg-mint/40 p-4 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(quote?.subtotal || total)}</span>
          </div>
          {quote?.discount > 0 && (
            <div className="mt-1 flex justify-between text-muted">
              <span>Discount</span>
              <span>-{formatCurrency(quote.discount)}</span>
            </div>
          )}
          {quote?.tax > 0 && (
            <div className="mt-1 flex justify-between text-muted">
              <span>Tax</span>
              <span>{formatCurrency(quote.tax)}</span>
            </div>
          )}
          <div className="mt-2 flex justify-between border-t border-teal/20 pt-2 font-display font-bold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      )}

      <form onSubmit={pay} className="space-y-3">
        <Input
          label="Name on card"
          value={data.cardName || ''}
          onChange={(e) => onChange({ cardName: e.target.value })}
          placeholder="Demo Customer"
        />
        <Input
          label="Card number"
          value={data.cardNumber || ''}
          onChange={(e) => onChange({ cardNumber: e.target.value })}
          placeholder="4242 4242 4242 4242"
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            label="Expiry"
            value={data.expiry || ''}
            onChange={(e) => onChange({ expiry: e.target.value })}
            placeholder="12/28"
          />
          <Input
            label="CVC"
            value={data.cvc || ''}
            onChange={(e) => onChange({ cvc: e.target.value })}
            placeholder="123"
          />
        </div>
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
          <Button type="button" variant="outline" onClick={onBack} className="w-full sm:w-auto">
            Back
          </Button>
          <Button type="submit" loading={loading} className="w-full sm:w-auto">
            Pay & Confirm {formatCurrency(total)}
          </Button>
        </div>
      </form>
    </div>
  )
}
