import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import { formatDate, formatCurrency } from '@/lib/utils'
import api from '@/lib/api'

const statusTone = {
  pending: 'warning',
  confirmed: 'teal',
  in_progress: 'teal',
  completed: 'success',
  cancelled: 'danger',
  no_show: 'muted',
}

export default function CustomerAppointments() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [reschedule, setReschedule] = useState(null)
  const [form, setForm] = useState({ date: '', time_slot: '' })
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/customer/appointments', {
        params: status ? { status } : {},
      })
      setItems(data.data?.items || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [status])

  const cancel = async (id) => {
    if (!confirm('Cancel this appointment?')) return
    try {
      await api.post(`/appointments/${id}/cancel`)
      toast.success('Appointment cancelled')
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cancel failed')
    }
  }

  const submitReschedule = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      await api.post(`/appointments/${reschedule.id}/reschedule`, {
        appointment_date: form.date,
        time_slot: form.time_slot,
      })
      toast.success('Rescheduled')
      setReschedule(null)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reschedule failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Appointments</h1>
          <p className="text-sm text-muted">Upcoming and past cleans</p>
        </div>
        <div className="flex gap-2">
          <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-40">
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </Select>
          <Link to="/book">
            <Button size="sm">Book</Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card>
          <p className="text-sm text-muted">No appointments found.</p>
          <Link to="/book" className="mt-3 inline-block">
            <Button size="sm">Schedule a clean</Button>
          </Link>
        </Card>
      ) : (
        <div className="table-scroll overflow-x-auto rounded-3xl border border-charcoal/8 dark:border-mint/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-mint/30 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/8 bg-white dark:divide-mint/10 dark:bg-[#0c1e32]">
              {items.map((a) => (
                <tr key={a.id}>
                  <td className="px-4 py-3">
                    <div>{formatDate(a.appointment_date)}</div>
                    <div className="text-xs text-muted">{a.time_slot}</div>
                  </td>
                  <td className="px-4 py-3">{a.plan_name}</td>
                  <td className="px-4 py-3">
                    {a.address_line1}, {a.city}
                  </td>
                  <td className="px-4 py-3">{formatCurrency(a.total || 0)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone[a.status] || 'muted'}>{a.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    {!['cancelled', 'completed'].includes(a.status) && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setReschedule(a)
                            setForm({ date: '', time_slot: a.time_slot || '' })
                          }}
                        >
                          Reschedule
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => cancel(a.id)}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={Boolean(reschedule)} onClose={() => setReschedule(null)} title="Reschedule">
        <form onSubmit={submitReschedule} className="space-y-4">
          <Input
            label="New date"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <Input
            label="Time slot"
            value={form.time_slot}
            onChange={(e) => setForm({ ...form, time_slot: e.target.value })}
            placeholder="9:00 AM – 11:00 AM"
            required
          />
          <Button type="submit" loading={busy} className="w-full">
            Save
          </Button>
        </form>
      </Modal>
    </div>
  )
}
