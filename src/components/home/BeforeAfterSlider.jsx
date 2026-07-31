import { useState } from 'react'
import { GALLERY } from '@/data/content'

export default function BeforeAfterSlider({ pairs = GALLERY }) {
  const [index, setIndex] = useState(0)
  const [pos, setPos] = useState(50)
  const pair = pairs[index] || pairs[0]

  return (
    <section className="section-pad bg-white dark:bg-[#0c1e32]">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Before & after</h2>
          <p className="mt-3 text-muted">Drag to reveal the CanSani difference.</p>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl sm:aspect-[16/10]">
            <img src={pair.after} alt="After cleaning" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
              <img
                src={pair.before}
                alt="Before cleaning"
                className="h-full max-w-none object-cover"
                style={{ width: `${100 / (pos / 100)}%`, maxWidth: 'none', height: '100%' }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
              aria-label="Before after slider"
            />
            <div
              className="pointer-events-none absolute inset-y-0 z-[5] w-0.5 bg-white shadow"
              style={{ left: `${pos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xs font-bold text-teal shadow-lg">
                ↔
              </div>
            </div>
            <span className="absolute left-3 top-3 rounded-full bg-charcoal/70 px-2.5 py-1 text-xs font-semibold text-white">
              Before
            </span>
            <span className="absolute right-3 top-3 rounded-full bg-teal/90 px-2.5 py-1 text-xs font-semibold text-white">
              After
            </span>
          </div>
          <p className="mt-3 text-center text-sm text-muted">{pair.caption}</p>
          <div className="mt-4 flex justify-center gap-2">
            {pairs.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setIndex(i); setPos(50) }}
                className={`h-2.5 w-2.5 rounded-full ${i === index ? 'bg-teal' : 'bg-charcoal/20'}`}
                aria-label={`Show pair ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
