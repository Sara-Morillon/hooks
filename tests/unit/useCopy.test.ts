import { act, renderHook } from '@testing-library/react'
import { useCopy } from '../../src/useCopy.js'
import { flushPromises } from '../mock.js'

describe('useCopy', () => {
  beforeAll(() => {
    Object.defineProperty(navigator, 'permissions', { value: { query: vi.fn() }, writable: false })
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn() }, writable: false })
  })

  beforeEach(() => {
    vi.spyOn(navigator.permissions, 'query').mockResolvedValue({ state: 'granted' } as unknown as PermissionStatus)
    vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)
  })

  it('should be authorized for Firefox user agent', async () => {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('Firefox')
    const { result } = renderHook(() => useCopy())
    await flushPromises()
    expect(result.current.authorized).toBe(true)
  })

  it('should be authorized if user agent is not Firefox and copy permissions state is granted', async () => {
    const { result } = renderHook(() => useCopy())
    await flushPromises()
    expect(result.current.authorized).toBe(true)
  })

  it('should be authorized if user agent is not Firefox and copy permissions state is prompt', async () => {
    vi.spyOn(navigator.permissions, 'query').mockResolvedValue({ state: 'prompt' } as unknown as PermissionStatus)
    const { result } = renderHook(() => useCopy())
    await flushPromises()
    expect(result.current.authorized).toBe(true)
  })

  it('should not be authorized if user agent is not Firefox and copy permissions state is denied', async () => {
    vi.spyOn(navigator.permissions, 'query').mockResolvedValue({ state: 'denied' } as unknown as PermissionStatus)
    const { result } = renderHook(() => useCopy())
    await flushPromises()
    expect(result.current.authorized).toBe(false)
  })

  it('should be loading when copying', async () => {
    const { result } = renderHook(() => useCopy())
    await flushPromises()
    act(() => result.current.copy('data'))
    expect(result.current.loading).toBe(true)
    await flushPromises()
  })

  it('should execute copy', async () => {
    const { result } = renderHook(() => useCopy())
    await flushPromises()
    act(() => result.current.copy('data'))
    await flushPromises()
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('data')
  })

  it('should have error is copying fails', async () => {
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error())
    const { result } = renderHook(() => useCopy())
    await flushPromises()
    act(() => result.current.copy('data'))
    await flushPromises()
    expect(result.current.error).toEqual(new Error())
  })
})
