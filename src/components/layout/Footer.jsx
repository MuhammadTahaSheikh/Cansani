import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Leaf, Mail, MapPin, Phone } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { COMPANY } from '@/data/content'
import BrandLogo from '@/components/BrandLogo'

const footerLinks = [
  {
    title: 'Company',
    items: [
      { to: '/about', label: 'About' },
      { to: '/services', label: 'Services' },
      { to: '/gallery', label: 'Gallery' },
      { to: '/blog', label: 'Blog' },
    ],
  },
  {
    title: 'Service',
    items: [
      { to: '/pricing', label: 'Pricing' },
      { to: '/service-areas', label: 'Service Areas' },
      { to: '/book', label: 'Book Now' },
      { to: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { to: '/privacy', label: 'Privacy' },
      { to: '/terms', label: 'Terms' },
      { to: '/contact', label: 'Contact' },
      { to: '/referral', label: 'Referrals' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  const subscribe = (e) => {
    e.preventDefault()
    if (!email.includes('@')) {
      toast.error('Enter a valid email')
      return
    }
    toast.success(`You are on the list — welcome to ${COMPANY.name} updates!`)
    setEmail('')
  }

  return (
    <footer className="border-t border-white/10 bg-charcoal text-white">
      <div className="container-page section-pad !pb-10 !pt-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center">
              <BrandLogo
                variant="horizontal"
                className="h-16 w-auto max-w-[260px] rounded-xl bg-white px-2 py-1"
              />
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
              {COMPANY.tagline} Eco-friendly trash can cleaning across Lakewood Ranch, FL.
            </p>
            <div className="mt-5 space-y-2 text-sm text-white/85">
              <a href={COMPANY.phoneHref} className="flex items-center gap-2 hover:text-aqua">
                <Phone size={16} /> {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-aqua">
                <Mail size={16} /> {COMPANY.email}
              </a>
              <p className="flex items-center gap-2">
                <MapPin size={16} /> {COMPANY.address}
              </p>
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="font-display text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.items.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="text-sm text-white/75 transition hover:text-aqua">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-semibold text-white">Newsletter</h4>
            <p className="mt-2 text-sm text-white/75">Tips, offers, and route updates.</p>
            <form onSubmit={subscribe} className="mt-3 space-y-2">
              <Input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-white/20 bg-white/10 text-white placeholder:text-white/45"
              />
              <Button type="submit" size="sm" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved. · {COMPANY.hours}</p>
          <p className="flex max-w-md items-start gap-2 text-white/70 sm:text-right">
            <Leaf size={16} className="mt-0.5 shrink-0 text-leaf" />
            {COMPANY.mission}
          </p>
        </div>
      </div>
    </footer>
  )
}
