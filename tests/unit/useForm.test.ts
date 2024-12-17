import { act, renderHook } from '@testing-library/react-hooks'
import { FormEvent } from 'react'
import { useForm } from '../../src/useForm'

describe('useForm', () => {
  it('should set initial values', () => {
    const { result } = renderHook(() => useForm(jest.fn(), { prop: 'value' }))
    expect(result.current.values).toEqual({ prop: 'value' })
  })

  it('should prevent default event handler when submitting form', () => {
    const { result } = renderHook(() => useForm(jest.fn(), { prop: 'value' }))
    const preventDefault = jest.fn()
    act(() => result.current.onSubmit({ preventDefault } as unknown as FormEvent))
    expect(preventDefault).toHaveBeenCalled()
  })

  it('should save values when submitting form and values are defined', () => {
    const onSave = jest.fn()
    const { result } = renderHook(() => useForm(onSave, { prop: 'value' }))
    act(() => result.current.onSubmit({ preventDefault: jest.fn() } as unknown as FormEvent))
    expect(onSave).toHaveBeenCalledWith({ prop: 'value' })
  })

  it('should reset form', () => {
    const { result } = renderHook(() => useForm(jest.fn(), { prop: 'value' }))
    act(() => result.current.onChange('prop', 'value2'))
    act(() => result.current.reset())
    expect(result.current.values).toEqual({ prop: 'value' })
  })
})
