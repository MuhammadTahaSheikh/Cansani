import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import api from '@/lib/api'

export default function TechJobs() {
  const [jobs, setJobs] = useState([])
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const { data } = await api.get('/technician/jobs', { params: { date } })
        setJobs(data.data?.jobs || [])
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load jobs')
      } finally {
        setLoading(false)
      }
    })()
  }, [date])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Jobs</h1>
          <p className="text-sm text-muted">Assigned appointments</p>
        </div>
        <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !jobs.length ? (
        <Card>
          <p className="text-sm text-muted">No jobs for this date.</p>
        </Card>
      ) : (
        <div className="table-scroll overflow-x-auto rounded-3xl border border-charcoal/8 dark:border-mint/10">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-mint/30 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/8 bg-white dark:divide-mint/10 dark:bg-[#0c1e32]">
              {jobs.map((j) => (
                <tr key={j.id}>
                  <td className="px-4 py-3">{j.time_slot}</td>
                  <td className="px-4 py-3">
                    {j.customer_first_name} {j.customer_last_name}
                  </td>
                  <td className="px-4 py-3">
                    {j.address_line1}, {j.city}
                  </td>
                  <td className="px-4 py-3">{j.plan_name}</td>
                  <td className="px-4 py-3">
                    <Badge tone={j.status === 'completed' ? 'success' : 'teal'}>{j.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/technician/jobs/${j.id}`}>
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </Link>
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
