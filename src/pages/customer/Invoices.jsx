import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import { formatCurrency, formatDate } from '@/lib/utils'
import api from '@/lib/api'

const tone = {
  paid: 'success',
  sent: 'teal',
  overdue: 'danger',
  draft: 'muted',
  void: 'muted',
}

export default function CustomerInvoices() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/customer/invoices')
      setItems(data.data?.items || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load invoices')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const payInvoice = async (invoice) => {
    setPaying(invoice.id)
    try {
      const { data: intentRes } = await api.post('/payments/create-intent', {
        invoice_id: invoice.id,
      })
      const pi = intentRes.data?.payment_intent?.id || `mock_pi_${invoice.id}`
      await api.post('/payments/confirm', {
        payment_intent_id: pi,
        payment_method: 'card',
        card_last4: '4242',
        card_brand: 'visa',
      })
      toast.success('Invoice paid')
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed')
    } finally {
      setPaying(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Invoices</h1>
        <p className="text-sm text-muted">Billing history and outstanding balances</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card>
          <p className="text-sm text-muted">No invoices yet.</p>
        </Card>
      ) : (
        <div className="table-scroll overflow-x-auto rounded-3xl border border-charcoal/8 dark:border-mint/10">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-mint/30 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Invoice</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/8 bg-white dark:divide-mint/10 dark:bg-[#0c1e32]">
              {items.map((inv) => (
                <tr key={inv.id}>
                  <td className="px-4 py-3 font-medium">{inv.invoice_number || `#${inv.id}`}</td>
                  <td className="px-4 py-3">{formatDate(inv.created_at || inv.due_date)}</td>
                  <td className="px-4 py-3">{formatCurrency(inv.total || 0)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={tone[inv.status] || 'muted'}>{inv.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {['sent', 'overdue', 'draft'].includes(inv.status) && (
                      <Button
                        size="sm"
                        loading={paying === inv.id}
                        onClick={() => payInvoice(inv)}
                      >
                        Pay
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
