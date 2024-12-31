import { act, renderHook } from '@testing-library/react'
import { type IInitialState, type ITableOptions, useTable, useTableRows, useTableState } from '../../src/useTable.js'
import { type IData, mockTableData } from '../mock.js'

describe('useTableState', () => {
  it('should return table state', () => {
    const { result } = renderHook(() => useTableState<IData>())
    act(() => result.current.filter('name', 'a'))
    act(() => result.current.sort('age', 'desc'))
    act(() => result.current.setLimit(5))
    act(() => result.current.goTo(2))
    expect(result.current.state).toEqual({
      filter: { name: 'a' },
      sort: [{ column: 'age', dir: 'desc' }],
      sortDir: { age: 'desc' },
      pagination: { index: 2, limit: 5 },
    })
  })
})

describe('useTableRows', () => {
  it('should return filtered, sorted and paginated rows', () => {
    const state: IInitialState<IData> = {
      filter: { name: 'a' },
      sort: [{ column: 'age', dir: 'desc' }],
      pagination: { index: 2, limit: 5 },
    }
    const options: ITableOptions<IData> = { filterFunctions: { name: (row, value) => row.name.includes(value) } }
    const { result } = renderHook(() => useTableRows(mockTableData(), state, options))
    expect(result.current.rows).toEqual([
      { name: 'Annabella Vargas', age: 37 },
      { name: 'Stefan Hart', age: 35 },
      { name: 'Jaxen Smith', age: 35 },
      { name: 'Kiara Nava', age: 34 },
      { name: 'Deandre Vu', age: 32 },
    ])
  })

  it('should return total filtered rows', () => {
    const state: IInitialState<IData> = {
      filter: { name: 'a' },
    }
    const options: ITableOptions<IData> = { filterFunctions: { name: (row, value) => row.name.includes(value) } }
    const { result } = renderHook(() => useTableRows(mockTableData(), state, options))
    expect(result.current.total).toBe(13)
  })
})

describe('useTable', () => {
  it('should return table state', () => {
    const { result } = renderHook(() => useTable(mockTableData()))
    act(() => result.current.filter('name', 'a'))
    act(() => result.current.sort('age', 'desc'))
    act(() => result.current.setLimit(5))
    act(() => result.current.goTo(2))
    expect(result.current.state).toEqual({
      filter: { name: 'a' },
      sort: [{ column: 'age', dir: 'desc' }],
      sortDir: { age: 'desc' },
      pagination: { index: 2, limit: 5 },
    })
  })

  it('should return filtered, sorted and paginated rows', () => {
    const options: ITableOptions<IData> = { filterFunctions: { name: (row, value) => row.name.includes(value) } }
    const { result } = renderHook(() => useTable(mockTableData(), options))
    act(() => result.current.filter('name', 'a'))
    act(() => result.current.sort('age', 'desc'))
    act(() => result.current.setLimit(5))
    act(() => result.current.goTo(2))
    expect(result.current.rows).toEqual([
      { name: 'Annabella Vargas', age: 37 },
      { name: 'Stefan Hart', age: 35 },
      { name: 'Jaxen Smith', age: 35 },
      { name: 'Kiara Nava', age: 34 },
      { name: 'Deandre Vu', age: 32 },
    ])
  })

  it('should return total filtered rows', () => {
    const options: ITableOptions<IData> = { filterFunctions: { name: (row, value) => row.name.includes(value) } }
    const { result } = renderHook(() => useTable(mockTableData(), options))
    act(() => result.current.filter('name', 'a'))
    expect(result.current.total).toBe(13)
  })
})
