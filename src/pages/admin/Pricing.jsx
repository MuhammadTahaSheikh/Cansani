import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Modal from '@/components/ui/Modal'
import { formatCurrency } from '@/lib/utils'
import api from '@/lib/api'

const empty = {
  name: '',
  plan_type: 'biweekly',
  price_per_bin: 24.99,
  description: '',
  is_active: 1,
  is_popular: 0,
}

export default function AdminPricing() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(empty)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/admin/pricing')
      setItems(data.data?.items || data.data || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load pricing')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const save = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      await api.post('/admin/pricing', {
        ...form,
        price_per_bin: Number(form.price_per_bin),
        is_active: Number(form.is_active),
        is_popular: Number(form.is_popular),
      })
      toast.success('Plan saved')
      setOpen(false)
      setForm(empty)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Pricing</h1>
          <p className="text-sm text-muted">Plans and per-bin rates</p>
        </div>
        <Button size="sm" onClick={() => setOpen(true)}>
          Upsert plan
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card>
          <p className="text-sm text-muted">No pricing plans.</p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Card key={p.id}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display text-lg font-semibold">{p.name}</p>
                  <p className="text-xs uppercase tracking-wide text-muted">{p.plan_type}</p>
                </div>
                {p.is_popular ? <Badge>Popular</Badge> : null}
              </div>
              <p className="mt-3 font-display text-2xl font-bold text-teal">
                {formatCurrency(p.price_per_bin ?? p.price ?? 0)}
              </p>
              <p className="mt-2 text-sm text-muted">{p.description}</p>
              <Badge className="mt-3" tone={p.is_active ? 'success' : 'muted'}>
                {p.is_active ? 'active' : 'inactive'}
              </Badge>
            </Card>
          ))}
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)} title="Upsert pricing plan">
        <form onSubmit={save} className="space-y-3">
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Select
            label="Plan type"
            value={form.plan_type}
            onChange={(e) => setForm({ ...form, plan_type: e.target.value })}
          >
            <option value="monthly">Monthly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="quarterly">Quarterly</option>
            <option value="onetime">One-time</option>
          </Select>
          <Input
            label="Price per bin"
            type="number"
            step="0.01"
            value={form.price_per_bin}
            onChange={(e) => setForm({ ...form, price_per_bin: e.target.value })}
          />
          <Input
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <Button type="submit" loading={busy} className="w-full">
            Save
          </Button>
        </form>
      </Modal>
    </div>
  )
}
