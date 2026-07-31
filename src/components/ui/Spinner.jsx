import { cn } from '@/lib/utils'

export default function Spinner({ className = '', size = 'md' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-teal border-r-transparent',
        sizes[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  )
}
