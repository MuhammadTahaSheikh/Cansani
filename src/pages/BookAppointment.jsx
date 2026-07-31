import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SEO from '@/components/layout/SEO'
import AddressStep from '@/components/booking/AddressStep'
import CheckAreaStep from '@/components/booking/CheckAreaStep'
import PlanStep from '@/components/booking/PlanStep'
import BinsStep from '@/components/booking/BinsStep'
import ExtrasStep from '@/components/booking/ExtrasStep'
import CalendarStep from '@/components/booking/CalendarStep'
import TimeSlotsStep from '@/components/booking/TimeSlotsStep'
import CustomerInfoStep from '@/components/booking/CustomerInfoStep'
import PaymentStep from '@/components/booking/PaymentStep'
import ConfirmationStep from '@/components/booking/ConfirmationStep'
import { cn } from '@/lib/utils'

const STEPS = [
  'Address',
  'Area',
  'Plan',
  'Bins',
  'Extras',
  'Date',
  'Time',
  'Info',
  'Pay',
  'Done',
]

export default function BookAppointment() {
  const [params] = useSearchParams()
  const [step, setStep] = useState(0)
  const [data, setData] = useState({
    street: '',
    city: 'Lakewood Ranch',
    state: 'FL',
    zip: '',
    notes: '',
    planId: params.get('plan') || '',
    pricing_id: params.get('plan') ? Number(params.get('plan')) || params.get('plan') : null,
    bins: { trash: 1, recycle: 1, compost: 0 },
    extras: [],
    date: null,
    timeSlot: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const patch = (partial) => setData((d) => ({ ...d, ...partial }))
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const StepView = useMemo(() => {
    const props = { data, onChange: patch, onNext: next, onBack: back }
    const map = [
      AddressStep,
      CheckAreaStep,
      PlanStep,
      BinsStep,
      ExtrasStep,
      CalendarStep,
      TimeSlotsStep,
      CustomerInfoStep,
      PaymentStep,
      ConfirmationStep,
    ]
    const Comp = map[step]
    return <Comp {...props} />
  }, [step, data])

  return (
    <>
      <SEO title="Book Appointment" description="Book CanSani trash bin cleaning in Lakewood Ranch, FL." path="/book" />
      <section className="section-pad gradient-mesh">
        <div className="container-page max-w-2xl">
          <h1 className="font-display text-2xl font-bold md:text-4xl sm:text-3xl">Book CanSani</h1>
          <p className="mt-2 text-sm text-muted">Sparkling bins in a few guided steps.</p>

          {step < STEPS.length - 1 && (
            <div className="mt-6 flex gap-1 overflow-x-auto pb-2">
              {STEPS.slice(0, -1).map((label, i) => (
                <div
                  key={label}
                  className={cn(
                    'min-w-[4.5rem] rounded-full px-2 py-1 text-center text-[10px] font-semibold uppercase tracking-wide',
                    i === step && 'bg-teal text-white',
                    i < step && 'bg-mint text-teal',
                    i > step && 'bg-charcoal/5 text-muted'
                  )}
                >
                  {label}
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 rounded-3xl border border-charcoal/8 bg-white p-4 shadow-lg sm:p-6 dark:border-mint/10 dark:bg-[#0c1e32]">
            {StepView}
          </div>
        </div>
      </section>
    </>
  )
}
