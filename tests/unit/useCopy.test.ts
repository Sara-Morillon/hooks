import { act, renderHook } from '@testing-library/react'
import { useCopy } from '../../src/useCopy'
import { flushPromises } from '../mock'

describe('useCopy', () => {
  beforeAll(() => {
    Object.defineProperty(navigator, 'permissions', { value: { query: jest.fn() }, writable: false })
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: jest.fn() }, writable: false })
  })

  beforeEach(() => {
    jest.spyOn(navigator.permissions, 'query').mockResolvedValue({ state: 'granted' } as unknown as PermissionStatus)
    jest.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)
  })

  it('should be authorized if copy permissions state is granted', async () => {
    const { result } = renderHook(() => useCopy())
    await flushPromises()
    expect(result.current[0]).toBe(true)
  })

  it('should be authorized if copy permissions state is prompt', async () => {
    jest.spyOn(navigator.permissions, 'query').mockResolvedValue({ state: 'prompt' } as unknown as PermissionStatus)
    const { result } = renderHook(() => useCopy())
    await flushPromises()
    expect(result.current[0]).toBe(true)
  })

  it('should not be authorized if copy permissions state is denied', async () => {
    jest.spyOn(navigator.permissions, 'query').mockResolvedValue({ state: 'denied' } as unknown as PermissionStatus)
    const { result } = renderHook(() => useCopy())
    await flushPromises()
    expect(result.current[0]).toBe(false)
  })

  it('should be loading when copying', async () => {
    const { result } = renderHook(() => useCopy())
    await flushPromises()
    act(() => result.current[2]('data'))
    expect(result.current[1].loading).toBe(true)
    await flushPromises()
  })

  it('should execute copy', async () => {
    const { result } = renderHook(() => useCopy())
    await flushPromises()
    await act(async () => result.current[2]('data'))
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('data')
  })

  it('should have error is copying fails', async () => {
    jest.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error())
    const { result } = renderHook(() => useCopy())
    await flushPromises()
    await act(async () => result.current[2]('data'))
    expect(result.current[1].error).toEqual(new Error())
  })
})
