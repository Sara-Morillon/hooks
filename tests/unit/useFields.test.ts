import { act, renderHook } from '@testing-library/react-hooks'
import { State, useBoolean, useMultiSelect, useNumber, useSelect, useText } from '../../src/useFields'

describe('useText', () => {
  it('should use empty string as default value', () => {
    const { result } = renderHook(() => useText())
    expect(result.current[0]).toBe('')
  })

  it('should use input as default value', () => {
    const { result } = renderHook(() => useText('input'))
    expect(result.current[0]).toBe('input')
  })

  it('should update value when input changes', () => {
    const { result, rerender } = renderHook((props?: string) => useText(props), { initialProps: undefined })
    expect(result.current[0]).toBe('')
    rerender('changed value')
    expect(result.current[0]).toBe('changed value')
  })

  it('should change value', () => {
    const { result } = renderHook(() => useText())
    expect(result.current[0]).toBe('')
    act(() => {
      result.current[1]('set value')
    })
    expect(result.current[0]).toBe('set value')
  })
})

describe('useBoolean', () => {
  it('should use empty string as default value', () => {
    const { result } = renderHook(() => useBoolean())
    expect(result.current[0]).toBe(false)
  })

  it('should use input as default value', () => {
    const { result } = renderHook(() => useBoolean(true))
    expect(result.current[0]).toBe(true)
  })

  it('should update value when input changes', () => {
    const { result, rerender } = renderHook((props?: boolean) => useBoolean(props), { initialProps: undefined })
    expect(result.current[0]).toBe(false)
    rerender(true)
    expect(result.current[0]).toBe(true)
  })

  it('should change value', () => {
    const { result } = renderHook(() => useBoolean())
    expect(result.current[0]).toBe(false)
    act(() => {
      result.current[1](true)
    })
    expect(result.current[0]).toBe(true)
  })
})

describe('useNumber', () => {
  it('should use empty string as default value', () => {
    const { result } = renderHook(() => useNumber())
    expect(result.current[0]).toBe(0)
  })

  it('should use input as default value', () => {
    const { result } = renderHook(() => useNumber(1))
    expect(result.current[0]).toBe(1)
  })

  it('should update value when input changes', () => {
    const { result, rerender } = renderHook((props?: number) => useNumber(props), { initialProps: undefined })
    expect(result.current[0]).toBe(0)
    rerender(2)
    expect(result.current[0]).toBe(2)
  })

  it('should change value', () => {
    const { result } = renderHook(() => useNumber())
    expect(result.current[0]).toBe(0)
    act(() => {
      result.current[1](3)
    })
    expect(result.current[0]).toBe(3)
  })
})

describe('useSelect', () => {
  type T = { prop?: string }

  it('should use empty string as default value', () => {
    const initialProps: T = {}
    const { result } = renderHook<T, State<T>>((props) => useSelect(props), { initialProps })
    expect(result.current[0]).toEqual({})
  })

  it('should use input as default value', () => {
    const initialProps: T = { prop: 'value' }
    const { result } = renderHook<T, State<T>>((props) => useSelect(props), { initialProps })
    expect(result.current[0]).toEqual({ prop: 'value' })
  })

  it('should update value when input changes', () => {
    const initialProps: T = {}
    const { result, rerender } = renderHook<T, State<T>>((props) => useSelect(props), { initialProps })
    expect(result.current[0]).toEqual({})
    rerender({ prop: 'value' })
    expect(result.current[0]).toEqual({ prop: 'value' })
  })

  it('should change value', () => {
    const initialProps: T = {}
    const { result } = renderHook<T, State<T>>((props) => useSelect(props), { initialProps })
    expect(result.current[0]).toEqual({})
    act(() => {
      result.current[1]({ prop: 'value' })
    })
    expect(result.current[0]).toEqual({ prop: 'value' })
  })
})

describe('useMultiSelect', () => {
  type T = { prop?: string }[]

  it('should use empty string as default value', () => {
    const initialProps: T = []
    const { result } = renderHook<T, State<T>>((props) => useMultiSelect(props), { initialProps })
    expect(result.current[0]).toEqual([])
  })

  it('should use input as default value', () => {
    const initialProps: T = [{ prop: 'value' }]
    const { result } = renderHook<T, State<T>>((props) => useMultiSelect(props), { initialProps })
    expect(result.current[0]).toEqual([{ prop: 'value' }])
  })

  it('should update value when input changes', () => {
    const initialProps: T = []
    const { result, rerender } = renderHook<T, State<T>>((props) => useMultiSelect(props), { initialProps })
    expect(result.current[0]).toEqual([])
    rerender([{ prop: 'value' }])
    expect(result.current[0]).toEqual([{ prop: 'value' }])
  })

  it('should change value', () => {
    const initialProps: T = []
    const { result } = renderHook<T, State<T>>((props) => useMultiSelect(props), { initialProps })
    expect(result.current[0]).toEqual([])
    act(() => {
      result.current[1]([{ prop: 'value' }])
    })
    expect(result.current[0]).toEqual([{ prop: 'value' }])
  })
})
