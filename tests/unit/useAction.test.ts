import { act, renderHook } from '@testing-library/react'
import { useAction } from '../../src/useAction.js'
import { flushPromises } from '../mock.js'

describe('useAction', () => {
  it('should not be loading by default', () => {
    const action = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAction(action))
    expect(result.current[1].loading).toBe(false)
  })

  it('should not have error by default', () => {
    const action = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAction(action))
    expect(result.current[1].error).toBeUndefined()
  })

  it('should run callback when executing action', async () => {
    const action = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAction(action))
    await act(() => result.current[2]())
    expect(action).toHaveBeenCalled()
  })

  it('should run callback with params when executing action', async () => {
    const action = vi.fn<(a: string) => Promise<string>>().mockResolvedValue('result')
    const { result } = renderHook(() => useAction(action))
    await act(() => result.current[2]('a'))
    expect(action).toHaveBeenCalledWith('a')
  })

  // Waiting for this issue to be fixed: https://github.com/testing-library/react-hooks-testing-library/issues/847
  it.skip('should not run callback when executing action after unmount', async () => {
    const action = vi.fn().mockResolvedValue('result')
    const { result, unmount } = renderHook(() => useAction(action))
    unmount()
    await act(() => result.current[2]())
    expect(action).not.toHaveBeenCalled()
  })

  it('should be loading when executing action', async () => {
    const action = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAction(action))
    act(() => void result.current[2]())
    expect(result.current[1].loading).toBe(true)
    await flushPromises()
  })

  it('should return action result', async () => {
    const action = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAction(action))
    await act(() => result.current[2]())
    expect(result.current[0]).toBe('result')
  })

  it('should return action error', async () => {
    const action = vi.fn().mockRejectedValue('error')
    const { result } = renderHook(() => useAction(action))
    await act(() => result.current[2]())
    expect(result.current[1].error).toBe('error')
  })
})
