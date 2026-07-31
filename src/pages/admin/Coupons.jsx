import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Modal from '@/components/ui/Modal'
import api from '@/lib/api'

const empty = {
  code: '',
  discount_type: 'percent',
  discount_value: 10,
  min_order: 0,
  max_uses: 100,
}

export default function AdminCoupons() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(empty)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/admin/coupons')
      setItems(data.data?.items || data.data || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load coupons')
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
      await api.post('/admin/coupons', {
        ...form,
        discount_value: Number(form.discount_value),
        min_order: Number(form.min_order),
        max_uses: Number(form.max_uses),
        code: form.code.toUpperCase(),
      })
      toast.success('Coupon created')
      setOpen(false)
      setForm(empty)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Create failed')
    } finally {
      setBusy(false)
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this coupon?')) return
    try {
      await api.delete(`/admin/coupons/${id}`)
      toast.success('Deleted')
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Coupons</h1>
          <p className="text-sm text-muted">Promo codes and discounts</p>
        </div>
        <Button size="sm" onClick={() => setOpen(true)}>
          New coupon
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card>
          <p className="text-sm text-muted">No coupons yet.</p>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((c) => (
            <Card key={c.id}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display text-lg font-semibold tracking-wide">{c.code}</p>
                  <p className="text-sm text-muted">
                    {c.discount_type === 'percent'
                      ? `${c.discount_value}% off`
                      : `$${c.discount_value} off`}
                  </p>
                </div>
                <Badge tone={c.is_active ? 'success' : 'muted'}>
                  {c.is_active ? 'active' : 'off'}
                </Badge>
              </div>
              <Button className="mt-3" size="sm" variant="danger" onClick={() => remove(c.id)}>
                Delete
              </Button>
            </Card>
          ))}
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)} title="New coupon">
        <form onSubmit={create} className="space-y-3">
          <Input
            label="Code"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            required
          />
          <Select
            label="Type"
            value={form.discount_type}
            onChange={(e) => setForm({ ...form, discount_type: e.target.value })}
          >
            <option value="percent">Percent</option>
            <option value="fixed">Fixed</option>
          </Select>
          <Input
            label="Value"
            type="number"
            value={form.discount_value}
            onChange={(e) => setForm({ ...form, discount_value: e.target.value })}
          />
          <Input
            label="Min order"
            type="number"
            value={form.min_order}
            onChange={(e) => setForm({ ...form, min_order: e.target.value })}
          />
          <Button type="submit" loading={busy} className="w-full">
            Create
          </Button>
        </form>
      </Modal>
    </div>
  )
}
