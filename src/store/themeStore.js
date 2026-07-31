import { create } from 'zustand'

const THEME_KEY = 'cansani_theme'

export const useThemeStore = create((set) => ({
  theme: 'light',

  hydrate: () => {
    const saved = localStorage.getItem(THEME_KEY) || 'light'
    document.documentElement.classList.toggle('dark', saved === 'dark')
    set({ theme: saved })
  },

  setTheme: (theme) => {
    localStorage.setItem(THEME_KEY, theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
    set({ theme })
  },

  toggle: () => {
    set((state) => {
      const theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem(THEME_KEY, theme)
      document.documentElement.classList.toggle('dark', theme === 'dark')
      return { theme }
    })
  },
}))
