import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import { cn } from '@/lib/utils'
import api from '@/lib/api'

const FALLBACK = [
  '7:00 AM – 9:00 AM',
  '9:00 AM – 11:00 AM',
  '11:00 AM – 1:00 PM',
  '1:00 PM – 3:00 PM',
  '3:00 PM – 5:00 PM',
]

export default function TimeSlotsStep({ data, onChange, onNext, onBack }) {
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!data.date) {
      setLoading(false)
      return
    }
    const dateStr = format(new Date(data.date), 'yyyy-MM-dd')
    ;(async () => {
      setLoading(true)
      try {
        const { data: res } = await api.get('/booking/availability', { params: { date: dateStr } })
        const availability = res.data?.availability || []
        if (availability.length) {
          setSlots(
            availability.map((s) => ({
              label: s.time_slot,
              available: s.available !== false,
            }))
          )
        } else {
          setSlots(FALLBACK.map((label) => ({ label, available: true })))
        }
      } catch {
        setSlots(FALLBACK.map((label) => ({ label, available: true })))
        toast.error('Could not load live slots — showing defaults')
      } finally {
        setLoading(false)
      }
    })()
  }, [data.date])

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-bold">Time window</h2>
        <p className="mt-1 text-sm text-muted">We arrive within your selected window.</p>
      </div>
      {loading ? (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      ) : !slots.length ? (
        <p className="text-sm text-muted">No slots available for this date.</p>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          {slots.map((slot) => (
            <button
              key={slot.label}
              type="button"
              disabled={!slot.available}
              onClick={() => onChange({ timeSlot: slot.label })}
              className={cn(
                'rounded-2xl border px-4 py-3 text-left text-sm font-medium transition',
                data.timeSlot === slot.label
                  ? 'border-teal bg-mint/50 text-teal-dark'
                  : 'border-charcoal/10 hover:border-teal/40',
                !slot.available && 'cursor-not-allowed opacity-40'
              )}
            >
              {slot.label}
              {!slot.available && <span className="mt-1 block text-xs">Full</span>}
            </button>
          ))}
        </div>
      )}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button disabled={!data.timeSlot} onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  )
}
