import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  History,
  FileText,
  CreditCard,
  Gift,
  User,
  Image,
  Bell,
  Briefcase,
  Map,
  Users,
  Route,
  DollarSign,
  Ticket,
  Star,
  BarChart3,
  Settings,
  BookOpen,
  HelpCircle,
  MapPin,
  Tags,
  Mail,
  Menu,
  X,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import ScrollToTop from './ScrollToTop'
import { cn } from '@/lib/utils'

const customerNav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/appointments', label: 'Appointments', icon: Calendar },
  { to: '/dashboard/history', label: 'History', icon: History },
  // { to: '/dashboard/invoices', label: 'Invoices', icon: FileText },
  // { to: '/dashboard/subscription', label: 'Subscription', icon: CreditCard },
  { to: '/dashboard/referrals', label: 'Referrals', icon: Gift },
  { to: '/dashboard/photos', label: 'Photos', icon: Image },
  { to: '/dashboard/notifications', label: 'Notifications', icon: Bell },
  { to: '/dashboard/profile', label: 'Profile', icon: User },
]

const techNav = [
  { to: '/technician', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/technician/jobs', label: 'Jobs', icon: Briefcase },
  { to: '/technician/route', label: 'Route Map', icon: Map },
]

const adminNav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { to: '/admin/technicians', label: 'Technicians', icon: Briefcase },
  { to: '/admin/routes', label: 'Routes', icon: Route },
  { to: '/admin/invoices', label: 'Invoices', icon: FileText },
  { to: '/admin/payments', label: 'Payments', icon: DollarSign },
  { to: '/admin/coupons', label: 'Coupons', icon: Ticket },
  { to: '/admin/referrals', label: 'Referrals', icon: Gift },
  { to: '/admin/reviews', label: 'Reviews', icon: Star },
  { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { to: '/admin/blogs', label: 'Blogs', icon: BookOpen },
  { to: '/admin/gallery', label: 'Gallery', icon: Image },
  { to: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { to: '/admin/service-areas', label: 'Service Areas', icon: MapPin },
  { to: '/admin/pricing', label: 'Pricing', icon: Tags },
  { to: '/admin/templates', label: 'Templates', icon: Mail },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

function navForRole(role) {
  if (role === 'admin') return adminNav
  if (role === 'technician') return techNav
  return customerNav
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const { theme, toggle } = useThemeStore()
  const navigate = useNavigate()
  const nav = navForRole(user?.role)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[var(--page-bg)]">
      <ScrollToTop />
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-charcoal/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-charcoal/8 bg-white transition-transform dark:border-mint/10 dark:bg-[#0c1e32] lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link to="/" className="font-display text-lg font-bold">
            Can<span className="text-teal">Sani</span>
          </Link>
          <button type="button" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <nav className="scrollbar-thin flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 rounded-2xl px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-mint/50 hover:text-teal',
                  isActive && 'bg-mint text-teal'
                )
              }
            >
              <item.icon size={17} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-charcoal/8 p-3 dark:border-mint/10">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={17} /> Log out
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-charcoal/8 bg-white/80 px-3 py-3 backdrop-blur-md sm:gap-3 sm:px-4 dark:border-mint/10 dark:bg-[#0c1e32]/90">
          <button
            type="button"
            className="shrink-0 rounded-xl p-2 hover:bg-mint/40 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-semibold">
              {user?.name || 'Account'}
            </p>
            <p className="truncate text-xs capitalize text-muted">{user?.role || 'customer'}</p>
          </div>
          <button
            type="button"
            onClick={toggle}
            className="shrink-0 rounded-xl p-2 hover:bg-mint/40"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>
        <main className="overflow-x-clip p-3 sm:p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
