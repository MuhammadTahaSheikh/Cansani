import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import SEO from '@/components/layout/SEO'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import api from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

function normalizeUser(user) {
  return {
    ...user,
    name: user.name || [user.first_name, user.last_name].filter(Boolean).join(' ') || user.email,
  }
}

function roleHome(role) {
  if (role === 'admin') return '/admin'
  if (role === 'technician') return '/technician'
  return '/dashboard'
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()
  const location = useLocation()

  const submit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Enter email and password')
      return
    }
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      const payload = data.data
      const user = normalizeUser(payload.user)
      login(user, payload.accessToken)
      toast.success(data.message || 'Welcome back!')
      navigate(location.state?.from || roleHome(user.role))
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO title="Log in" path="/login" />
      <section className="section-pad gradient-mesh">
        <div className="container-page max-w-md">
          <div className="rounded-3xl border border-charcoal/8 bg-white p-5 shadow-lg sm:p-8 dark:border-mint/10 dark:bg-[#0c1e32]">
            <h1 className="font-display text-2xl font-bold sm:text-3xl">Log in</h1>
            <p className="mt-2 text-sm text-muted">Access your CanSani account.</p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <Input
                label="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" loading={loading} className="w-full">
                Log in
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted">
              New here?{' '}
              <Link to="/register" className="font-medium text-teal">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
