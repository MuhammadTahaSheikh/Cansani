import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'

import PublicLayout from '@/components/layout/PublicLayout'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'

import Home from '@/pages/Home'
import About from '@/pages/About'
import Services from '@/pages/Services'
import Pricing from '@/pages/Pricing'
import ServiceAreas from '@/pages/ServiceAreas'
import FAQ from '@/pages/FAQ'
import Gallery from '@/pages/Gallery'
import Contact from '@/pages/Contact'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import BookAppointment from '@/pages/BookAppointment'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Referral from '@/pages/Referral'
import Checkout from '@/pages/Checkout'
import PaymentSuccess from '@/pages/PaymentSuccess'
import Privacy from '@/pages/Privacy'
import Terms from '@/pages/Terms'

import CustomerDashboard from '@/pages/customer/Dashboard'
import CustomerAppointments from '@/pages/customer/Appointments'
import CustomerHistory from '@/pages/customer/History'
import CustomerInvoices from '@/pages/customer/Invoices'
import CustomerSubscription from '@/pages/customer/Subscription'
import CustomerReferrals from '@/pages/customer/Referrals'
import CustomerProfile from '@/pages/customer/Profile'
import CustomerPhotos from '@/pages/customer/Photos'
import CustomerNotifications from '@/pages/customer/Notifications'

import TechDashboard from '@/pages/technician/Dashboard'
import TechJobs from '@/pages/technician/Jobs'
import TechJobDetail from '@/pages/technician/JobDetail'
import TechRouteMap from '@/pages/technician/RouteMap'

import AdminDashboard from '@/pages/admin/Dashboard'
import AdminCustomers from '@/pages/admin/Customers'
import AdminAppointments from '@/pages/admin/Appointments'
import AdminTechnicians from '@/pages/admin/Technicians'
import AdminRoutes from '@/pages/admin/Routes'
import AdminInvoices from '@/pages/admin/Invoices'
import AdminPayments from '@/pages/admin/Payments'
import AdminCoupons from '@/pages/admin/Coupons'
import AdminReferrals from '@/pages/admin/Referrals'
import AdminReviews from '@/pages/admin/Reviews'
import AdminReports from '@/pages/admin/Reports'
import AdminSettings from '@/pages/admin/Settings'
import AdminBlogs from '@/pages/admin/Blogs'
import AdminGallery from '@/pages/admin/Gallery'
import AdminFAQs from '@/pages/admin/FAQs'
import AdminServiceAreas from '@/pages/admin/ServiceAreas'
import AdminPricing from '@/pages/admin/Pricing'
import AdminTemplates from '@/pages/admin/Templates'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="service-areas" element={<ServiceAreas />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route
          path="book"
          element={
            <ProtectedRoute roles={['customer']}>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="referral" element={<Referral />} />
        <Route
          path="checkout"
          element={
            <ProtectedRoute roles={['customer']}>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="payment-success"
          element={
            <ProtectedRoute roles={['customer']}>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
      </Route>

      <Route
        path="dashboard"
        element={
          <ProtectedRoute roles={['customer']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CustomerDashboard />} />
        <Route path="appointments" element={<CustomerAppointments />} />
        <Route path="history" element={<CustomerHistory />} />
        <Route path="invoices" element={<CustomerInvoices />} />
        <Route path="subscription" element={<CustomerSubscription />} />
        <Route path="referrals" element={<CustomerReferrals />} />
        <Route path="profile" element={<CustomerProfile />} />
        <Route path="photos" element={<CustomerPhotos />} />
        <Route path="notifications" element={<CustomerNotifications />} />
      </Route>

      <Route
        path="technician"
        element={
          <ProtectedRoute roles={['technician']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TechDashboard />} />
        <Route path="jobs" element={<TechJobs />} />
        <Route path="jobs/:id" element={<TechJobDetail />} />
        <Route path="route" element={<TechRouteMap />} />
      </Route>

      <Route
        path="admin"
        element={
          <ProtectedRoute roles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="technicians" element={<AdminTechnicians />} />
        <Route path="routes" element={<AdminRoutes />} />
        <Route path="invoices" element={<AdminInvoices />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="coupons" element={<AdminCoupons />} />
        <Route path="referrals" element={<AdminReferrals />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="blogs" element={<AdminBlogs />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="faqs" element={<AdminFAQs />} />
        <Route path="service-areas" element={<AdminServiceAreas />} />
        <Route path="pricing" element={<AdminPricing />} />
        <Route path="templates" element={<AdminTemplates />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  const hydrateAuth = useAuthStore((s) => s.hydrate)
  const hydrateTheme = useThemeStore((s) => s.hydrate)

  useEffect(() => {
    hydrateAuth()
    hydrateTheme()
  }, [hydrateAuth, hydrateTheme])

  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'font-sans text-sm',
            style: {
              borderRadius: '16px',
              background: '#0B1F1A',
              color: '#F0FDFA',
            },
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  )
}
