import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Star } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'
import api from '@/lib/api'

export default function AdminReviews() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/admin/reviews')
      setItems(data.data?.items || data.data || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const moderate = async (id, status) => {
    try {
      await api.put(`/admin/reviews/${id}`, { status })
      toast.success(`Marked ${status}`)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Reviews</h1>
        <p className="text-sm text-muted">Moderate customer feedback</p>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card>
          <p className="text-sm text-muted">No reviews yet.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((r) => (
            <Card key={r.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1 text-teal">
                    {Array.from({ length: r.rating || 0 }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="mt-2 text-sm">{r.comment || r.text || r.review_text}</p>
                  <p className="mt-2 text-xs text-muted">{formatDate(r.created_at)}</p>
                </div>
                <Badge>{r.status || 'pending'}</Badge>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => moderate(r.id, 'approved')}>
                  Approve
                </Button>
                <Button size="sm" variant="danger" onClick={() => moderate(r.id, 'rejected')}>
                  Reject
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
