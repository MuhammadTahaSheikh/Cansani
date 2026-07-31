import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import api from '@/lib/api'

const empty = {
  email: '',
  password: 'Tech123!',
  first_name: '',
  last_name: '',
  phone: '',
  employee_id: '',
  vehicle_info: '',
  license_plate: '',
}

export default function AdminTechnicians() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(empty)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/admin/technicians')
      setItems(data.data?.items || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load technicians')
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
      await api.post('/admin/technicians', form)
      toast.success('Technician created')
      setOpen(false)
      setForm(empty)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Create failed')
    } finally {
      setBusy(false)
    }
  }

  const toggleAvailable = async (t) => {
    try {
      await api.put(`/admin/technicians/${t.id}`, { is_available: t.is_available ? 0 : 1 })
      toast.success('Updated')
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Technicians</h1>
          <p className="text-sm text-muted">Field team roster</p>
        </div>
        <Button size="sm" onClick={() => setOpen(true)}>
          Add technician
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card>
          <p className="text-sm text-muted">No technicians yet.</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((t) => (
            <Card key={t.id}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display text-lg font-semibold">
                    {t.first_name} {t.last_name}
                  </p>
                  <p className="text-sm text-muted">{t.email}</p>
                  <p className="mt-1 text-xs text-muted">
                    {t.vehicle_info || 'No vehicle info'} · Jobs: {t.jobs_completed ?? 0}
                  </p>
                </div>
                <Badge tone={t.is_available ? 'success' : 'warning'}>
                  {t.is_available ? 'available' : 'unavailable'}
                </Badge>
              </div>
              <Button className="mt-4" size="sm" variant="outline" onClick={() => toggleAvailable(t)}>
                Toggle availability
              </Button>
            </Card>
          ))}
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)} title="New technician">
        <form onSubmit={create} className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              label="First"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              required
            />
            <Input
              label="Last"
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              required
            />
          </div>
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            label="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Input
            label="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            label="Vehicle"
            value={form.vehicle_info}
            onChange={(e) => setForm({ ...form, vehicle_info: e.target.value })}
          />
          <Button type="submit" loading={busy} className="w-full">
            Create
          </Button>
        </form>
      </Modal>
    </div>
  )
}
