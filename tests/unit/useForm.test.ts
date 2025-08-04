import { act, renderHook } from '@testing-library/react'
import type { FormEvent } from 'react'
import { useForm } from '../../src/useForm.js'
import { flushPromises } from '../mock.js'

function mockFormEvent() {
  return { preventDefault: vi.fn(), stopPropagation: vi.fn() } as unknown as FormEvent
}

describe('useForm', () => {
  it('should set initial values', () => {
    const { result } = renderHook(() => useForm(vi.fn(), { prop: 'value' }))
    expect(result.current.values).toEqual({ prop: 'value' })
  })

  it('should prevent default event handler when submitting form', async () => {
    const { result } = renderHook(() => useForm(vi.fn(), { prop: 'value' }))
    const event = mockFormEvent()
    act(() => result.current.submit(event))
    await flushPromises()
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should stop event propagation when submitting form', async () => {
    const { result } = renderHook(() => useForm(vi.fn(), { prop: 'value' }))
    const event = mockFormEvent()
    act(() => result.current.submit(event))
    await flushPromises()
    expect(event.stopPropagation).toHaveBeenCalled()
  })

  it('should save values when submitting form and values are defined', async () => {
    const save = vi.fn()
    const { result } = renderHook(() => useForm(save, { prop: 'value' }))
    act(() => result.current.submit())
    await flushPromises()
    expect(save).toHaveBeenCalledWith({ prop: 'value' })
  })

  it('should reset form', () => {
    const { result } = renderHook(() => useForm(vi.fn(), { prop: 'value' }))
    act(() => result.current.onChange('prop', 'value2'))
    act(() => result.current.reset())
    expect(result.current.values).toEqual({ prop: 'value' })
  })

  it('should set error when submit fails', async () => {
    const { result } = renderHook(() =>
      useForm(
        vi.fn().mockImplementation(() => {
          throw new Error('500')
        }),
        { prop: 'value' },
      ),
    )
    act(() => result.current.submit())
    await flushPromises()
    expect(result.current.error).toEqual(new Error('500'))
  })
})
