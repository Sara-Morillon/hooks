import { act, renderHook } from '@testing-library/react'
import { usePaginatedRows, usePaginationState } from '../../src/usePaginate.js'
import { mockTableData } from '../mock.js'

describe('usePaginationState', () => {
  it('should return default index and limit', () => {
    const { result } = renderHook(() => usePaginationState())
    expect(result.current.state.index).toBe(1)
    expect(result.current.state.limit).toBe(10)
  })

  it('should return initial index and limit', () => {
    const { result } = renderHook(() => usePaginationState({ index: 2, limit: 5 }))
    expect(result.current.state.index).toBe(2)
    expect(result.current.state.limit).toBe(5)
  })

  it('should change index', () => {
    const { result } = renderHook(() => usePaginationState())
    act(() => result.current.goTo(2))
    expect(result.current.state.index).toBe(2)
  })

  it('should change limit', () => {
    const { result } = renderHook(() => usePaginationState())
    act(() => result.current.setLimit(5))
    expect(result.current.state.limit).toBe(5)
  })
})

describe('usePaginatedRows', () => {
  it('should return all rows if pagination is empty', () => {
    const { result } = renderHook(() => usePaginatedRows(mockTableData()))
    expect(result.current).toEqual(mockTableData())
  })

  it('should return subset of rows', () => {
    const { result } = renderHook(() => usePaginatedRows(mockTableData(), { index: 2, limit: 7 }))
    expect(result.current).toEqual([
      { name: 'Deandre Vu', age: 32 },
      { name: 'Kimora Higgins', age: 38 },
      { name: 'Sterling Pugh', age: 30 },
      { name: 'Landry Pineda', age: 31 },
      { name: 'Gerardo Pearson', age: 39 },
      { name: 'Kiara Nava', age: 34 },
      { name: 'Stefan Hart', age: 35 },
    ])
  })
})
