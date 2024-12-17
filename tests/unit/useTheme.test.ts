import { renderHook } from '@testing-library/react'
import { useTheme } from '../../src/useTheme.js'
import { changeMatchMedia, mockMatchMedia } from '../mock.js'

describe('useTheme', () => {
  it('should use default dark theme value', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useTheme())
    expect(result.current).toBe('dark')
  })

  it('should use default light theme value', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useTheme())
    expect(result.current).toBe('light')
  })

  it('should listen to theme change', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useTheme())
    expect(result.current).toBe('light')
    changeMatchMedia(true)
    expect(result.current).toBe('dark')
    changeMatchMedia(false)
    expect(result.current).toBe('light')
  })

  it('should set document color scheme', () => {
    vi.spyOn(document.documentElement.style, 'setProperty')
    mockMatchMedia(false)
    renderHook(() => useTheme())
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('color-scheme', 'light')
    changeMatchMedia(true)
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('color-scheme', 'dark')
    changeMatchMedia(false)
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('color-scheme', 'light')
  })
})
