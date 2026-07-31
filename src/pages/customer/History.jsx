import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import { formatCurrency, formatDate } from '@/lib/utils'
import api from '@/lib/api'

export default function CustomerHistory() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const { data: res } = await api.get('/customer/history')
        setData(res.data)
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load history')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    )
  }

  const appointments = data?.appointments || []
  const payments = data?.payments || []
  const loyalty = data?.loyalty || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">History</h1>
        <p className="text-sm text-muted">Completed cleans, payments, and loyalty</p>
      </div>

      <Card>
        <h2 className="font-display text-lg font-semibold">Completed cleanings</h2>
        {!appointments.length ? (
          <p className="mt-3 text-sm text-muted">No completed appointments yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-charcoal/8 dark:divide-mint/10">
            {appointments.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                <div>
                  <p className="font-medium">{a.plan_name}</p>
                  <p className="text-xs text-muted">{formatDate(a.appointment_date)}</p>
                </div>
                <Badge tone="success">completed</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-lg font-semibold">Payments</h2>
          {!payments.length ? (
            <p className="mt-3 text-sm text-muted">No payments yet.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {payments.map((p) => (
                <li key={p.id} className="flex justify-between">
                  <span className="text-muted">{formatDate(p.created_at)}</span>
                  <span className="font-medium">{formatCurrency(p.amount)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card>
          <h2 className="font-display text-lg font-semibold">Loyalty</h2>
          {!loyalty.length ? (
            <p className="mt-3 text-sm text-muted">No loyalty activity yet.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {loyalty.map((l) => (
                <li key={l.id} className="flex justify-between gap-2">
                  <span className="text-muted">{l.description || l.type}</span>
                  <span className="font-medium text-teal">+{l.points}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}
