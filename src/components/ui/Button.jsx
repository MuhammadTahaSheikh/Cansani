import { cn } from '@/lib/utils'

const variants = {
  primary:
    'bg-teal text-white hover:bg-teal-dark shadow-lg shadow-teal/30 disabled:!bg-[#e8eef4] disabled:!text-[#5a6b7d] disabled:shadow-none disabled:opacity-100',
  secondary:
    'bg-charcoal text-white hover:bg-charcoal/90 shadow-lg shadow-charcoal/15 disabled:!bg-[#e8eef4] disabled:!text-[#5a6b7d] disabled:shadow-none disabled:opacity-100',
  outline:
    'border-2 border-charcoal/25 bg-white text-charcoal hover:border-teal hover:text-teal dark:border-white/30 dark:bg-transparent dark:text-white dark:hover:border-teal-light dark:hover:text-teal-light disabled:opacity-50',
  ghost:
    'text-charcoal hover:bg-mint dark:text-white dark:hover:bg-white/10 disabled:opacity-50',
  sand: 'border border-charcoal/10 bg-white text-charcoal hover:bg-mint shadow-md shadow-black/10 disabled:opacity-50',
  danger: 'bg-red-600 text-white hover:bg-red-700 disabled:opacity-50',
}

const sizes = {
  sm: 'px-3.5 py-2 text-sm rounded-xl',
  md: 'px-5 py-2.5 text-sm rounded-2xl',
  lg: 'px-7 py-3.5 text-base rounded-2xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  loading = false,
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
      )}
      {children}
    </button>
  )
}
