import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import api from '@/lib/api'

/** Local fallback if API/DB are stale — Lakewood Ranch, FL ZIPs */
const FL_SERVICE_ZIPS = {
  34202: 'Lakewood Ranch Core',
  34211: 'Lakewood Ranch Core',
  34212: 'Lakewood Ranch Core',
  34240: 'Lakewood Ranch Core',
  34243: 'Sarasota Corridor',
  34232: 'Sarasota Corridor',
  34239: 'Sarasota Corridor',
  34233: 'Sarasota Corridor',
  34209: 'Bradenton Area',
  34205: 'Bradenton Area',
  34208: 'Bradenton Area',
  34221: 'Bradenton Area',
  34219: 'North Manatee',
  34222: 'North Manatee',
  34201: 'North Manatee',
}

export default function CheckAreaStep({ data, onChange, onNext, onBack }) {
  const [status, setStatus] = useState(data.areaChecked ? (data.inArea ? 'ok' : 'no') : 'idle')
  const [loading, setLoading] = useState(false)
  const [areaName, setAreaName] = useState(data.areaName || '')

  const markAvailable = (name, serviceAreaId = null) => {
    onChange({
      inArea: true,
      areaChecked: true,
      areaName: name,
      service_area_id: serviceAreaId,
    })
    setAreaName(name)
    setStatus('ok')
  }

  const markUnavailable = () => {
    onChange({ inArea: false, areaChecked: true, areaName: '', service_area_id: null })
    setAreaName('')
    setStatus('no')
  }

  const check = async () => {
    const zip = String(data.zip || '').trim().slice(0, 5)
    if (!zip) {
      toast.error('Enter a ZIP code on the previous step')
      return
    }
    setLoading(true)
    try {
      const { data: res } = await api.post('/booking/check-area', { zip_code: zip })
      const available = res.data?.available
      const area = res.data?.area
      if (available) {
        markAvailable(area?.name || FL_SERVICE_ZIPS[zip] || 'Lakewood Ranch', area?.id)
        return
      }
      // API said no — still allow known FL ZIPs (DB may still have old Austin routes)
      if (FL_SERVICE_ZIPS[zip]) {
        markAvailable(FL_SERVICE_ZIPS[zip])
        return
      }
      markUnavailable()
      toast.error(res.message || 'Outside service area')
    } catch {
      if (FL_SERVICE_ZIPS[zip]) {
        markAvailable(FL_SERVICE_ZIPS[zip])
        return
      }
      toast.error('Could not check coverage. Use a Lakewood Ranch, FL ZIP like 34202.')
      markUnavailable()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!data.areaChecked && data.zip) check()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-bold">Check your area</h2>
        <p className="mt-1 text-sm text-muted">
          Confirming coverage for {data.street}, {data.city}, {data.state} {data.zip}
        </p>
      </div>

      {status === 'idle' && !loading && (
        <Button onClick={check} loading={loading} className="w-full sm:w-auto">
          Check coverage
        </Button>
      )}

      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted">
          <Loader2 className="animate-spin" size={16} /> Scanning Lakewood Ranch routes…
        </div>
      )}

      {status === 'ok' && (
        <div className="flex items-start gap-3 rounded-2xl bg-mint/60 p-4 text-teal-dark">
          <CheckCircle2 className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">You are in our service area</p>
            <p className="text-sm opacity-80">
              {areaName ? `${areaName} — ` : ''}CanSani serves your neighborhood.
            </p>
          </div>
        </div>
      )}

      {status === 'no' && (
        <div className="flex items-start gap-3 rounded-2xl bg-red-50 p-4 text-red-800">
          <XCircle className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">Outside current routes</p>
            <p className="mt-1 text-sm text-red-700/90">
              We serve Lakewood Ranch, FL (ZIPs 34202, 34211, 34212, and nearby). Street should be
              the house number only — do not paste a Colorado (CO) address into the street field.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={onBack}>
                Edit address
              </Button>
              <Button size="sm" variant="ghost" onClick={check} loading={loading}>
                Try again
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        {status === 'ok' ? (
          <Button onClick={onNext}>Continue</Button>
        ) : (
          <p className="text-sm font-medium text-charcoal/70">
            Confirm a covered FL ZIP to continue
          </p>
        )}
      </div>
    </div>
  )
}
