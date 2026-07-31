import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Moon, Sun, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { COMPANY } from '@/data/content'
import { cn } from '@/lib/utils'
import logoImg from '@/assets/cansani.jpg'

const links = [
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/service-areas', label: 'Areas' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()
  const { theme, toggle } = useThemeStore()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const dashPath =
    user?.role === 'admin'
      ? '/admin'
      : user?.role === 'technician'
        ? '/technician'
        : '/dashboard'

  const close = () => setOpen(false)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-charcoal/10 bg-white/95 py-3 shadow-sm backdrop-blur-md transition-shadow duration-300 dark:border-white/10 dark:bg-[#0c1e32]/95',
        scrolled && 'shadow-md'
      )}
    >
      <div className="container-page flex items-center gap-3 lg:gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2" onClick={close}>
          <img
            src={logoImg}
            alt="CanSani"
            className="h-9 w-9 shrink-0 rounded-md object-contain bg-white p-0.5 shadow-sm sm:h-10 sm:w-10"
          />
          <span className="font-display text-lg font-bold tracking-tight text-charcoal sm:text-xl dark:text-white">
            Can<span className="text-leaf">Sani</span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  'rounded-xl px-2.5 py-2 text-sm font-semibold transition xl:px-3',
                  isActive
                    ? 'bg-teal/10 text-teal dark:bg-teal/20 dark:text-teal-light'
                    : 'text-charcoal/80 hover:bg-mint hover:text-teal dark:text-white/85 dark:hover:bg-white/10 dark:hover:text-white'
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={toggle}
            className="rounded-xl p-2 text-charcoal/70 hover:bg-mint dark:text-white/80 dark:hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate(dashPath)}>
                <User size={16} /> Dashboard
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout()
                  navigate('/')
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              Log in
            </Button>
          )}
          <Button size="sm" onClick={() => navigate('/book')}>
            Book Now
          </Button>
        </div>

        <button
          type="button"
          className="ml-auto rounded-xl p-2 text-charcoal lg:hidden dark:text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="max-h-[min(80dvh,32rem)] overflow-y-auto border-t border-charcoal/10 bg-white dark:border-white/10 dark:bg-[#0c1e32] lg:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4 safe-pb">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={close}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-charcoal hover:bg-mint dark:text-white dark:hover:bg-white/10"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-charcoal/10 pt-3 dark:border-white/10">
                <a href={COMPANY.phoneHref} className="px-3 py-1 text-sm font-semibold text-teal">
                  {COMPANY.phone}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    toggle()
                  }}
                  className="flex items-center gap-2 rounded-xl px-3 py-3 text-left text-sm font-semibold text-charcoal hover:bg-mint dark:text-white dark:hover:bg-white/10"
                >
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </button>
                <Button
                  className="w-full"
                  onClick={() => {
                    close()
                    navigate('/book')
                  }}
                >
                  Book Now
                </Button>
                {isAuthenticated ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        close()
                        navigate(dashPath)
                      }}
                    >
                      <User size={16} /> Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => {
                        close()
                        logout()
                        navigate('/')
                      }}
                    >
                      Log out
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      close()
                      navigate('/login')
                    }}
                  >
                    Log in
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
