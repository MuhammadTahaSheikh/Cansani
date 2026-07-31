import { cn } from '@/lib/utils'

export default function Select({ label, error, children, className = '', id, ...props }) {
  const selectId = id || props.name
  return (
    <label className="block space-y-1.5">
      {label && (
        <span className="text-sm font-medium text-charcoal dark:text-white/85">{label}</span>
      )}
      <select
        id={selectId}
        className={cn(
          'w-full rounded-2xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20 dark:border-white/20 dark:bg-[#0c1e32] dark:text-white',
          error && 'border-red-400',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  )
}
