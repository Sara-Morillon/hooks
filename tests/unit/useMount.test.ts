import { renderHook } from '@testing-library/react'
import { useMount } from '../../src/useMount'

describe('useMount', () => {
  it('should be mounted', () => {
    const { result } = renderHook(useMount)
    expect(result.current).toBe(true)
  })

  it('should not be mounted after unmount', () => {
    const { result, unmount } = renderHook(useMount)
    unmount()
    expect(result.current).toBe(false)
  })
})
