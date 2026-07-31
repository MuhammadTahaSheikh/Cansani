import { cn } from '@/lib/utils'

const tones = {
  teal: 'bg-mint text-teal-dark',
  sand: 'bg-sand text-charcoal',
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-700',
  muted: 'bg-charcoal/5 text-muted',
}

export default function Badge({ children, tone = 'teal', className = '' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
