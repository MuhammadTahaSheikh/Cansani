import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Modal from '@/components/ui/Modal'
import { formatCurrency, formatDate } from '@/lib/utils'
import api from '@/lib/api'

export default function AdminAppointments() {
  const [items, setItems] = useState([])
  const [techs, setTechs] = useState([])
  const [loading, setLoading] = useState(true)
  const [assign, setAssign] = useState(null)
  const [techId, setTechId] = useState('')
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const [appts, techRes] = await Promise.all([
        api.get('/appointments'),
        api.get('/admin/technicians'),
      ])
      setItems(appts.data.data?.items || appts.data.data || [])
      setTechs(techRes.data.data?.items || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/appointments/${id}/status`, { status })
      toast.success('Status updated')
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    }
  }

  const submitAssign = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      await api.post(`/appointments/${assign.id}/assign`, { technician_id: Number(techId) })
      toast.success('Technician assigned')
      setAssign(null)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Assign failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Appointments</h1>
        <p className="text-sm text-muted">Schedule, assign, and update status</p>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card>
          <p className="text-sm text-muted">No appointments.</p>
        </Card>
      ) : (
        <div className="table-scroll overflow-x-auto rounded-3xl border border-charcoal/8 dark:border-mint/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-mint/30 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Customer / Address</th>
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
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {a.first_name || a.customer_first_name} {a.last_name || a.customer_last_name}
                    </div>
                    <div className="text-xs text-muted">
                      {a.address_line1}, {a.city}
                    </div>
                  </td>
                  <td className="px-4 py-3">{formatCurrency(a.total || 0)}</td>
                  <td className="px-4 py-3">
                    <Badge>{a.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => setAssign(a)}>
                        Assign
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => updateStatus(a.id, 'confirmed')}>
                        Confirm
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => updateStatus(a.id, 'cancelled')}>
                        Cancel
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal open={Boolean(assign)} onClose={() => setAssign(null)} title="Assign technician">
        <form onSubmit={submitAssign} className="space-y-4">
          <Select label="Technician" value={techId} onChange={(e) => setTechId(e.target.value)} required>
            <option value="">Select…</option>
            {techs.map((t) => (
              <option key={t.id} value={t.id}>
                {t.first_name} {t.last_name}
              </option>
            ))}
          </Select>
          <Button type="submit" loading={busy} className="w-full">
            Assign
          </Button>
        </form>
      </Modal>
    </div>
  )
}
