import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Spinner from '@/components/ui/Spinner'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import api from '@/lib/api'

export default function CustomerPhotos() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.get('/customer/photos')
        setItems(data.data?.items || data.data || [])
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load photos')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Photos</h1>
        <p className="text-sm text-muted">Before & after proof from your cleans</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card>
          <p className="text-sm text-muted">No service photos yet. They appear after completed visits.</p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Card key={p.id} className="overflow-hidden p-0">
              <img
                src={p.url?.startsWith('http') ? p.url : `${(import.meta.env.VITE_API_URL || 'https://api.cansani.com/api').replace(/\/api\/?$/, '')}${p.url}`}
                alt={p.caption || 'Service photo'}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <Badge>{p.photo_type || 'after'}</Badge>
                  {p.created_at && (
                    <span className="text-xs text-muted">{formatDate(p.created_at)}</span>
                  )}
                </div>
                {p.caption && <p className="mt-2 text-sm text-muted">{p.caption}</p>}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
