import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { COMPANY } from '@/data/content'
import logoImg from '@/assets/cansani.jpg'

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
    toast.success('You are on the list — welcome to CanSani updates!')
    setEmail('')
  }

  return (
    <footer className="border-t border-white/10 bg-[#0b1f4a] text-white">
      <div className="container-page section-pad !pb-10 !pt-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={logoImg} alt="" className="h-10 w-10 rounded-md bg-white object-contain p-0.5" />
              <span className="font-display text-2xl font-bold text-white">
                Can<span className="text-leaf-light">Sani</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
              {COMPANY.tagline} Premium trash bin cleaning across Lakewood Ranch, FL.
            </p>
            <div className="mt-5 space-y-2 text-sm text-white/85">
              <a href={COMPANY.phoneHref} className="flex items-center gap-2 hover:text-teal-light">
                <Phone size={16} /> {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-teal-light">
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
                    <Link to={item.to} className="text-sm text-white/75 transition hover:text-teal-light">
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

        <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} CanSani. All rights reserved.</p>
          <p>{COMPANY.hours}</p>
        </div>
      </div>
    </footer>
  )
}
