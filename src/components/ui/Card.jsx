import { cn } from '@/lib/utils'

export default function Card({ children, className = '', onClick, as: Comp = 'div', ...props }) {
  const interactive = Boolean(onClick) || Comp === 'button' || Comp === 'a'
  return (
    <Comp
      onClick={onClick}
      className={cn(
        'rounded-3xl border border-charcoal/8 bg-white p-5 shadow-sm dark:border-mint/10 dark:bg-[#0c1e32]',
        interactive &&
          'cursor-pointer transition hover:-translate-y-0.5 hover:border-teal/30 hover:shadow-lg hover:shadow-teal/10',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
