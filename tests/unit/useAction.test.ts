import { act, renderHook } from '@testing-library/react'
import { useAction } from '../../src/useAction.js'
import { flushPromises } from '../mock.js'

describe('useAction', () => {
  it('should not be loading by default', () => {
    const action = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAction(action))
    expect(result.current[0].loading).toBe(false)
  })

  it('should not have error by default', () => {
    const action = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAction(action))
    expect(result.current[0].error).toBeUndefined()
  })

  it('should run callback when executing action', async () => {
    const action = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAction(action))
    await act(() => result.current[1]())
    expect(action).toHaveBeenCalled()
  })

  it('should run callback with params when executing action', async () => {
    const action = vi.fn<(a: string, signal: AbortSignal) => Promise<string>>().mockResolvedValue('result')
    const { result } = renderHook(() => useAction(action))
    await act(() => result.current[1]('a'))
    expect(action).toHaveBeenCalledWith('a', expect.any(AbortSignal))
  })

  it('should be loading when executing action', async () => {
    const action = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAction(action))
    act(() => void result.current[1]())
    expect(result.current[0].loading).toBe(true)
    await flushPromises()
  })

  it('should return action result', async () => {
    const action = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAction(action))
    const res = await act(() => result.current[1]())
    expect(res).toBe('result')
  })

  it('should return action error', async () => {
    const action = vi.fn().mockRejectedValue('error')
    const { result } = renderHook(() => useAction(action))
    await act(() => result.current[1]())
    expect(result.current[0].error).toBe('error')
  })
})
