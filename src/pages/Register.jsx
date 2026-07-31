import { useState } from 'react'
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import SEO from '@/components/layout/SEO'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import api from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

function errorMessage(err) {
  const data = err.response?.data
  if (data?.errors?.length) {
    return data.errors.map((e) => e.message || e.msg).filter(Boolean).join(' · ') || data.message
  }
  if (data?.message) return data.message
  if (err.code === 'ERR_NETWORK') {
    return 'Cannot reach the server. Make sure the backend is running on port 5000.'
  }
  return err.message || 'Registration failed'
}

export default function Register() {
  const [params] = useSearchParams()
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    referral_code: params.get('ref') || '',
  })
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()
  const location = useLocation()

  const submit = async (e) => {
    e.preventDefault()
    setFormError('')
    if (!form.first_name || !form.last_name || !form.email.includes('@') || form.password.length < 8) {
      const msg = 'Check your details (password min 8 characters)'
      setFormError(msg)
      toast.error(msg)
      return
    }
    setLoading(true)
    try {
      const { data } = await api.post('/auth/register', {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone?.trim() || undefined,
        password: form.password,
        referral_code: form.referral_code?.trim() || undefined,
      })
      const payload = data?.data
      if (!payload?.user || !payload?.accessToken) {
        throw new Error(data?.message || 'Invalid response from server')
      }
      const user = {
        ...payload.user,
        name: `${payload.user.first_name} ${payload.user.last_name}`.trim(),
      }
      login(user, payload.accessToken)
      toast.success(data.message || 'Account created!')
      navigate(location.state?.from || '/dashboard')
    } catch (err) {
      const msg = errorMessage(err)
      setFormError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO title="Register" path="/register" />
      <section className="section-pad gradient-mesh">
        <div className="container-page max-w-md">
          <div className="rounded-3xl border border-charcoal/8 bg-white p-5 shadow-lg sm:p-8 dark:border-mint/10 dark:bg-[#0c1e32]">
            <h1 className="font-display text-2xl font-bold sm:text-3xl">Create account</h1>
            <p className="mt-2 text-sm text-muted">Join CanSani for effortless bin care.</p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input
                  label="First name"
                  value={form.first_name}
                  onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                  autoComplete="given-name"
                />
                <Input
                  label="Last name"
                  value={form.last_name}
                  onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                  autoComplete="family-name"
                />
              </div>
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
              />
              <Input
                label="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                autoComplete="tel"
              />
              <Input
                label="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                autoComplete="new-password"
              />
              <Input
                label="Referral code (optional)"
                value={form.referral_code}
                onChange={(e) => setForm({ ...form, referral_code: e.target.value })}
              />
              {formError && (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                  {formError}
                </p>
              )}
              <Button type="submit" loading={loading} className="w-full">
                Sign up
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-teal">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
