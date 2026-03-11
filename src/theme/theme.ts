export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'mohsin_theme'

export function getStoredTheme(): Theme | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === 'dark' || raw === 'light') return raw
  return null
}

export function setStoredTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme)
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = theme
}

export function getInitialTheme(): Theme {
  const stored = getStoredTheme()
  if (stored) return stored
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
  return prefersDark ? 'dark' : 'light'
}

