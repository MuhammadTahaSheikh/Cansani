import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import { formatCurrency, formatDate } from '@/lib/utils'
import api from '@/lib/api'

export default function AdminReferrals() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/admin/referrals')
      setItems(data.data?.items || data.data || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load referrals')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const reward = async (id) => {
    try {
      await api.post(`/referrals/${id}/reward`)
      toast.success('Reward applied')
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reward failed')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Referrals</h1>
        <p className="text-sm text-muted">Track invite status and payouts</p>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card>
          <p className="text-sm text-muted">No referrals yet.</p>
        </Card>
      ) : (
        <div className="table-scroll overflow-x-auto rounded-3xl border border-charcoal/8 dark:border-mint/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-mint/30 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Reward</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/8 bg-white dark:divide-mint/10 dark:bg-[#0c1e32]">
              {items.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-medium">{r.referral_code}</td>
                  <td className="px-4 py-3">{formatCurrency(r.reward_amount || 0)}</td>
                  <td className="px-4 py-3">{formatDate(r.created_at)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={r.status === 'rewarded' ? 'success' : 'warning'}>{r.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {r.status !== 'rewarded' && (
                      <Button size="sm" onClick={() => reward(r.id)}>
                        Mark rewarded
                      </Button>
                    )}
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
