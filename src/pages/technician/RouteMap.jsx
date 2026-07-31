import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MapPin, ExternalLink } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import api from '@/lib/api'

export default function TechRouteMap() {
  const [data, setData] = useState(null)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const { data: res } = await api.get('/technician/route', { params: { date } })
        setData(res.data)
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load route')
      } finally {
        setLoading(false)
      }
    })()
  }, [date])

  const stops = data?.stops || []
  const directions =
    data?.directions_url ||
    (stops.length
      ? `https://www.google.com/maps/dir/${stops
          .map((s) => encodeURIComponent(`${s.address_line1}, ${s.city} ${s.zip_code || ''}`))
          .join('/')}`
      : null)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Route map</h1>
          <p className="text-sm text-muted">{data?.message || 'Stops in service order'}</p>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          {directions && (
            <a href={directions} target="_blank" rel="noreferrer">
              <Button size="sm">
                <ExternalLink size={14} /> Open in Maps
              </Button>
            </a>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !stops.length ? (
        <Card>
          <p className="text-sm text-muted">No stops for this date.</p>
        </Card>
      ) : (
        <ol className="space-y-3">
          {stops.map((stop, i) => (
            <Card key={stop.id || i} className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">
                {i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{stop.address_line1}</p>
                  <Badge tone={stop.status === 'completed' ? 'success' : 'teal'}>
                    {stop.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted">
                  {stop.city}, {stop.state || 'FL'} {stop.zip_code}
                </p>
                {stop.time_slot && <p className="mt-1 text-xs text-muted">{stop.time_slot}</p>}
                <a
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-teal"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    `${stop.address_line1}, ${stop.city}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin size={14} /> Navigate
                </a>
              </div>
            </Card>
          ))}
        </ol>
      )}
    </div>
  )
}
