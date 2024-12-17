import { act, renderHook } from '@testing-library/react-hooks'
import {
  MultiSelectState,
  State,
  useBooleanField,
  useMultiSelectField,
  useNumberField,
  useSelectField,
  useTextField,
} from '../../src/useFields'

describe('useTextField', () => {
  it('should use empty string as default value', () => {
    const { result } = renderHook(() => useTextField())
    expect(result.current[0]).toBe('')
  })

  it('should use input as default value', () => {
    const { result } = renderHook(() => useTextField('input'))
    expect(result.current[0]).toBe('input')
  })

  it('should update value when input changes', () => {
    const { result, rerender } = renderHook((props?: string) => useTextField(props), { initialProps: undefined })
    expect(result.current[0]).toBe('')
    rerender('changed value')
    expect(result.current[0]).toBe('changed value')
  })

  it('should change value', () => {
    const { result } = renderHook(() => useTextField())
    expect(result.current[0]).toBe('')
    act(() => {
      result.current[1]('set value')
    })
    expect(result.current[0]).toBe('set value')
  })
})

describe('useBooleanField', () => {
  it('should use empty string as default value', () => {
    const { result } = renderHook(() => useBooleanField())
    expect(result.current[0]).toBe(false)
  })

  it('should use input as default value', () => {
    const { result } = renderHook(() => useBooleanField(true))
    expect(result.current[0]).toBe(true)
  })

  it('should update value when input changes', () => {
    const { result, rerender } = renderHook((props?: boolean) => useBooleanField(props), { initialProps: undefined })
    expect(result.current[0]).toBe(false)
    rerender(true)
    expect(result.current[0]).toBe(true)
  })

  it('should change value', () => {
    const { result } = renderHook(() => useBooleanField())
    expect(result.current[0]).toBe(false)
    act(() => {
      result.current[1](true)
    })
    expect(result.current[0]).toBe(true)
  })
})

describe('useNumberField', () => {
  it('should use empty string as default value', () => {
    const { result } = renderHook(() => useNumberField())
    expect(result.current[0]).toBe(0)
  })

  it('should use input as default value', () => {
    const { result } = renderHook(() => useNumberField(1))
    expect(result.current[0]).toBe(1)
  })

  it('should update value when input changes', () => {
    const { result, rerender } = renderHook((props?: number) => useNumberField(props), { initialProps: undefined })
    expect(result.current[0]).toBe(0)
    rerender(2)
    expect(result.current[0]).toBe(2)
  })

  it('should change value', () => {
    const { result } = renderHook(() => useNumberField())
    expect(result.current[0]).toBe(0)
    act(() => {
      result.current[1](3)
    })
    expect(result.current[0]).toBe(3)
  })
})

describe('useSelectField', () => {
  type T = { prop?: string }

  it('should use input as default value', () => {
    const initialProps: T = { prop: 'value' }
    const { result } = renderHook<T, State<T>>((props) => useSelectField(props), { initialProps })
    expect(result.current[0]).toEqual({ prop: 'value' })
  })

  it('should update value when input changes', () => {
    const initialProps: T = {}
    const { result, rerender } = renderHook<T, State<T>>((props) => useSelectField(props), { initialProps })
    expect(result.current[0]).toEqual({})
    rerender({ prop: 'value' })
    expect(result.current[0]).toEqual({ prop: 'value' })
  })

  it('should change value', () => {
    const initialProps: T = {}
    const { result } = renderHook<T, State<T>>((props) => useSelectField(props), { initialProps })
    expect(result.current[0]).toEqual({})
    act(() => {
      result.current[1]({ prop: 'value' })
    })
    expect(result.current[0]).toEqual({ prop: 'value' })
  })
})

describe('useMultiSelectField', () => {
  type T = { prop?: string }

  it('should use empty array as default value', () => {
    const initialProps: T[] | undefined = undefined
    const { result } = renderHook<T[], MultiSelectState<T>>((props) => useMultiSelectField(props), { initialProps })
    expect(result.current[0]).toEqual([])
  })

  it('should use input as default value', () => {
    const initialProps: T[] = [{ prop: 'value' }]
    const { result } = renderHook<T[], MultiSelectState<T>>((props) => useMultiSelectField(props), { initialProps })
    expect(result.current[0]).toEqual([{ prop: 'value' }])
  })

  it('should update value when input changes', () => {
    const initialProps: T[] = []
    const { result, rerender } = renderHook<T[], MultiSelectState<T>>((props) => useMultiSelectField(props), {
      initialProps,
    })
    expect(result.current[0]).toEqual([])
    rerender([{ prop: 'value' }])
    expect(result.current[0]).toEqual([{ prop: 'value' }])
  })

  it('should set values', () => {
    const initialProps: T[] = []
    const { result } = renderHook<T[], MultiSelectState<T>>((props) => useMultiSelectField(props), { initialProps })
    expect(result.current[0]).toEqual([])
    act(() => {
      result.current[1]([{ prop: 'value' }])
    })
    expect(result.current[0]).toEqual([{ prop: 'value' }])
  })

  it('should add value', () => {
    const initialProps: T[] = []
    const { result } = renderHook<T[], MultiSelectState<T>>((props) => useMultiSelectField(props), { initialProps })
    expect(result.current[0]).toEqual([])
    act(() => {
      result.current[2]({ prop: 'value' })
    })
    expect(result.current[0]).toEqual([{ prop: 'value' }])
  })

  it('should remove value', () => {
    const initialProps: T[] = [{ prop: 'value' }]
    const { result } = renderHook<T[], MultiSelectState<T>>((props) => useMultiSelectField(props), { initialProps })
    expect(result.current[0]).toEqual([{ prop: 'value' }])
    act(() => {
      result.current[3](initialProps[0])
    })
    expect(result.current[0]).toEqual([])
  })

  it('should toggle value', () => {
    const initialProps: T[] = [{ prop: 'value' }]
    const { result } = renderHook<T[], MultiSelectState<T>>((props) => useMultiSelectField(props), { initialProps })
    expect(result.current[0]).toEqual([{ prop: 'value' }])
    act(() => {
      result.current[4](initialProps[0])
    })
    expect(result.current[0]).toEqual([])
    act(() => {
      result.current[4]({ prop: 'value' })
    })
    expect(result.current[0]).toEqual([{ prop: 'value' }])
  })
})
