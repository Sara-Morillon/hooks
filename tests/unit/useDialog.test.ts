import { act, renderHook } from '@testing-library/react'
import { useDialog } from '../../src/useDialog'

describe('useDialog', () => {
  it('should return dialog ref', () => {
    const { result } = renderHook(() => useDialog())
    expect(result.current.ref).toEqual({ current: null })
  })

  it('should return dialog visibility', () => {
    const { result } = renderHook(() => useDialog())
    expect(result.current.visible).toBe(false)
  })

  it('should show dialog', () => {
    const { result } = renderHook(() => useDialog())
    act(() => {
      result.current.show()
    })
    expect(result.current.visible).toBe(true)
  })

  it('should hide dialog', () => {
    const { result } = renderHook(() => useDialog())
    act(() => {
      result.current.show()
    })
    act(() => {
      result.current.hide()
    })
    expect(result.current.visible).toBe(false)
  })
})
