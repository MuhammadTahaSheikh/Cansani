import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Briefcase, MapPin, Clock } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import api from '@/lib/api'

export default function TechDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const { data: res } = await api.get('/technician/jobs')
        setData(res.data)
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load jobs')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  const jobs = data?.jobs || []
  const done = jobs.filter((j) => j.status === 'completed').length

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Today&apos;s route</h1>
          <p className="text-sm text-muted">{data?.date || 'Today'}</p>
        </div>
        <Link to="/technician/route">
          <Button size="sm" variant="outline">
            <MapPin size={16} /> Open map
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-xs text-muted">Jobs today</p>
          <p className="font-display text-2xl font-bold">{jobs.length}</p>
        </Card>
        <Card>
          <p className="text-xs text-muted">Completed</p>
          <p className="font-display text-2xl font-bold text-teal">{done}</p>
        </Card>
        <Card>
          <p className="text-xs text-muted">Remaining</p>
          <p className="font-display text-2xl font-bold">{jobs.length - done}</p>
        </Card>
      </div>

      {!jobs.length ? (
        <Card>
          <p className="text-sm text-muted">No jobs assigned for today.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <Card key={job.id} className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mint text-teal">
                  <Briefcase size={18} />
                </div>
                <div>
                  <p className="font-medium">
                    {job.customer_first_name} {job.customer_last_name}
                  </p>
                  <p className="text-sm text-muted">
                    {job.address_line1}, {job.city}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                    <Clock size={12} /> {job.time_slot}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={job.status === 'completed' ? 'success' : 'teal'}>{job.status}</Badge>
                <Link to={`/technician/jobs/${job.id}`}>
                  <Button size="sm">Open</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
