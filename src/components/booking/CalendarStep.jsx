import {
  addDays,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfDay,
} from 'date-fns'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export default function CalendarStep({ data, onChange, onNext, onBack }) {
  const selected = data.date ? new Date(data.date) : null
  const view = data.calendarMonth ? new Date(data.calendarMonth) : new Date()
  const monthStart = startOfMonth(view)
  const monthEnd = endOfMonth(view)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const today = startOfDay(new Date())
  const minDate = addDays(today, 1)

  const shiftMonth = (delta) => {
    const d = new Date(view)
    d.setMonth(d.getMonth() + delta)
    onChange({ calendarMonth: d.toISOString() })
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-bold">Pick a date</h2>
        <p className="mt-1 text-sm text-muted">Choose your preferred service day.</p>
      </div>
      <div className="rounded-3xl border border-charcoal/10 p-4">
        <div className="mb-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => shiftMonth(-1)}>←</Button>
          <p className="font-display font-semibold">{format(view, 'MMMM yyyy')}</p>
          <Button variant="ghost" size="sm" onClick={() => shiftMonth(1)}>→</Button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <div key={d} className="py-1">{d}</div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {Array.from({ length: monthStart.getDay() }).map((_, i) => (
            <div key={`e-${i}`} />
          ))}
          {days.map((day) => {
            const disabled = isBefore(day, minDate) || day.getDay() === 0
            const active = selected && isSameDay(day, selected)
            return (
              <button
                key={day.toISOString()}
                type="button"
                disabled={disabled || !isSameMonth(day, view)}
                onClick={() => onChange({ date: day.toISOString() })}
                className={cn(
                  'aspect-square rounded-xl text-sm transition',
                  disabled && 'cursor-not-allowed text-charcoal/25',
                  !disabled && !active && 'hover:bg-mint/60',
                  active && 'bg-teal font-semibold text-white'
                )}
              >
                {format(day, 'd')}
              </button>
            )
          })}
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button disabled={!data.date} onClick={onNext}>Continue</Button>
      </div>
    </div>
  )
}
