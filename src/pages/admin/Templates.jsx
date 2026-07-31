import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Modal from '@/components/ui/Modal'
import api from '@/lib/api'

export default function AdminTemplates() {
  const [email, setEmail] = useState([])
  const [sms, setSms] = useState([])
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(null)
  const [form, setForm] = useState({ subject: '', body: '' })
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const [e, s] = await Promise.all([
        api.get('/admin/email-templates'),
        api.get('/admin/sms-templates'),
      ])
      setEmail(e.data.data?.items || e.data.data || [])
      setSms(s.data.data?.items || s.data.data || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load templates')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const openEdit = (tpl, type) => {
    setEdit({ ...tpl, type })
    setForm({ subject: tpl.subject || '', body: tpl.body || tpl.message || '' })
  }

  const save = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      const path =
        edit.type === 'email'
          ? `/admin/email-templates/${edit.id}`
          : `/admin/sms-templates/${edit.id}`
      await api.put(path, form)
      toast.success('Template updated')
      setEdit(null)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold">Templates</h1>
        <p className="text-sm text-muted">Email and SMS message templates</p>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-semibold">Email</h2>
        {!email.length ? (
          <Card>
            <p className="text-sm text-muted">No email templates.</p>
          </Card>
        ) : (
          email.map((t) => (
            <Card key={t.id} className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium">{t.name || t.slug || t.key}</p>
                <p className="text-xs text-muted">{t.subject}</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => openEdit(t, 'email')}>
                Edit
              </Button>
            </Card>
          ))
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-semibold">SMS</h2>
        {!sms.length ? (
          <Card>
            <p className="text-sm text-muted">No SMS templates.</p>
          </Card>
        ) : (
          sms.map((t) => (
            <Card key={t.id} className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium">{t.name || t.slug || t.key}</p>
                <p className="line-clamp-1 text-xs text-muted">{t.body || t.message}</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => openEdit(t, 'sms')}>
                Edit
              </Button>
            </Card>
          ))
        )}
      </section>

      <Modal
        open={Boolean(edit)}
        onClose={() => setEdit(null)}
        title={`Edit ${edit?.type || ''} template`}
      >
        <form onSubmit={save} className="space-y-3">
          {edit?.type === 'email' && (
            <Input
              label="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          )}
          <Textarea
            label="Body"
            rows={6}
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
          <Button type="submit" loading={busy} className="w-full">
            Save
          </Button>
        </form>
      </Modal>
    </div>
  )
}
