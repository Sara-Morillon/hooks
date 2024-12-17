import { act, renderHook } from '@testing-library/react-hooks'
import { useFetch } from '../../src/useFetch'
import { mockMatchMedia, mockPromiseChain } from '../mock'

describe('useFetch', () => {
  it('should use default value', () => {
    const fetchFn = mockPromiseChain()
    mockMatchMedia(true)
    const { result } = renderHook(() => useFetch(fetchFn, 'default'))
    expect(result.current[0]).toBe('default')
  })

  it('should be loading by default', () => {
    const fetchFn = mockPromiseChain()
    mockMatchMedia(true)
    const { result } = renderHook(() => useFetch(fetchFn, ''))
    expect(result.current[1].loading).toBe(true)
  })

  it('should not have error by default', () => {
    const fetchFn = mockPromiseChain()
    mockMatchMedia(true)
    const { result } = renderHook(() => useFetch(fetchFn, ''))
    expect(result.current[1].error).toBeUndefined()
  })

  it('should use value returned by fetch', async () => {
    const fetchFn = jest.fn().mockResolvedValue('result')
    mockMatchMedia(true)
    const { result, waitForNextUpdate } = renderHook(() => useFetch(fetchFn, 'default'))
    await waitForNextUpdate()
    expect(result.current[0]).toBe('result')
  })

  it('should not be loading after fetch', async () => {
    const fetchFn = jest.fn().mockResolvedValue('')
    mockMatchMedia(true)
    const { result, waitForNextUpdate } = renderHook(() => useFetch(fetchFn, ''))
    await waitForNextUpdate()
    expect(result.current[1].loading).toBe(false)
  })

  it('should not have error if fetch succeeds', async () => {
    const fetchFn = jest.fn().mockResolvedValue('')
    mockMatchMedia(true)
    const { result, waitForNextUpdate } = renderHook(() => useFetch(fetchFn, ''))
    await waitForNextUpdate()
    expect(result.current[1].error).toBeUndefined()
  })

  it('should have error if fetch fails', async () => {
    const fetchFn = jest.fn().mockRejectedValue(new Error('500'))
    mockMatchMedia(true)
    const { result, waitForNextUpdate } = renderHook(() => useFetch(fetchFn, ''))
    await waitForNextUpdate()
    expect(result.current[1].error).toEqual(new Error('500'))
  })

  it('should be loading when refreshing', async () => {
    const fetchFn = jest.fn().mockResolvedValue('')
    mockMatchMedia(true)
    const { result, waitForNextUpdate } = renderHook(() => useFetch(fetchFn, ''))
    await waitForNextUpdate()
    act(() => {
      result.current[2]()
    })
    expect(result.current[1].loading).toBe(true)
    await waitForNextUpdate()
  })

  it('should fetch data when refreshing', async () => {
    const fetchFn = jest.fn().mockResolvedValue('')
    mockMatchMedia(true)
    const { result, waitForNextUpdate } = renderHook(() => useFetch(fetchFn, ''))
    await waitForNextUpdate()
    act(() => {
      result.current[2]()
    })
    expect(fetchFn).toHaveBeenCalled()
    await waitForNextUpdate()
  })
})
