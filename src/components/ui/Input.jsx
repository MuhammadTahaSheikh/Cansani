import { cn } from '@/lib/utils'

export default function Input({ label, error, className = '', id, ...props }) {
  const inputId = id || props.name
  return (
    <label className="block space-y-1.5">
      {label && (
        <span className="text-sm font-medium text-charcoal dark:text-white/85">{label}</span>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-2xl border border-charcoal/15 bg-white px-4 py-3 text-base text-charcoal outline-none transition placeholder:text-charcoal/40 focus:border-teal focus:ring-2 focus:ring-teal/20 sm:text-sm dark:border-white/20 dark:bg-[#0c1e32] dark:text-white dark:placeholder:text-white/40',
          error && 'border-red-400 focus:border-red-500 focus:ring-red-200',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  )
}
