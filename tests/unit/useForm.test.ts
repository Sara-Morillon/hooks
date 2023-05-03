import { act, renderHook } from '@testing-library/react'
import { FormEvent } from 'react'
import { useForm } from '../../src'
import { flushPromises } from '../mock'

function mockFormEvent() {
  return { preventDefault: jest.fn(), stopPropagation: jest.fn() } as unknown as FormEvent
}

describe('useForm', () => {
  it('should set initial values', () => {
    const { result } = renderHook(() => useForm(jest.fn(), { prop: 'value' }))
    expect(result.current.values).toEqual({ prop: 'value' })
  })

  it('should prevent default event handler when submitting form', async () => {
    const { result } = renderHook(() => useForm(jest.fn(), { prop: 'value' }))
    const event = mockFormEvent()
    act(() => result.current.submit(event))
    await flushPromises()
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should stop event propagation when submitting form', async () => {
    const { result } = renderHook(() => useForm(jest.fn(), { prop: 'value' }))
    const event = mockFormEvent()
    act(() => result.current.submit(event))
    await flushPromises()
    expect(event.stopPropagation).toHaveBeenCalled()
  })

  it('should save values when submitting form and values are defined', async () => {
    const save = jest.fn()
    const { result } = renderHook(() => useForm(save, { prop: 'value' }))
    act(() => result.current.submit())
    await flushPromises()
    expect(save).toHaveBeenCalledWith({ prop: 'value' })
  })

  it('should reset form', () => {
    const { result } = renderHook(() => useForm(jest.fn(), { prop: 'value' }))
    act(() => result.current.onChange('prop', 'value2'))
    act(() => result.current.reset())
    expect(result.current.values).toEqual({ prop: 'value' })
  })

  it('should be loading when submitting form', async () => {
    const { result } = renderHook(() => useForm(jest.fn().mockResolvedValue(undefined), { prop: 'value' }))
    act(() => result.current.submit())
    expect(result.current.loading).toBe(true)
    await flushPromises()
  })

  it('should set error when submit fails', async () => {
    const { result } = renderHook(() => useForm(jest.fn().mockRejectedValue(new Error('500')), { prop: 'value' }))
    act(() => result.current.submit())
    await flushPromises()
    expect(result.current.error).toEqual(new Error('500'))
  })
})
