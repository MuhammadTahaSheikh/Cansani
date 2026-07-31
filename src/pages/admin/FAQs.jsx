import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Modal from '@/components/ui/Modal'
import api from '@/lib/api'

const empty = { question: '', answer: '', sort_order: 0 }

export default function AdminFAQs() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/admin/faqs')
      setItems(data.data?.items || data.data || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load FAQs')
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
      const payload = { ...form, sort_order: Number(form.sort_order) || 0 }
      if (editId) await api.put(`/admin/faqs/${editId}`, payload)
      else await api.post('/admin/faqs', payload)
      toast.success('Saved')
      setOpen(false)
      setForm(empty)
      setEditId(null)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete FAQ?')) return
    try {
      await api.delete(`/admin/faqs/${id}`)
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
          <h1 className="font-display text-2xl font-bold">FAQs</h1>
          <p className="text-sm text-muted">Help center answers</p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setEditId(null)
            setForm(empty)
            setOpen(true)
          }}
        >
          Add FAQ
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card>
          <p className="text-sm text-muted">No FAQs.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((f) => (
            <Card key={f.id}>
              <p className="font-medium">{f.question || f.q}</p>
              <p className="mt-2 text-sm text-muted">{f.answer || f.a}</p>
              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditId(f.id)
                    setForm({
                      question: f.question || f.q || '',
                      answer: f.answer || f.a || '',
                      sort_order: f.sort_order || 0,
                    })
                    setOpen(true)
                  }}
                >
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => remove(f.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)} title={editId ? 'Edit FAQ' : 'New FAQ'}>
        <form onSubmit={save} className="space-y-3">
          <Input
            label="Question"
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            required
          />
          <Textarea
            label="Answer"
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            required
          />
          <Input
            label="Sort order"
            type="number"
            value={form.sort_order}
            onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
          />
          <Button type="submit" loading={busy} className="w-full">
            Save
          </Button>
        </form>
      </Modal>
    </div>
  )
}
