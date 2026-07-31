import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import Textarea from '@/components/ui/Textarea'
import api from '@/lib/api'

export default function AdminSettings() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.get('/admin/settings')
        const raw = data.data?.settings || data.data || {}
        const map = Array.isArray(raw)
          ? Object.fromEntries(raw.map((s) => [s.setting_key || s.key, s.setting_value ?? s.value]))
          : raw
        setSettings(map)
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load settings')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const set = (key, value) => setSettings((s) => ({ ...s, [key]: value }))

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.put('/admin/settings', { settings })
      toast.success('Settings saved')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    )
  }

  const keys = Object.keys(settings)
  const known = [
    'company_name',
    'support_email',
    'support_phone',
    'tax_rate',
    'referral_reward',
    'booking_buffer_hours',
  ]

  const fields = [...new Set([...known, ...keys])]

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted">Platform configuration</p>
      </div>
      <Card>
        <form onSubmit={save} className="space-y-4">
          {fields.map((key) =>
            key.includes('message') || key.includes('policy') ? (
              <Textarea
                key={key}
                label={key.replace(/_/g, ' ')}
                value={settings[key] ?? ''}
                onChange={(e) => set(key, e.target.value)}
              />
            ) : (
              <Input
                key={key}
                label={key.replace(/_/g, ' ')}
                value={settings[key] ?? ''}
                onChange={(e) => set(key, e.target.value)}
              />
            )
          )}
          {!fields.length && (
            <p className="text-sm text-muted">No settings returned from API.</p>
          )}
          <Button type="submit" loading={saving}>
            Save settings
          </Button>
        </form>
      </Card>
    </div>
  )
}
