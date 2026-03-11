import { useEffect, useMemo, useState } from 'react'
import { applyTheme, getInitialTheme, setStoredTheme, type Theme } from './theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    return getInitialTheme()
  })

  useEffect(() => {
    applyTheme(theme)
    setStoredTheme(theme)
  }, [theme])

  return useMemo(
    () => ({
      theme,
      setTheme,
      toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    }),
    [theme],
  )
}

