import { useEffect, useState } from 'react'
import { EXTRAS } from '@/data/content'
import { formatCurrency, cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import api from '@/lib/api'

export default function ExtrasStep({ data, onChange, onNext, onBack }) {
  const selected = data.extras || []
  const [extras, setExtras] = useState(EXTRAS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const { data: res } = await api.get('/pricing')
        const items = res.data?.extras || []
        if (items.length) {
          setExtras(
            items.map((e) => ({
              id: e.id,
              name: e.name,
              description: e.description || '',
              price: Number(e.price),
            }))
          )
        }
      } catch {
        setExtras(EXTRAS)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const toggle = (id) => {
    const next = selected.includes(id)
      ? selected.filter((x) => x !== id)
      : [...selected, id]
    onChange({ extras: next })
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-bold">Add extras</h2>
        <p className="mt-1 text-sm text-muted">Optional upgrades — skip if you do not need any.</p>
      </div>
      {loading ? (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      ) : (
        <div className="space-y-3">
          {extras.map((ex) => (
            <button
              key={ex.id}
              type="button"
              onClick={() => toggle(ex.id)}
              className={cn(
                'flex w-full items-center justify-between rounded-2xl border p-4 text-left transition',
                selected.includes(ex.id)
                  ? 'border-teal bg-mint/40'
                  : 'border-charcoal/10 hover:border-teal/40'
              )}
            >
              <div>
                <p className="font-semibold">{ex.name}</p>
                <p className="text-xs text-muted">{ex.description}</p>
              </div>
              <span className="font-display font-bold text-teal">+{formatCurrency(ex.price)}</span>
            </button>
          ))}
        </div>
      )}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Continue</Button>
      </div>
    </div>
  )
}
