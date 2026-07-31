import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Copy, Gift } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import { formatCurrency, formatDate } from '@/lib/utils'
import api from '@/lib/api'

export default function CustomerReferrals() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const { data: res } = await api.get('/referrals/me')
        setData(res.data)
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load referrals')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const copy = () => {
    const text = data?.share_url || data?.referral_code
    if (!text) return
    navigator.clipboard.writeText(text)
    toast.success('Copied!')
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Referrals</h1>
        <p className="text-sm text-muted">
          Earn {formatCurrency(data?.reward_amount || 20)} when friends book
        </p>
      </div>

      <Card className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-teal">
          <Gift size={22} />
        </div>
        <p className="mt-3 text-sm text-muted">Your code</p>
        <p className="font-display text-2xl font-bold tracking-wide text-teal">
          {data?.referral_code || '—'}
        </p>
        <p className="mt-2 text-xs text-muted">{data?.loyalty_points ?? 0} loyalty points</p>
        <Button className="mt-4" variant="outline" size="sm" onClick={copy}>
          <Copy size={14} /> Copy link
        </Button>
      </Card>

      <Card>
        <h2 className="font-display text-lg font-semibold">Your invites</h2>
        {!data?.referrals?.length ? (
          <p className="mt-3 text-sm text-muted">No referrals yet — share your code to get started.</p>
        ) : (
          <ul className="mt-3 divide-y divide-charcoal/8 dark:divide-mint/10">
            {data.referrals.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-2 py-3 text-sm">
                <div>
                  <p className="font-medium">
                    {[r.first_name, r.last_name].filter(Boolean).join(' ') || 'Friend'}
                  </p>
                  <p className="text-xs text-muted">{formatDate(r.created_at)}</p>
                </div>
                <Badge tone={r.status === 'rewarded' ? 'success' : 'warning'}>{r.status}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
