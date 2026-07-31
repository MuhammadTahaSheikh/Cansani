import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import { formatCurrency, formatDate } from '@/lib/utils'
import api from '@/lib/api'

export default function AdminPayments() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.get('/admin/payments')
        setItems(data.data?.items || data.data || [])
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load payments')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Payments</h1>
        <p className="text-sm text-muted">Stripe and confirmed charges</p>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card>
          <p className="text-sm text-muted">No payments recorded.</p>
        </Card>
      ) : (
        <div className="table-scroll overflow-x-auto rounded-3xl border border-charcoal/8 dark:border-mint/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-mint/30 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/8 bg-white dark:divide-mint/10 dark:bg-[#0c1e32]">
              {items.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-mono text-xs">{p.stripe_payment_intent_id || p.id}</td>
                  <td className="px-4 py-3">{formatCurrency(p.amount || 0)}</td>
                  <td className="px-4 py-3">
                    {p.card_brand ? `${p.card_brand} ••${p.card_last4}` : p.payment_method || 'card'}
                  </td>
                  <td className="px-4 py-3">{formatDate(p.created_at)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={p.status === 'succeeded' ? 'success' : 'warning'}>{p.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
