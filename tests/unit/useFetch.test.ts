import { act, renderHook } from '@testing-library/react'
import { useFetch } from '../../src/useFetch.js'
import { flushPromises } from '../mock.js'

describe('useFetch', () => {
  it('should be loading by default', async () => {
    const fetch = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useFetch(fetch))
    expect(result.current[1].loading).toBe(true)
    await act(() => Promise.resolve())
  })

  it('should not have error by default', async () => {
    const fetch = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useFetch(fetch))
    await act(() => Promise.resolve())
    expect(result.current[1].error).toBeUndefined()
  })

  it('should return default value by default', async () => {
    const fetch = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useFetch(fetch, { defaultValue: 'default' }))
    expect(result.current[0]).toBe('default')
    await act(() => Promise.resolve())
  })

  it('should automatically fetch data', async () => {
    const fetch = vi.fn().mockResolvedValue('result')
    renderHook(() => useFetch(fetch))
    await act(() => Promise.resolve())
    expect(fetch).toHaveBeenCalled()
  })

  it('should run callback when fetching data', async () => {
    const fetch = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useFetch(fetch))
    await act(() => result.current[2]())
    expect(fetch).toHaveBeenCalled()
  })

  // Waiting for this issue to be fixed: https://github.com/testing-library/react-hooks-testing-library/issues/847
  it.skip('should not run callback when fetching data after unmount', async () => {
    const fetch = vi.fn().mockResolvedValue('result')
    const { result, unmount } = renderHook(() => useFetch(fetch))
    unmount()
    await act(() => result.current[2]())
    expect(fetch).not.toHaveBeenCalled()
  })

  it('should be loading when fetching data', async () => {
    const fetch = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useFetch(fetch))
    act(() => void result.current[2]())
    expect(result.current[1].loading).toBe(true)
    await flushPromises()
  })

  it('should return data', async () => {
    const fetch = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useFetch(fetch))
    await act(() => result.current[2]())
    expect(result.current[0]).toBe('result')
  })

  it('should return error', async () => {
    const fetch = vi.fn().mockRejectedValue('error')
    const { result } = renderHook(() => useFetch(fetch))
    await act(() => result.current[2]())
    expect(result.current[1].error).toBe('error')
  })
})
