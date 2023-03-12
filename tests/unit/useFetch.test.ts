import { act, renderHook } from '@testing-library/react'
import { useFetch } from '../../src/useFetch'
import { flushPromises, mockPromiseChain } from '../mock'

describe('useFetch', () => {
  it('should use default value', () => {
    const fetchFn = mockPromiseChain()
    const { result } = renderHook(() => useFetch(fetchFn, 'default'))
    expect(result.current[0]).toBe('default')
  })

  it('should be loading by default', () => {
    const fetchFn = mockPromiseChain()
    const { result } = renderHook(() => useFetch(fetchFn, ''))
    expect(result.current[1].loading).toBe(true)
  })

  it('should not have error by default', () => {
    const fetchFn = mockPromiseChain()
    const { result } = renderHook(() => useFetch(fetchFn, ''))
    expect(result.current[1].error).toBeUndefined()
  })

  it('should fetch data', async () => {
    const fetchFn = jest.fn().mockResolvedValue('result')
    renderHook(() => useFetch(fetchFn, 'default'))
    await flushPromises()
    expect(fetchFn).toHaveBeenCalled()
  })

  it('should not fetch data if auto fetch is disabled', () => {
    const fetchFn = jest.fn().mockResolvedValue('result')
    renderHook(() => useFetch(fetchFn, 'default', false))
    expect(fetchFn).not.toHaveBeenCalled()
  })

  it('should use value returned by fetch', async () => {
    const fetchFn = jest.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useFetch(fetchFn, 'default'))
    await flushPromises()
    expect(result.current[0]).toBe('result')
  })

  it('should not be loading after fetch', async () => {
    const fetchFn = jest.fn().mockResolvedValue('')
    const { result } = renderHook(() => useFetch(fetchFn, ''))
    await flushPromises()
    expect(result.current[1].loading).toBe(false)
  })

  it('should not have error if fetch succeeds', async () => {
    const fetchFn = jest.fn().mockResolvedValue('')
    const { result } = renderHook(() => useFetch(fetchFn, ''))
    await flushPromises()
    expect(result.current[1].error).toBeUndefined()
  })

  it('should have error if fetch fails', async () => {
    const fetchFn = jest.fn().mockRejectedValue(new Error('500'))
    const { result } = renderHook(() => useFetch(fetchFn, ''))
    await flushPromises()
    expect(result.current[1].error).toEqual(new Error('500'))
  })

  it('should be loading when refreshing', async () => {
    const fetchFn = jest.fn().mockResolvedValue('')
    const { result } = renderHook(() => useFetch(fetchFn, ''))
    await flushPromises()
    act(() => {
      result.current[2]()
    })
    expect(result.current[1].loading).toBe(true)
    await flushPromises()
  })

  it('should fetch data when replaying action', async () => {
    const fetchFn = jest.fn().mockResolvedValue('')
    const { result } = renderHook(() => useFetch(fetchFn, ''))
    await flushPromises()
    act(() => {
      result.current[2]()
    })
    expect(fetchFn).toHaveBeenCalled()
    await flushPromises()
  })

  it('should replace data', async () => {
    const fetchFn = jest.fn().mockResolvedValue('')
    const { result } = renderHook(() => useFetch(fetchFn, ''))
    await flushPromises()
    act(() => {
      result.current[3]('toto')
    })
    expect(result.current[0]).toBe('toto')
  })
})
