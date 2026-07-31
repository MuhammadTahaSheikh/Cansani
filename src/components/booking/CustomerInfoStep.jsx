import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'

export default function CustomerInfoStep({ data, onChange, onNext, onBack }) {
  const user = useAuthStore((s) => s.user)

  useEffect(() => {
    if (!user) return
    onChange({
      firstName: user.first_name || data.firstName || '',
      lastName: user.last_name || data.lastName || '',
      email: user.email,
      phone: data.phone || user.phone || '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const valid =
    data.firstName &&
    data.lastName &&
    user?.email &&
    String(data.phone || '').replace(/\D/g, '').length >= 10

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-bold">Your details</h2>
        <p className="mt-1 text-sm text-muted">
          Booking is tied to your logged-in account. Email cannot be changed here.
        </p>
      </div>
      {!user ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          You must{' '}
          <Link to="/login" state={{ from: '/book' }} className="font-semibold underline">
            log in
          </Link>{' '}
          or{' '}
          <Link to="/register" state={{ from: '/book' }} className="font-semibold underline">
            create an account
          </Link>{' '}
          before purchasing.
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="First name"
              value={data.firstName || ''}
              onChange={(e) => onChange({ firstName: e.target.value })}
            />
            <Input
              label="Last name"
              value={data.lastName || ''}
              onChange={(e) => onChange({ lastName: e.target.value })}
            />
          </div>
          <Input label="Email" type="email" value={user.email || ''} disabled />
          <Input
            label="Phone"
            type="tel"
            value={data.phone || ''}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="(941) 555-0199"
          />
        </>
      )}
      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <Button variant="outline" onClick={onBack} className="w-full sm:w-auto">
          Back
        </Button>
        <Button disabled={!valid} onClick={onNext} className="w-full sm:w-auto">
          Continue to payment
        </Button>
      </div>
    </div>
  )
}
