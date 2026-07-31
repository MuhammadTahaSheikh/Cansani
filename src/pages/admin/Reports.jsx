import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Spinner from '@/components/ui/Spinner'
import { formatCurrency } from '@/lib/utils'
import api from '@/lib/api'

export default function AdminReports() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const { data: res } = await api.get('/admin/reports')
        setData(res.data)
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load reports')
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

  const summary = data?.summary || data?.stats || data || {}

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Reports</h1>
        <p className="text-sm text-muted">Revenue and operations insights</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: 'Revenue', value: formatCurrency(summary.revenue || summary.total_revenue || 0) },
          { label: 'Appointments', value: summary.appointments || summary.total_appointments || 0 },
          { label: 'Completions', value: summary.completed || summary.completed_appointments || 0 },
          { label: 'New customers', value: summary.new_customers || 0 },
          { label: 'Cancellations', value: summary.cancellations || summary.cancelled || 0 },
          { label: 'Avg ticket', value: formatCurrency(summary.avg_ticket || summary.average_order || 0) },
        ].map((c) => (
          <Card key={c.label}>
            <p className="text-xs text-muted">{c.label}</p>
            <p className="mt-1 font-display text-2xl font-bold">{c.value}</p>
          </Card>
        ))}
      </div>
      {data?.by_plan?.length > 0 && (
        <Card>
          <h2 className="font-display text-lg font-semibold">By plan</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {data.by_plan.map((row) => (
              <li key={row.name || row.plan_name} className="flex justify-between">
                <span>{row.name || row.plan_name}</span>
                <span className="font-medium">{row.count ?? row.total}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
      {Array.isArray(data?.revenue_by_day) && data.revenue_by_day.length > 0 && (
        <Card>
          <h2 className="font-display text-lg font-semibold">Revenue by day</h2>
          <ul className="mt-3 max-h-64 space-y-1 overflow-y-auto text-sm">
            {data.revenue_by_day.map((d) => (
              <li key={d.day} className="flex justify-between">
                <span className="text-muted">{String(d.day).slice(0, 10)}</span>
                <span>{formatCurrency(d.total || 0)}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
