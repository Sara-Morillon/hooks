import { act, renderHook } from '@testing-library/react-hooks'
import { FormEvent } from 'react'
import { useForm } from '../../src/useForm'

type Dummy = { prop: string }
const initialValues = { prop: 'value' }

describe('useForm', () => {
  it('should return undefined values if initial values are not provided', () => {
    const { result } = renderHook(() => useForm(jest.fn()))
    expect(result.current.values).toBeUndefined()
  })

  it('should set initial values', () => {
    const { result } = renderHook(() => useForm(jest.fn(), initialValues))
    expect(result.current.values).toEqual({ prop: 'value' })
  })

  it('should change values', () => {
    const { result } = renderHook(() => useForm(jest.fn(), initialValues))
    act(() => result.current.onChange('prop', 'value2'))
    expect(result.current.values).toEqual({ prop: 'value2' })
  })

  it('should prevent default event handler when submitting form', () => {
    const { result } = renderHook(() => useForm(jest.fn(), initialValues))
    const preventDefault = jest.fn()
    act(() => result.current.onSubmit({ preventDefault } as unknown as FormEvent))
    expect(preventDefault).toHaveBeenCalled()
  })

  it('should not save values when submitting form and values are not defined', () => {
    const onSave = jest.fn()
    const { result } = renderHook(() => useForm(onSave))
    act(() => result.current.onSubmit({ preventDefault: jest.fn() } as unknown as FormEvent))
    expect(onSave).not.toHaveBeenCalled()
  })

  it('should save values when submitting form and values are defined', () => {
    const onSave = jest.fn()
    const { result } = renderHook(() => useForm(onSave, initialValues))
    act(() => result.current.onSubmit({ preventDefault: jest.fn() } as unknown as FormEvent))
    expect(onSave).toHaveBeenCalledWith({ prop: 'value' })
  })

  it('should reset form', () => {
    const { result } = renderHook(() => useForm(jest.fn(), initialValues))
    act(() => result.current.onChange('prop', 'value2'))
    act(() => result.current.reset())
    expect(result.current.values).toEqual({ prop: 'value' })
  })
})
