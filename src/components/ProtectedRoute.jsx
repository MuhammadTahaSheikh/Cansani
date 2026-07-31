import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import Spinner from '@/components/ui/Spinner'

export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, user, hydrated } = useAuthStore()
  const location = useLocation()

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (roles?.length && !roles.includes(user?.role)) {
    const fallback =
      user?.role === 'admin' ? '/admin' : user?.role === 'technician' ? '/technician' : '/dashboard'
    return <Navigate to={fallback} replace />
  }

  return children
}
