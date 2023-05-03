import { renderHook } from '@testing-library/react'
import { useDebounce } from '../../src'

describe('useDebounce', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setTimeout').mockImplementation()
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
    jest.spyOn(global, 'setTimeout').mockImplementation((fn) => fn() as never)
    const { result, rerender } = renderHook((props) => useDebounce(props), { initialProps: 'value' })
    expect(result.current).toBe('value')
    rerender('value2')
    expect(result.current).toBe('value2')
  })
})
