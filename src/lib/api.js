import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.cansani.com/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cansani_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const path = window.location.pathname
      const publicPaths = ['/login', '/register', '/book', '/']
      const hadToken = Boolean(localStorage.getItem('cansani_token'))
      if (hadToken) {
        localStorage.removeItem('cansani_token')
        localStorage.removeItem('cansani_user')
        if (!publicPaths.some((p) => path === p || path.startsWith(p + '/'))) {
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

export default api
