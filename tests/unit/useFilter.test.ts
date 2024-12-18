import { act, renderHook } from '@testing-library/react'
import { type IFilterFunctions, useFilter } from '../../src/useFilter.js'
import { IData, mockTableData } from '../mock.js'

describe('useFilter', () => {
  it('should return all rows by default', () => {
    const { result } = renderHook(() => useFilter(mockTableData()))
    expect(result.current.rows).toEqual(mockTableData())
  })

  it('should update state when filtering', () => {
    const { result } = renderHook(() => useFilter(mockTableData()))
    act(() => result.current.filter('name', 'Zola Ray'))
    expect(result.current.state).toEqual({ name: 'Zola Ray' })
  })

  it('should not filter rows if filter is an empty string', () => {
    const { result } = renderHook(() => useFilter(mockTableData()))
    act(() => result.current.filter('name', ''))
    expect(result.current.rows).toEqual(mockTableData())
  })

  it('should not filter rows if filter is an empty ', () => {
    const { result } = renderHook(() => useFilter<IData, { name: string[]; age: number }>(mockTableData()))
    act(() => result.current.filter('name', []))
    expect(result.current.rows).toEqual(mockTableData())
  })

  it('should filter rows with default filter function', () => {
    const { result } = renderHook(() => useFilter(mockTableData()))
    act(() => result.current.filter('name', 'Zola Ray'))
    expect(result.current.rows).toEqual([{ name: 'Zola Ray', age: 30 }])
  })

  it('should filter rows with custom filter function', () => {
    const filterFunctions: IFilterFunctions<IData> = { name: (row, value) => row.name.includes(value) }
    const { result } = renderHook(() => useFilter(mockTableData(), filterFunctions))
    act(() => result.current.filter('name', 'x'))
    expect(result.current.rows).toEqual([
      { name: 'Alexis West', age: 39 },
      { name: 'Jaxen Smith', age: 35 },
    ])
  })
})
