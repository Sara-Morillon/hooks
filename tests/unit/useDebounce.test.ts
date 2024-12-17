import { renderHook } from '@testing-library/react'
import { useDebounce } from '../../src/useDebounce.js'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.spyOn(global, 'setTimeout').mockReturnValue(undefined as never)
  })

  it('should return initial value', () => {
    const { result } = renderHook((props) => useDebounce(props), { initialProps: 'value' })
    expect(result.current).toBe('value')
  })

  it('should return initial value if timeout was not reached', () => {
    const { result, rerender } = renderHook((props) => useDebounce(props), { initialProps: 'value' })
    expect(result.current).toBe('value')
    rerender('value2')
    expect(result.current).toBe('value')
  })

  it('should return new value if timeout was reached', () => {
    vi.spyOn(global, 'setTimeout').mockImplementation((fn) => fn() as never)
    const { result, rerender } = renderHook((props) => useDebounce(props), { initialProps: 'value' })
    expect(result.current).toBe('value')
    rerender('value2')
    expect(result.current).toBe('value2')
  })
})
