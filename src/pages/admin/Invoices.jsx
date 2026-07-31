import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import { formatCurrency, formatDate } from '@/lib/utils'
import api from '@/lib/api'

export default function AdminInvoices() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.get('/admin/invoices')
        setItems(data.data?.items || data.data || [])
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load invoices')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Invoices</h1>
        <p className="text-sm text-muted">All customer invoices</p>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card>
          <p className="text-sm text-muted">No invoices.</p>
        </Card>
      ) : (
        <div className="table-scroll overflow-x-auto rounded-3xl border border-charcoal/8 dark:border-mint/10">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-mint/30 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Number</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/8 bg-white dark:divide-mint/10 dark:bg-[#0c1e32]">
              {items.map((inv) => (
                <tr key={inv.id}>
                  <td className="px-4 py-3 font-medium">{inv.invoice_number || `#${inv.id}`}</td>
                  <td className="px-4 py-3">#{inv.customer_id}</td>
                  <td className="px-4 py-3">{formatDate(inv.created_at)}</td>
                  <td className="px-4 py-3">{formatCurrency(inv.total || 0)}</td>
                  <td className="px-4 py-3">
                    <Badge>{inv.status}</Badge>
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
