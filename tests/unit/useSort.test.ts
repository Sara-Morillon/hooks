import { act, renderHook } from '@testing-library/react'
import { type ISortFunctions, useSort, useSortState, useSortedRows } from '../../src/useSort.js'
import { type IData, mockTableData } from '../mock.js'

describe('useSortState', () => {
  it('should return empty sort by default', () => {
    const { result } = renderHook(() => useSortState<IData>())
    expect(result.current.state).toEqual([])
  })

  it('should return initial sort', () => {
    const { result } = renderHook(() => useSortState<IData>([{ field: 'age', dir: 'desc' }]))
    expect(result.current.state).toEqual([{ field: 'age', dir: 'desc' }])
  })

  it('should change sort', () => {
    const { result } = renderHook(() => useSortState<IData>())
    act(() => result.current.sort('name', 'asc'))
    expect(result.current.state).toEqual([{ field: 'name', dir: 'asc' }])
  })

  it('should override existing sort', () => {
    const { result } = renderHook(() => useSortState<IData>())
    act(() => result.current.sort('name', 'asc'))
    act(() => result.current.sort('age', 'asc'))
    act(() => result.current.sort('name', 'desc'))
    expect(result.current.state).toEqual([
      { field: 'age', dir: 'asc' },
      { field: 'name', dir: 'desc' },
    ])
  })

  it('should clear existing sort', () => {
    const { result } = renderHook(() => useSortState<IData>())
    act(() => result.current.sort('name', 'asc'))
    act(() => result.current.sort('name'))
    expect(result.current.state).toEqual([])
  })
})

describe('useSortedRows', () => {
  it('should return non sorted rows if sort is empty', () => {
    const { result } = renderHook(() => useSortedRows(mockTableData()))
    expect(result.current).toEqual(mockTableData())
  })

  it('should return rows sorted asc', () => {
    const { result } = renderHook(() => useSortedRows(mockTableData(), [{ field: 'name', dir: 'asc' }]))
    expect(result.current).toMatchSnapshot()
  })

  it('should return rows sorted desc', () => {
    const { result } = renderHook(() => useSortedRows(mockTableData(), [{ field: 'name', dir: 'desc' }]))
    expect(result.current).toMatchSnapshot()
  })

  it('should sort by multiple fields', () => {
    const { result } = renderHook(() =>
      useSortedRows(mockTableData(), [
        { field: 'age', dir: 'asc' },
        { field: 'name', dir: 'desc' },
      ]),
    )
    expect(result.current).toMatchSnapshot()
  })

  it('should sort rows with custom sort function', () => {
    const sortFunctions: ISortFunctions<IData> = {
      address: (rowA, rowB) => rowA.address.city.localeCompare(rowB.address.city),
    }
    const { result } = renderHook(() => useSortedRows(mockTableData(), [], sortFunctions))
    expect(result.current).toMatchSnapshot()
  })
})

describe('useSort', () => {
  it('should return empty sort by default', () => {
    const { result } = renderHook(() => useSort(mockTableData()))
    expect(result.current.state).toEqual([])
  })

  it('should return initial sort', () => {
    const { result } = renderHook(() => useSort(mockTableData(), [{ field: 'age', dir: 'desc' }]))
    expect(result.current.state).toEqual([{ field: 'age', dir: 'desc' }])
  })

  it('should change sort', () => {
    const { result } = renderHook(() => useSort(mockTableData()))
    act(() => result.current.sort('name', 'asc'))
    expect(result.current.state).toEqual([{ field: 'name', dir: 'asc' }])
  })

  it('should override existing sort', () => {
    const { result } = renderHook(() => useSort(mockTableData()))
    act(() => result.current.sort('name', 'asc'))
    act(() => result.current.sort('age', 'asc'))
    act(() => result.current.sort('name', 'desc'))
    expect(result.current.state).toEqual([
      { field: 'age', dir: 'asc' },
      { field: 'name', dir: 'desc' },
    ])
  })

  it('should clear existing sort', () => {
    const { result } = renderHook(() => useSort(mockTableData()))
    act(() => result.current.sort('name', 'asc'))
    act(() => result.current.sort('name'))
    expect(result.current.state).toEqual([])
  })

  it('should return rows sorted asc', () => {
    const { result } = renderHook(() => useSort(mockTableData(), [{ field: 'name', dir: 'asc' }]))
    expect(result.current.rows).toMatchSnapshot()
  })

  it('should return rows sorted desc', () => {
    const { result } = renderHook(() => useSort(mockTableData(), [{ field: 'name', dir: 'desc' }]))
    expect(result.current.rows).toMatchSnapshot()
  })

  it('should sort by multiple fields', () => {
    const { result } = renderHook(() =>
      useSort(mockTableData(), [
        { field: 'age', dir: 'asc' },
        { field: 'name', dir: 'desc' },
      ]),
    )
    expect(result.current.rows).toMatchSnapshot()
  })

  it('should sort rows with custom sort function', () => {
    const sortFunctions: ISortFunctions<IData> = {
      address: (rowA, rowB) => rowA.address.city.localeCompare(rowB.address.city),
    }
    const { result } = renderHook(() => useSort(mockTableData(), [], sortFunctions))
    expect(result.current).toMatchSnapshot()
  })
})
