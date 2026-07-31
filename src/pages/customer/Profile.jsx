import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import api from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

export default function CustomerProfile() {
  const updateUser = useAuthStore((s) => s.updateUser)
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address_line1: '',
    city: '',
    state: 'FL',
    zip_code: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.get('/auth/me')
        const u = data.data
        const p = u.profile || {}
        setForm({
          first_name: u.first_name || '',
          last_name: u.last_name || '',
          email: u.email || '',
          phone: u.phone || '',
          address_line1: p.address_line1 || '',
          city: p.city || '',
          state: p.state || 'FL',
          zip_code: p.zip_code || '',
        })
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load profile')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.put('/auth/profile', {
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        address: {
          line1: form.address_line1,
          city: form.city,
          state: form.state,
          zip: form.zip_code,
        },
      })
      updateUser({
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        name: `${form.first_name} ${form.last_name}`.trim(),
      })
      toast.success('Profile updated')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
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

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Profile</h1>
        <p className="text-sm text-muted">Update your contact and service address</p>
      </div>
      <Card>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              label="First name"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            />
            <Input
              label="Last name"
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            />
          </div>
          <Input label="Email" value={form.email} disabled />
          <Input
            label="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            label="Street address"
            value={form.address_line1}
            onChange={(e) => setForm({ ...form, address_line1: e.target.value })}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Input
              label="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <Input
              label="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
            <Input
              label="ZIP"
              value={form.zip_code}
              onChange={(e) => setForm({ ...form, zip_code: e.target.value })}
            />
          </div>
          <Button type="submit" loading={saving}>
            Save changes
          </Button>
        </form>
      </Card>
    </div>
  )
}
