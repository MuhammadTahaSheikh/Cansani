import { useState } from 'react'
import toast from 'react-hot-toast'
import SEO from '@/components/layout/SEO'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { COMPANY } from '@/data/content'
import api from '@/lib/api'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email.includes('@') || !form.message) {
      toast.error('Please fill required fields')
      return
    }
    setLoading(true)
    try {
      await api.post('/chat', {
        message: `Contact form from ${form.name} (${form.email}${form.phone ? `, ${form.phone}` : ''}): ${form.message}`,
        name: form.name,
        email: form.email,
        phone: form.phone,
      })
      toast.success('Message sent — we will reply soon!')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO title="Contact" description="Contact CanSani for quotes and support in Lakewood Ranch, FL." path="/contact" />
      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">Contact</h1>
            <p className="mt-3 text-muted">Get a quote or ask about service in your neighborhood.</p>
            <div className="mt-8 space-y-4 text-sm">
              <a href={COMPANY.phoneHref} className="flex items-center gap-3 font-medium text-teal">
                <Phone size={18} /> {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex min-w-0 items-center gap-3 break-all">
                <Mail size={18} className="shrink-0 text-teal" /> {COMPANY.email}
              </a>
              <p className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-teal" />{' '}
                <span>
                  {COMPANY.address} · {COMPANY.hours}
                </span>
              </p>
            </div>
          </div>
          <form onSubmit={submit} className="glass space-y-4 rounded-3xl p-4 sm:p-6">
            <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Textarea label="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <Button type="submit" loading={loading} className="w-full">
              Send message
            </Button>
          </form>
        </div>
      </section>
    </>
  )
}
