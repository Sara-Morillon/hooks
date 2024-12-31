import { act, renderHook } from '@testing-library/react'
import { useSortState, useSortedRows } from '../../src/useSort.js'
import { type IData, mockTableData } from '../mock.js'

describe('useSortState', () => {
  it('should return empty sort by default', () => {
    const { result } = renderHook(() => useSortState<IData>())
    expect(result.current.state).toEqual([])
  })

  it('should change sort', () => {
    const { result } = renderHook(() => useSortState<IData>())
    act(() => result.current.sort('name', 'asc'))
    expect(result.current.state).toEqual([{ column: 'name', dir: 'asc' }])
  })

  it('should override existing sort', () => {
    const { result } = renderHook(() => useSortState<IData>())
    act(() => result.current.sort('name', 'asc'))
    act(() => result.current.sort('age', 'asc'))
    act(() => result.current.sort('name', 'desc'))
    expect(result.current.state).toEqual([
      { column: 'age', dir: 'asc' },
      { column: 'name', dir: 'desc' },
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
    const { result } = renderHook(() => useSortedRows(mockTableData(), [{ column: 'name', dir: 'asc' }]))
    expect(result.current).toEqual([
      { name: 'Alaya Winters', age: 40 },
      { name: 'Alexis West', age: 39 },
      { name: 'Annabella Vargas', age: 37 },
      { name: 'Arlo Curtis', age: 32 },
      { name: 'Deandre Vu', age: 32 },
      { name: 'Diego Fitzpatrick', age: 40 },
      { name: 'Gemma Terrell', age: 38 },
      { name: 'Gerardo Pearson', age: 39 },
      { name: 'Jaxen Smith', age: 35 },
      { name: 'Kiara Nava', age: 34 },
      { name: 'Kimora Higgins', age: 38 },
      { name: 'Landry Pineda', age: 31 },
      { name: 'Olivia Camacho', age: 30 },
      { name: 'Ryker Gregory', age: 34 },
      { name: 'Stefan Hart', age: 35 },
      { name: 'Sterling Pugh', age: 30 },
      { name: 'Zola Ray', age: 30 },
    ])
  })

  it('should return rows sorted desc', () => {
    const { result } = renderHook(() => useSortedRows(mockTableData(), [{ column: 'name', dir: 'desc' }]))
    expect(result.current).toEqual([
      { name: 'Zola Ray', age: 30 },
      { name: 'Sterling Pugh', age: 30 },
      { name: 'Stefan Hart', age: 35 },
      { name: 'Ryker Gregory', age: 34 },
      { name: 'Olivia Camacho', age: 30 },
      { name: 'Landry Pineda', age: 31 },
      { name: 'Kimora Higgins', age: 38 },
      { name: 'Kiara Nava', age: 34 },
      { name: 'Jaxen Smith', age: 35 },
      { name: 'Gerardo Pearson', age: 39 },
      { name: 'Gemma Terrell', age: 38 },
      { name: 'Diego Fitzpatrick', age: 40 },
      { name: 'Deandre Vu', age: 32 },
      { name: 'Arlo Curtis', age: 32 },
      { name: 'Annabella Vargas', age: 37 },
      { name: 'Alexis West', age: 39 },
      { name: 'Alaya Winters', age: 40 },
    ])
  })

  it('should sort by multiple columns', () => {
    const { result } = renderHook(() =>
      useSortedRows(mockTableData(), [
        { column: 'age', dir: 'asc' },
        { column: 'name', dir: 'desc' },
      ]),
    )
    expect(result.current).toEqual([
      { name: 'Zola Ray', age: 30 },
      { name: 'Sterling Pugh', age: 30 },
      { name: 'Olivia Camacho', age: 30 },
      { name: 'Landry Pineda', age: 31 },
      { name: 'Deandre Vu', age: 32 },
      { name: 'Arlo Curtis', age: 32 },
      { name: 'Ryker Gregory', age: 34 },
      { name: 'Kiara Nava', age: 34 },
      { name: 'Stefan Hart', age: 35 },
      { name: 'Jaxen Smith', age: 35 },
      { name: 'Annabella Vargas', age: 37 },
      { name: 'Kimora Higgins', age: 38 },
      { name: 'Gemma Terrell', age: 38 },
      { name: 'Gerardo Pearson', age: 39 },
      { name: 'Alexis West', age: 39 },
      { name: 'Diego Fitzpatrick', age: 40 },
      { name: 'Alaya Winters', age: 40 },
    ])
  })
})
