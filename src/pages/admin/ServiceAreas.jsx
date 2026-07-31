import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Modal from '@/components/ui/Modal'
import api from '@/lib/api'

const empty = { name: '', city: '', zip_codes: '', is_active: 1 }

export default function AdminServiceAreas() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(empty)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/admin/service-areas')
      setItems(data.data?.items || data.data || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load areas')
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
      const zips = form.zip_codes
        .split(/[,\s]+/)
        .map((z) => z.trim())
        .filter(Boolean)
      await api.post('/admin/service-areas', {
        name: form.name,
        city: form.city,
        zip_codes: zips,
        is_active: form.is_active,
      })
      toast.success('Saved')
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
          <h1 className="font-display text-2xl font-bold">Service areas</h1>
          <p className="text-sm text-muted">Coverage ZIPs and neighborhoods</p>
        </div>
        <Button size="sm" onClick={() => setOpen(true)}>
          Add area
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card>
          <p className="text-sm text-muted">No service areas configured.</p>
        </Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {items.map((a) => {
            const zips = Array.isArray(a.zip_codes)
              ? a.zip_codes
              : typeof a.zip_codes === 'string'
                ? (() => {
                    try {
                      return JSON.parse(a.zip_codes)
                    } catch {
                      return [a.zip_codes]
                    }
                  })()
                : []
            return (
              <Card key={a.id}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-lg font-semibold">{a.name}</p>
                    <p className="text-sm text-muted">{a.city}</p>
                  </div>
                  <Badge tone={a.is_active ? 'success' : 'muted'}>
                    {a.is_active ? 'active' : 'off'}
                  </Badge>
                </div>
                <p className="mt-3 text-xs text-muted">{zips.join(', ') || 'No ZIPs listed'}</p>
              </Card>
            )
          })}
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)} title="Add service area">
        <form onSubmit={save} className="space-y-3">
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            label="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <Textarea
            label="ZIP codes (comma-separated)"
            value={form.zip_codes}
            onChange={(e) => setForm({ ...form, zip_codes: e.target.value })}
            placeholder="78704, 78745, 78613"
          />
          <Button type="submit" loading={busy} className="w-full">
            Save
          </Button>
        </form>
      </Modal>
    </div>
  )
}
