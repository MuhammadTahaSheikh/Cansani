import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import { formatCurrency, formatDate } from '@/lib/utils'
import api from '@/lib/api'

export default function AdminCustomers() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(null)
  const [detail, setDetail] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [form, setForm] = useState({})
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/admin/customers', { params: q ? { q } : {} })
      setItems(data.data?.items || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load customers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const openEdit = (c) => {
    if (!c.customer_id) {
      toast.error('This account has no service profile yet')
      return
    }
    setEdit(c)
    setForm({
      first_name: c.first_name || '',
      last_name: c.last_name || '',
      phone: c.phone || '',
      address_line1: c.address_line1 || '',
      city: c.city || '',
      state: c.state || '',
      zip_code: c.zip_code || '',
      is_active: c.is_active ? 1 : 0,
    })
  }

  const openDetail = async (c) => {
    if (!c.customer_id) {
      setDetail({
        customer: c,
        appointments: [],
        invoices: [],
      })
      return
    }
    setDetailLoading(true)
    try {
      const { data } = await api.get(`/admin/customers/${c.customer_id}`)
      setDetail(data.data)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load customer')
    } finally {
      setDetailLoading(false)
    }
  }

  const save = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      await api.patch(`/admin/customers/${edit.customer_id}`, form)
      toast.success('Customer updated')
      setEdit(null)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Customers</h1>
          <p className="text-sm text-muted">All customer accounts, bookings, and balances</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-end">
          <Input
            placeholder="Search name, email, city…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="sm:min-w-[220px]"
          />
          <Button size="sm" onClick={load} className="w-full sm:w-auto">
            Search
          </Button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card>
          <p className="text-sm text-muted">No customers found.</p>
        </Card>
      ) : (
        <div className="table-scroll overflow-x-auto rounded-3xl border border-charcoal/8 dark:border-mint/10">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-mint/30 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Bookings</th>
                <th className="px-4 py-3">Balance</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/8 bg-white dark:divide-mint/10 dark:bg-[#0c1e32]">
              {items.map((c) => (
                <tr key={`${c.user_id || c.id}-${c.customer_id || 'u'}`}>
                  <td className="px-4 py-3 font-medium">
                    {c.first_name} {c.last_name}
                    <div className="text-xs font-normal text-muted">{formatDate(c.user_created_at || c.created_at)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{c.email}</div>
                    <div className="text-xs text-muted">{c.phone || '—'}</div>
                  </td>
                  <td className="px-4 py-3">
                    {c.address_line1 ? (
                      <>
                        <div>{c.address_line1}</div>
                        <div className="text-xs text-muted">
                          {[c.city, c.state, c.zip_code].filter(Boolean).join(', ')}
                        </div>
                      </>
                    ) : (
                      <span className="text-muted">No address yet</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {Number(c.appointment_count) || 0}
                    {Number(c.upcoming_count) > 0 && (
                      <span className="ml-1 text-xs text-muted">({c.upcoming_count} upcoming)</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{formatCurrency(Number(c.balance_due) || 0)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={c.is_active ? 'success' : 'danger'}>
                      {c.is_active ? 'active' : 'inactive'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => openDetail(c)} loading={detailLoading}>
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => openEdit(c)}>
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={Boolean(edit)} onClose={() => setEdit(null)} title="Edit customer">
        <form onSubmit={save} className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              label="First"
              value={form.first_name || ''}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            />
            <Input
              label="Last"
              value={form.last_name || ''}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            />
          </div>
          <Input
            label="Phone"
            value={form.phone || ''}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            label="Address"
            value={form.address_line1 || ''}
            onChange={(e) => setForm({ ...form, address_line1: e.target.value })}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Input
              label="City"
              value={form.city || ''}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <Input
              label="State"
              value={form.state || ''}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
            <Input
              label="ZIP"
              value={form.zip_code || ''}
              onChange={(e) => setForm({ ...form, zip_code: e.target.value })}
            />
          </div>
          <Button type="submit" loading={busy} className="w-full">
            Save
          </Button>
        </form>
      </Modal>

      <Modal
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        title={
          detail?.customer
            ? `${detail.customer.first_name || ''} ${detail.customer.last_name || ''}`.trim() ||
              'Customer detail'
            : 'Customer detail'
        }
      >
        {detail && (
          <div className="space-y-4 text-sm">
            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <div className="text-xs text-muted">Email</div>
                <div>{detail.customer.email}</div>
              </div>
              <div>
                <div className="text-xs text-muted">Phone</div>
                <div>{detail.customer.phone || '—'}</div>
              </div>
              <div className="sm:col-span-2">
                <div className="text-xs text-muted">Address</div>
                <div>
                  {detail.customer.address_line1
                    ? `${detail.customer.address_line1}, ${[detail.customer.city, detail.customer.state, detail.customer.zip_code].filter(Boolean).join(', ')}`
                    : '—'}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted">Loyalty</div>
                <div>{detail.customer.loyalty_points ?? 0} pts</div>
              </div>
              <div>
                <div className="text-xs text-muted">Referral</div>
                <div>{detail.customer.referral_code || '—'}</div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-display font-semibold">Appointments</h3>
              {!detail.appointments?.length ? (
                <p className="text-muted">No appointments</p>
              ) : (
                <ul className="space-y-2">
                  {detail.appointments.map((a) => (
                    <li key={a.id} className="flex justify-between gap-2 rounded-xl bg-mint/30 px-3 py-2">
                      <span>
                        {formatDate(a.appointment_date)} · {a.time_slot}
                        <span className="ml-2 text-muted">{a.plan_name || ''}</span>
                      </span>
                      <Badge tone={a.status === 'confirmed' ? 'success' : 'muted'}>{a.status}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h3 className="mb-2 font-display font-semibold">Invoices</h3>
              {!detail.invoices?.length ? (
                <p className="text-muted">No invoices</p>
              ) : (
                <ul className="space-y-2">
                  {detail.invoices.map((i) => (
                    <li key={i.id} className="flex justify-between gap-2 rounded-xl bg-mint/30 px-3 py-2">
                      <span>
                        {i.invoice_number} · {formatCurrency(Number(i.total))}
                      </span>
                      <Badge tone={i.status === 'paid' ? 'success' : 'warning'}>{i.status}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
