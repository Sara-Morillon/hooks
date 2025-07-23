import { act, renderHook } from '@testing-library/react'
import { useQuery } from '../../src/useQuery.js'
import { flushPromises } from '../mock.js'

describe('useQuery', () => {
  it('should be loading by default', async () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useQuery(queryFn))
    expect(result.current.loading).toBe(true)
    await act(() => Promise.resolve())
  })

  it('should not have error by default', async () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useQuery(queryFn))
    await act(() => Promise.resolve())
    expect(result.current.error).toBeUndefined()
  })

  it('should return default value by default', async () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useQuery(queryFn, { defaultValue: 'default' }))
    expect(result.current.result).toBe('default')
    await act(() => Promise.resolve())
  })

  it('should automatically execute query', async () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    renderHook(() => useQuery(queryFn))
    await act(() => Promise.resolve())
    expect(queryFn).toHaveBeenCalled()
  })

  it('should run callback when executing query', async () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useQuery(queryFn))
    await act(() => result.current.refresh())
    expect(queryFn).toHaveBeenCalled()
  })

  // Waiting for this issue to be fixed: https://github.com/testing-library/react-hooks-testing-library/issues/847
  it.skip('should not run callback when executing query after unmount', async () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result, unmount } = renderHook(() => useQuery(queryFn))
    unmount()
    await act(() => result.current.refresh())
    expect(queryFn).not.toHaveBeenCalled()
  })

  it('should be loading when executing query', async () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useQuery(queryFn))
    act(() => void result.current.refresh())
    expect(result.current.loading).toBe(true)
    await flushPromises()
  })

  it('should return query result', async () => {
    const queryFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useQuery(queryFn))
    await act(() => result.current.refresh())
    expect(result.current.result).toBe('result')
  })

  it('should return query error', async () => {
    const queryFn = vi.fn().mockRejectedValue('error')
    const { result } = renderHook(() => useQuery(queryFn))
    await act(() => result.current.refresh())
    expect(result.current.error).toBe('error')
  })
})
