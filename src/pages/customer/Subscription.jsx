import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import { formatCurrency, formatDate } from '@/lib/utils'
import api from '@/lib/api'

export default function CustomerSubscription() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/subscriptions')
      setItems(data.data?.items || data.data || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load subscriptions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const action = async (id, type) => {
    setBusyId(`${id}-${type}`)
    try {
      await api.post(`/subscriptions/${id}/${type}`)
      toast.success(`Subscription ${type}d`)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || `Could not ${type}`)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Subscription</h1>
        <p className="text-sm text-muted">Pause, resume, or cancel your plan</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card>
          <p className="text-sm text-muted">You don&apos;t have an active subscription.</p>
          <a href="/book" className="mt-3 inline-block">
            <Button size="sm">Choose a plan</Button>
          </a>
        </Card>
      ) : (
        <div className="grid gap-4">
          {items.map((sub) => (
            <Card key={sub.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold">
                    {sub.plan_name || `Plan #${sub.pricing_id}`}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    {sub.next_service_date
                      ? `Next: ${formatDate(sub.next_service_date)}`
                      : 'Cadence managed by CanSani'}
                  </p>
                  {sub.price != null && (
                    <p className="mt-2 font-medium text-teal">{formatCurrency(sub.price)}</p>
                  )}
                </div>
                <Badge tone={sub.status === 'active' ? 'success' : 'warning'}>{sub.status}</Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {sub.status === 'active' && (
                  <Button
                    size="sm"
                    variant="outline"
                    loading={busyId === `${sub.id}-pause`}
                    onClick={() => action(sub.id, 'pause')}
                  >
                    Pause
                  </Button>
                )}
                {sub.status === 'paused' && (
                  <Button
                    size="sm"
                    loading={busyId === `${sub.id}-resume`}
                    onClick={() => action(sub.id, 'resume')}
                  >
                    Resume
                  </Button>
                )}
                {!['cancelled'].includes(sub.status) && (
                  <Button
                    size="sm"
                    variant="danger"
                    loading={busyId === `${sub.id}-cancel`}
                    onClick={() => {
                      if (confirm('Cancel this subscription?')) action(sub.id, 'cancel')
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
