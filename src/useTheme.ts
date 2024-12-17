import { useCallback, useEffect, useMemo, useState } from 'react'

export type Theme = 'dark' | 'light'

export function useTheme(): Theme {
  const matchMedia = useMemo(() => window.matchMedia('(prefers-color-scheme: dark)'), [])
  const [theme, setTheme] = useState<Theme>(matchMedia.matches ? 'dark' : 'light')

  const onThemeChange = useCallback((e: MediaQueryListEvent) => {
    setTheme(e.matches ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty('color-scheme', theme)
  }, [theme])

  useEffect(() => {
    matchMedia.addEventListener('change', onThemeChange)
    return () => {
      matchMedia.removeEventListener('change', onThemeChange)
    }
  }, [matchMedia, onThemeChange])

  return theme
}
