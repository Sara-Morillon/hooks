import { act, renderHook } from '@testing-library/react'
import { useQuery } from '../../src/useQuery'
import { flushPromises } from '../mock'

describe('useQuery', () => {
  it('should not be loading by default', () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useQuery(queryFn))
    expect(result.current.loading).toBe(false)
  })

  it('should not have error by default', () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useQuery(queryFn))
    expect(result.current.error).toBeUndefined()
  })

  it('should return default value by default', () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useQuery(queryFn, { defaultValue: 'default' }))
    expect(result.current.result).toBe('default')
  })

  it('should automatically execute query if autoRun is true', async () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    renderHook(() => useQuery(queryFn, { autoRun: true }))
    await act(() => new Promise(setImmediate))
    expect(queryFn).toHaveBeenCalled()
  })

  it('should run callback when executing query', async () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useQuery(queryFn))
    await act(() => result.current.execute())
    expect(queryFn).toHaveBeenCalled()
  })

  // Waiting for this issue to be fixed: https://github.com/testing-library/react-hooks-testing-library/issues/847
  it.skip('should not run callback when executing query after unmount', async () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result, unmount } = renderHook(() => useQuery(queryFn))
    unmount()
    await act(() => result.current.execute())
    expect(queryFn).not.toHaveBeenCalled()
  })

  it('should be loading when executing query', async () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useQuery(queryFn))
    act(() => void result.current.execute())
    expect(result.current.loading).toBe(true)
    await flushPromises()
  })

  it('should return query result', async () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useQuery(queryFn))
    await act(() => result.current.execute())
    expect(result.current.result).toBe('result')
  })

  it('should return query error', async () => {
    const queryFn = vi.fn().mockRejectedValue('error')
    const { result } = renderHook(() => useQuery(queryFn))
    await act(() => result.current.execute())
    expect(result.current.error).toBe('error')
  })
})
