import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'

const binTypes = [
  { id: 'trash', label: 'Trash' },
  { id: 'recycle', label: 'Recycling' },
  { id: 'compost', label: 'Compost' },
]

export default function BinsStep({ data, onChange, onNext, onBack }) {
  const bins = data.bins || { trash: 1, recycle: 0, compost: 0 }
  const total = Object.values(bins).reduce((a, b) => a + Number(b), 0)

  const setBin = (id, value) => {
    onChange({ bins: { ...bins, [id]: Number(value) } })
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-bold">Your bins</h2>
        <p className="mt-1 text-sm text-muted">Plans include up to 2 bins. Extras can be added next.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {binTypes.map((b) => (
          <Select
            key={b.id}
            label={b.label}
            value={bins[b.id] ?? 0}
            onChange={(e) => setBin(b.id, e.target.value)}
          >
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </Select>
        ))}
      </div>
      <p className="text-sm text-muted">Total bins: <strong>{total}</strong></p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button disabled={total < 1} onClick={onNext}>Continue</Button>
      </div>
    </div>
  )
}
