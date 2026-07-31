import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'
import api from '@/lib/api'
import { Bell } from 'lucide-react'

export default function CustomerNotifications() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/notifications')
      setItems(data.data?.items || data.data || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const markRead = async (id) => {
    try {
      await api.post(`/notifications/${id}/read`)
      setItems((list) => list.map((n) => (n.id === id ? { ...n, is_read: 1 } : n)))
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    }
  }

  const markAll = async () => {
    setBusy(true)
    try {
      await api.post('/notifications/read-all')
      setItems((list) => list.map((n) => ({ ...n, is_read: 1 })))
      toast.success('All marked read')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-muted">Reminders and service updates</p>
        </div>
        <Button size="sm" variant="outline" loading={busy} onClick={markAll}>
          Mark all read
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card className="flex flex-col items-center py-10 text-center">
          <Bell className="text-teal" size={28} />
          <p className="mt-3 text-sm text-muted">You&apos;re all caught up.</p>
        </Card>
      ) : (
        <ul className="space-y-3">
          {items.map((n) => (
            <Card
              key={n.id}
              className={!n.is_read ? 'border-teal/30 bg-mint/20' : ''}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{n.title}</p>
                  <p className="mt-1 text-sm text-muted">{n.body}</p>
                  <p className="mt-2 text-xs text-muted">{formatDate(n.created_at)}</p>
                </div>
                {!n.is_read && (
                  <Button size="sm" variant="ghost" onClick={() => markRead(n.id)}>
                    Mark read
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </ul>
      )}
    </div>
  )
}
