import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Users, Briefcase, Calendar, DollarSign } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import { formatCurrency, formatDate } from '@/lib/utils'
import api from '@/lib/api'

export default function AdminDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const { data: res } = await api.get('/admin/dashboard')
        setData(res.data)
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load dashboard')
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

  const s = data?.stats || {}
  const cards = [
    { label: 'Customers', value: s.customers ?? 0, icon: Users },
    { label: 'Technicians', value: s.technicians ?? 0, icon: Briefcase },
    { label: 'Today', value: s.appointments_today ?? 0, icon: Calendar },
    { label: 'Revenue MTD', value: formatCurrency(s.monthly_revenue || 0), icon: DollarSign },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Admin dashboard</h1>
        <p className="text-sm text-muted">Operations overview</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mint text-teal">
              <c.icon size={20} />
            </div>
            <div>
              <p className="text-xs text-muted">{c.label}</p>
              <p className="font-display text-2xl font-bold">{c.value}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-lg font-semibold">Pending / active</h2>
          <p className="mt-3 text-sm">
            Pending appointments: <strong>{s.pending_appointments ?? 0}</strong>
          </p>
          <p className="mt-1 text-sm">
            Active subscriptions: <strong>{s.active_subscriptions ?? 0}</strong>
          </p>
        </Card>
        <Card>
          <h2 className="font-display text-lg font-semibold">Recent appointments</h2>
          {!data?.recent_appointments?.length ? (
            <p className="mt-3 text-sm text-muted">No recent activity.</p>
          ) : (
            <ul className="mt-3 divide-y divide-charcoal/8 dark:divide-mint/10">
              {data.recent_appointments.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-2 py-2 text-sm">
                  <div>
                    <p className="font-medium">
                      {a.first_name} {a.last_name}
                    </p>
                    <p className="text-xs text-muted">
                      {formatDate(a.appointment_date)} · {a.time_slot}
                    </p>
                  </div>
                  <Badge>{a.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}
