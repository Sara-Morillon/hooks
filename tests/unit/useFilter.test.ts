import { act, renderHook } from '@testing-library/react'
import { type IFilterFunctions, useFilter, useFilterState, useFilteredRows } from '../../src/useFilter.js'
import { type IData, mockTableData } from '../mock.js'

describe('useFilterState', () => {
  it('should return empty filters by default', () => {
    const { result } = renderHook(() => useFilterState<IData>())
    expect(result.current.state).toEqual({})
  })

  it('should return initial filters', () => {
    const { result } = renderHook(() => useFilterState<IData>({ name: 'Jaxen Smith' }))
    expect(result.current.state).toEqual({ name: 'Jaxen Smith' })
  })

  it('should change filter', () => {
    const { result } = renderHook(() => useFilterState<IData>())
    act(() => result.current.filter('name', 'Zola Ray'))
    expect(result.current.state).toEqual({ name: 'Zola Ray' })
  })

  it('should override existing filter', () => {
    const { result } = renderHook(() => useFilterState<IData>())
    act(() => result.current.filter('name', 'Zola Ray'))
    act(() => result.current.filter('name', 'Jaxen Smith'))
    expect(result.current.state).toEqual({ name: 'Jaxen Smith' })
  })
})

describe('useFilteredRows', () => {
  it('should return all rows if filter is empty', () => {
    const { result } = renderHook(() => useFilteredRows(mockTableData()))
    expect(result.current).toEqual(mockTableData())
  })

  it('should not filter rows if filter is an empty string', () => {
    const { result } = renderHook(() => useFilteredRows(mockTableData(), { name: '' }))
    expect(result.current).toEqual(mockTableData())
  })

  it('should not filter rows if filter is an empty array', () => {
    const { result } = renderHook(() => useFilteredRows(mockTableData(), { name: [] }))
    expect(result.current).toEqual(mockTableData())
  })

  it('should filter rows with default filter function', () => {
    const { result } = renderHook(() => useFilteredRows(mockTableData(), { name: 'Zola Ray' }))
    expect(result.current).toEqual([{ name: 'Zola Ray', age: 30 }])
  })

  it('should filter rows with custom filter function', () => {
    const filterFunctions: IFilterFunctions<IData> = { name: (row, value) => row.name.includes(value) }
    const { result } = renderHook(() => useFilteredRows(mockTableData(), { name: 'x' }, filterFunctions))
    expect(result.current).toEqual([
      { name: 'Alexis West', age: 39 },
      { name: 'Jaxen Smith', age: 35 },
    ])
  })
})

describe('useFilter', () => {
  it('should return empty filters by default', () => {
    const { result } = renderHook(() => useFilter(mockTableData()))
    expect(result.current.state).toEqual({})
  })

  it('should return initial filters', () => {
    const { result } = renderHook(() => useFilter(mockTableData(), { name: 'Jaxen Smith' }))
    expect(result.current.state).toEqual({ name: 'Jaxen Smith' })
  })

  it('should change filter', () => {
    const { result } = renderHook(() => useFilter(mockTableData()))
    act(() => result.current.filter('name', 'Zola Ray'))
    expect(result.current.state).toEqual({ name: 'Zola Ray' })
  })

  it('should override existing filter', () => {
    const { result } = renderHook(() => useFilter(mockTableData()))
    act(() => result.current.filter('name', 'Zola Ray'))
    act(() => result.current.filter('name', 'Jaxen Smith'))
    expect(result.current.state).toEqual({ name: 'Jaxen Smith' })
  })

  it('should not filter rows if filter is an empty string', () => {
    const { result } = renderHook(() => useFilter(mockTableData(), { name: '' }))
    expect(result.current.rows).toEqual(mockTableData())
  })

  it('should not filter rows if filter is an empty array', () => {
    const { result } = renderHook(() => useFilter(mockTableData(), { name: [] }))
    expect(result.current.rows).toEqual(mockTableData())
  })

  it('should filter rows with default filter function', () => {
    const { result } = renderHook(() => useFilter(mockTableData(), { name: 'Zola Ray' }))
    expect(result.current.rows).toEqual([{ name: 'Zola Ray', age: 30 }])
  })

  it('should filter rows with custom filter function', () => {
    const filterFunctions: IFilterFunctions<IData> = { name: (row, value) => row.name.includes(value) }
    const { result } = renderHook(() => useFilter(mockTableData(), { name: 'x' }, filterFunctions))
    expect(result.current.rows).toEqual([
      { name: 'Alexis West', age: 39 },
      { name: 'Jaxen Smith', age: 35 },
    ])
  })
})
