import { act, renderHook } from '@testing-library/react'
import { useAction } from '../../src/useAction.js'
import { flushPromises } from '../mock.js'

describe('useAction', () => {
  it('should not be loading by default', () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAction(queryFn))
    expect(result.current.loading).toBe(false)
  })

  it('should not have error by default', () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAction(queryFn))
    expect(result.current.error).toBeUndefined()
  })

  it('should run callback when executing query', async () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAction(queryFn))
    await act(() => result.current.execute())
    expect(queryFn).toHaveBeenCalled()
  })

  it('should run callback with params when executing query', async () => {
    const queryFn = vi.fn<(a: string) => Promise<string>>().mockResolvedValue('result')
    const { result } = renderHook(() => useAction(queryFn))
    await act(() => result.current.execute('a'))
    expect(queryFn).toHaveBeenCalledWith('a')
  })

  // Waiting for this issue to be fixed: https://github.com/testing-library/react-hooks-testing-library/issues/847
  it.skip('should not run callback when executing query after unmount', async () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result, unmount } = renderHook(() => useAction(queryFn))
    unmount()
    await act(() => result.current.execute())
    expect(queryFn).not.toHaveBeenCalled()
  })

  it('should be loading when executing query', async () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAction(queryFn))
    act(() => void result.current.execute())
    expect(result.current.loading).toBe(true)
    await flushPromises()
  })

  it('should return query result', async () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAction(queryFn))
    await act(() => result.current.execute())
    expect(result.current.result).toBe('result')
  })

  it('should return query error', async () => {
    const queryFn = vi.fn().mockRejectedValue('error')
    const { result } = renderHook(() => useAction(queryFn))
    await act(() => result.current.execute())
    expect(result.current.error).toBe('error')
  })
})
