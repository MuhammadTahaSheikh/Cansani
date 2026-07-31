import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, CheckCircle2, FileText, Gift, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import { formatCurrency, formatDate } from '@/lib/utils'
import api from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

export default function CustomerDashboard() {
  const user = useAuthStore((s) => s.user)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const { data: res } = await api.get('/customer/dashboard')
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

  const stats = data?.stats || {}
  const next = data?.next_appointment

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold md:text-3xl">
          Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
        </h1>
        <p className="mt-1 text-sm text-muted">Your CanSani customer portal</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Upcoming', value: stats.upcoming_appointments ?? 0, icon: Calendar },
          { label: 'Completed', value: stats.completed_cleanings ?? 0, icon: CheckCircle2 },
          { label: 'Open invoices', value: stats.open_invoices ?? 0, icon: FileText },
          { label: 'Loyalty pts', value: stats.loyalty_points ?? 0, icon: Sparkles },
        ].map((s) => (
          <Card key={s.label} className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mint text-teal">
              <s.icon size={20} />
            </div>
            <div>
              <p className="text-xs text-muted">{s.label}</p>
              <p className="font-display text-2xl font-bold">{s.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-lg font-semibold">Next appointment</h2>
          {next ? (
            <div className="mt-3 space-y-2 text-sm">
              <p className="font-medium">
                {formatDate(next.appointment_date)} · {next.time_slot}
              </p>
              <p className="text-muted">
                {next.address_line1}, {next.city} {next.zip_code}
              </p>
              <Badge tone={next.status === 'confirmed' ? 'success' : 'warning'}>{next.status}</Badge>
              <div className="pt-2">
                <Link to="/dashboard/appointments">
                  <Button size="sm" variant="outline">
                    Manage
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-sm text-muted">No upcoming cleans scheduled.</p>
              <Link to="/book" className="mt-3 inline-block">
                <Button size="sm">Book now</Button>
              </Link>
            </div>
          )}
        </Card>

        <Card>
          <h2 className="font-display text-lg font-semibold">Balance & referral</h2>
          <p className="mt-3 text-sm text-muted">Amount due</p>
          <p className="font-display text-2xl font-bold text-teal">
            {formatCurrency(stats.balance_due || 0)}
          </p>
          {data?.referral_code && (
            <p className="mt-4 flex items-center gap-2 text-sm">
              <Gift size={16} className="text-teal" />
              Code <span className="font-semibold">{data.referral_code}</span>
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/dashboard/invoices">
              <Button size="sm" variant="outline">
                Invoices
              </Button>
            </Link>
            <Link to="/dashboard/referrals">
              <Button size="sm" variant="ghost">
                Referrals
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {data?.subscriptions?.length > 0 && (
        <Card>
          <h2 className="font-display text-lg font-semibold">Subscriptions</h2>
          <ul className="mt-3 divide-y divide-charcoal/8 dark:divide-mint/10">
            {data.subscriptions.map((s) => (
              <li key={s.id} className="flex items-center justify-between py-3 text-sm">
                <span>{s.plan_name}</span>
                <Badge tone={s.status === 'active' ? 'success' : 'warning'}>{s.status}</Badge>
              </li>
            ))}
          </ul>
          <Link to="/dashboard/subscription" className="mt-2 inline-block">
            <Button size="sm" variant="outline">
              Manage subscription
            </Button>
          </Link>
        </Card>
      )}
    </div>
  )
}
