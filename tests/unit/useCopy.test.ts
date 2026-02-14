import { act, renderHook } from '@testing-library/react'
import { useCopy } from '../../src/useCopy.js'
import { flushPromises } from '../mock.js'

describe('useCopy', () => {
  beforeAll(() => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn(), write: vi.fn() }, writable: false })
  })

  beforeEach(() => {
    vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)
    vi.spyOn(navigator.clipboard, 'write').mockResolvedValue(undefined)
  })

  it('should be loading when copying', async () => {
    const { result } = renderHook(() => useCopy())
    await flushPromises()
    act(() => {
      result.current[1]('data')
    })
    expect(result.current[0].loading).toBe(true)
    await flushPromises()
  })

  it('should execute copy', async () => {
    const { result } = renderHook(() => useCopy())
    await flushPromises()
    await act(() => result.current[1]('data'))
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('data')
  })

  it('should execute copy withclipboard items ', async () => {
    const { result } = renderHook(() => useCopy())
    await flushPromises()
    await act(() => result.current[1](['data'] as never))
    expect(navigator.clipboard.write).toHaveBeenCalledWith(['data'])
  })

  it('should have error is copying fails', async () => {
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error())
    const { result } = renderHook(() => useCopy())
    await flushPromises()
    await act(() => result.current[1]('data'))
    expect(result.current[0].error).toEqual(new Error())
  })
})
