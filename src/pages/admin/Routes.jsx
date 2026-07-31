import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Modal from '@/components/ui/Modal'
import { formatDate } from '@/lib/utils'
import api from '@/lib/api'

export default function AdminRoutes() {
  const [items, setItems] = useState([])
  const [techs, setTechs] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ technician_id: '', route_date: '', notes: '' })
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const [routes, techRes] = await Promise.all([
        api.get('/admin/routes'),
        api.get('/admin/technicians'),
      ])
      setItems(routes.data.data?.items || routes.data.data || [])
      setTechs(techRes.data.data?.items || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load routes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const create = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      await api.post('/admin/routes', {
        technician_id: Number(form.technician_id),
        route_date: form.route_date,
        notes: form.notes,
      })
      toast.success('Route created')
      setOpen(false)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Create failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Routes</h1>
          <p className="text-sm text-muted">Daily technician routes</p>
        </div>
        <Button size="sm" onClick={() => setOpen(true)}>
          New route
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card>
          <p className="text-sm text-muted">No routes planned.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((r) => (
            <Card key={r.id}>
              <p className="font-medium">{formatDate(r.route_date)}</p>
              <p className="text-sm text-muted">
                Tech #{r.technician_id} · {r.status || 'planned'}
              </p>
              {r.notes && <p className="mt-2 text-sm">{r.notes}</p>}
            </Card>
          ))}
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)} title="Create route">
        <form onSubmit={create} className="space-y-3">
          <Select
            label="Technician"
            value={form.technician_id}
            onChange={(e) => setForm({ ...form, technician_id: e.target.value })}
            required
          >
            <option value="">Select…</option>
            {techs.map((t) => (
              <option key={t.id} value={t.id}>
                {t.first_name} {t.last_name}
              </option>
            ))}
          </Select>
          <Input
            label="Date"
            type="date"
            value={form.route_date}
            onChange={(e) => setForm({ ...form, route_date: e.target.value })}
            required
          />
          <Input
            label="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
          <Button type="submit" loading={busy} className="w-full">
            Create
          </Button>
        </form>
      </Modal>
    </div>
  )
}
