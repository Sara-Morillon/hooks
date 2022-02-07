import { act, renderHook } from '@testing-library/react-hooks'
import { FormEvent } from 'react'
import { useForm } from '../../src/useForm'

function mockFormEvent() {
  return { preventDefault: jest.fn(), stopPropagation: jest.fn() } as unknown as FormEvent
}

describe('useForm', () => {
  it('should set initial values', () => {
    const { result } = renderHook(() => useForm(jest.fn(), { prop: 'value' }))
    expect(result.current.values).toEqual({ prop: 'value' })
  })

  it('should prevent default event handler when submitting form', () => {
    const { result } = renderHook(() => useForm(jest.fn(), { prop: 'value' }))
    const event = mockFormEvent()
    act(() => result.current.onSubmit(event))
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should stop event propagation when submitting form', () => {
    const { result } = renderHook(() => useForm(jest.fn(), { prop: 'value' }))
    const event = mockFormEvent()
    act(() => result.current.onSubmit(event))
    expect(event.stopPropagation).toHaveBeenCalled()
  })

  it('should save values when submitting form and values are defined', () => {
    const onSave = jest.fn()
    const { result } = renderHook(() => useForm(onSave, { prop: 'value' }))
    act(() => result.current.onSubmit(mockFormEvent()))
    expect(onSave).toHaveBeenCalledWith({ prop: 'value' })
  })

  it('should reset form', () => {
    const { result } = renderHook(() => useForm(jest.fn(), { prop: 'value' }))
    act(() => result.current.onChange('prop', 'value2'))
    act(() => result.current.reset())
    expect(result.current.values).toEqual({ prop: 'value' })
  })
})
