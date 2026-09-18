import { cn } from '@/lib/utils'
import logoIcon from '@/assets/cansani-logo-icon.webp'
import logoPrimary from '@/assets/cansani-logo-primary.webp'
import logoHorizontal from '@/assets/cansani-logo-horizontal.webp'

const sources = {
  icon: logoIcon,
  primary: logoPrimary,
  horizontal: logoHorizontal,
}

export default function BrandLogo({ variant = 'icon', className = '', alt = 'Can Sani' }) {
  return (
    <img
      src={sources[variant] || sources.icon}
      alt={alt}
      className={cn('object-contain', className)}
    />
  )
}

export function BrandWordmark({ className = '', light = false }) {
  return (
    <span className={cn('font-display font-extrabold uppercase tracking-tight', className)}>
      <span className="text-leaf">Can</span>{' '}
      <span className={light ? 'text-white' : 'text-teal'}>Sani</span>
    </span>
  )
}
