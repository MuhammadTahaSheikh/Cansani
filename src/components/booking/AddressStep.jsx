import toast from 'react-hot-toast'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

/** Split a pasted "123 Main St, City, ST 12345" into fields */
function parsePastedAddress(raw) {
  const value = String(raw || '').trim()
  const full = value.match(/^(.+?),\s*([^,]+),\s*([A-Za-z]{2})\s+(\d{5})(?:-\d{4})?$/)
  if (full) {
    return {
      street: full[1].trim(),
      city: full[2].trim(),
      state: full[3].toUpperCase(),
      zip: full[4],
    }
  }
  return null
}

export default function AddressStep({ data, onChange, onNext }) {
  const valid = data.street && data.city && data.state && data.zip

  const handleContinue = () => {
    const pasted = parsePastedAddress(data.street)
    let next = { ...data }

    if (pasted) {
      // Prefer Lakewood Ranch FL fields if user already corrected city/state/zip
      next = {
        ...next,
        street: pasted.street,
        city: data.city?.toLowerCase().includes('ranch') ? data.city : pasted.city,
        state: data.state === 'FL' ? 'FL' : pasted.state,
        zip: data.zip?.length === 5 ? data.zip : pasted.zip,
      }
      onChange(next)
    }

    // Strip leftover ", City, ST ZIP" fragments from street
    const cleanedStreet = String(next.street)
      .replace(/,\s*[^,]+,\s*[A-Za-z]{2}\s+\d{5}(?:-\d{4})?$/i, '')
      .trim()
    if (cleanedStreet !== next.street) {
      next = { ...next, street: cleanedStreet }
      onChange(next)
    }

    if (/,?\s*CO\s+\d{5}/i.test(data.street) && next.state === 'FL') {
      toast.success('Street cleaned — using Lakewood Ranch, FL details')
    }

    if (next.state !== 'FL') {
      toast.error('We currently serve Florida only. Set state to FL.')
      return
    }

    onNext()
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-bold">Service address</h2>
        <p className="mt-1 text-sm text-muted">
          Lakewood Ranch, Florida and nearby communities (use a FL ZIP like 34202).
        </p>
      </div>
      <Input
        label="Street address"
        value={data.street}
        onChange={(e) => onChange({ street: e.target.value })}
        onBlur={(e) => {
          const pasted = parsePastedAddress(e.target.value)
          if (pasted) {
            onChange({
              street: pasted.street,
              city: pasted.city.toLowerCase() === 'lakewood' ? 'Lakewood Ranch' : pasted.city,
              state: pasted.state === 'CO' ? 'FL' : pasted.state,
              zip: pasted.state === 'CO' ? data.zip || '34202' : pasted.zip,
            })
          }
        }}
        placeholder="8140 Lakewood Ranch Blvd"
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <Input
          label="City"
          value={data.city}
          onChange={(e) => onChange({ city: e.target.value })}
          placeholder="Lakewood Ranch"
        />
        <Input
          label="State"
          value={data.state}
          onChange={(e) => onChange({ state: e.target.value.toUpperCase().slice(0, 2) })}
          placeholder="FL"
          maxLength={2}
        />
        <Input
          label="ZIP"
          value={data.zip}
          onChange={(e) => onChange({ zip: e.target.value.replace(/\D/g, '').slice(0, 5) })}
          placeholder="34202"
          inputMode="numeric"
        />
      </div>
      <Input
        label="Gate code / notes (optional)"
        value={data.notes}
        onChange={(e) => onChange({ notes: e.target.value })}
        placeholder="Side gate, leave bins out"
      />
      <Button className="w-full sm:w-auto" disabled={!valid} onClick={handleContinue}>
        Continue
      </Button>
    </div>
  )
}
