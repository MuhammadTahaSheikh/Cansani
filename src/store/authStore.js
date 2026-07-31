import { create } from 'zustand'

const TOKEN_KEY = 'cansani_token'
const USER_KEY = 'cansani_user'

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  hydrated: false,

  hydrate: () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY)
      const raw = localStorage.getItem(USER_KEY)
      const user = raw ? JSON.parse(raw) : null
      set({
        token,
        user,
        isAuthenticated: Boolean(token && user),
        hydrated: true,
      })
    } catch {
      set({ user: null, token: null, isAuthenticated: false, hydrated: true })
    }
  },

  login: (user, token) => {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    set({ user, token, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    set({ user: null, token: null, isAuthenticated: false })
  },

  updateUser: (partial) => {
    set((state) => {
      const user = { ...state.user, ...partial }
      localStorage.setItem(USER_KEY, JSON.stringify(user))
      return { user }
    })
  },
}))
