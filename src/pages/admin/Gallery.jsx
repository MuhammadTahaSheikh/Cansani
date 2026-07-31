import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import api from '@/lib/api'

const empty = { before_url: '', after_url: '', caption: '', is_public: 1 }

export default function AdminGallery() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(empty)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/admin/gallery')
      setItems(data.data?.items || data.data || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load gallery')
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
      await api.post('/admin/gallery', form)
      toast.success('Added')
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
    if (!confirm('Remove this gallery item?')) return
    try {
      await api.delete(`/admin/gallery/${id}`)
      toast.success('Removed')
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Gallery</h1>
          <p className="text-sm text-muted">Before & after showcase</p>
        </div>
        <Button size="sm" onClick={() => setOpen(true)}>
          Add item
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card>
          <p className="text-sm text-muted">Gallery is empty.</p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g) => (
            <Card key={g.id} className="overflow-hidden p-0">
              <div className="grid grid-cols-2">
                <img src={g.before_url || g.before} alt="" className="aspect-square object-cover" />
                <img src={g.after_url || g.after} alt="" className="aspect-square object-cover" />
              </div>
              <div className="p-4">
                <p className="text-sm">{g.caption}</p>
                <Button className="mt-3" size="sm" variant="danger" onClick={() => remove(g.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)} title="Add gallery item">
        <form onSubmit={create} className="space-y-3">
          <Input
            label="Before URL"
            value={form.before_url}
            onChange={(e) => setForm({ ...form, before_url: e.target.value })}
            required
          />
          <Input
            label="After URL"
            value={form.after_url}
            onChange={(e) => setForm({ ...form, after_url: e.target.value })}
            required
          />
          <Input
            label="Caption"
            value={form.caption}
            onChange={(e) => setForm({ ...form, caption: e.target.value })}
          />
          <Button type="submit" loading={busy} className="w-full">
            Add
          </Button>
        </form>
      </Modal>
    </div>
  )
}
