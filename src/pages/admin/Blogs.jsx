import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Modal from '@/components/ui/Modal'
import { formatDate } from '@/lib/utils'
import api from '@/lib/api'

const empty = { title: '', slug: '', excerpt: '', content: '', category: 'Guides', cover_image: '' }

export default function AdminBlogs() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/admin/blogs')
      setItems(data.data?.items || data.data || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const openCreate = () => {
    setEditId(null)
    setForm(empty)
    setOpen(true)
  }

  const openEdit = (post) => {
    setEditId(post.id)
    setForm({
      title: post.title || '',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      content: post.content || post.body || '',
      category: post.category || 'Guides',
      cover_image: post.cover_image || post.image || '',
    })
    setOpen(true)
  }

  const save = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      if (editId) await api.put(`/admin/blogs/${editId}`, form)
      else await api.post('/admin/blogs', form)
      toast.success(editId ? 'Updated' : 'Created')
      setOpen(false)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this post?')) return
    try {
      await api.delete(`/admin/blogs/${id}`)
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
          <h1 className="font-display text-2xl font-bold">Blogs</h1>
          <p className="text-sm text-muted">Publish guides and updates</p>
        </div>
        <Button size="sm" onClick={openCreate}>
          New post
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !items.length ? (
        <Card>
          <p className="text-sm text-muted">No blog posts.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((p) => (
            <Card key={p.id} className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-xs text-muted">
                  /{p.slug} · {formatDate(p.published_at || p.created_at)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>{p.status || p.is_published ? 'published' : 'draft'}</Badge>
                <Button size="sm" variant="outline" onClick={() => openEdit(p)}>
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => remove(p.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)} title={editId ? 'Edit post' : 'New post'} className="max-w-xl">
        <form onSubmit={save} className="space-y-3">
          <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <Input label="Cover image URL" value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} />
          <Textarea label="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          <Textarea label="Content" rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          <Button type="submit" loading={busy} className="w-full">
            Save
          </Button>
        </form>
      </Modal>
    </div>
  )
}
