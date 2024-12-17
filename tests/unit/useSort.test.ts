import { act, renderHook } from '@testing-library/react'
import { useSort } from '../../src/useSort.js'
import { mockTableData } from '../mock.js'

describe('useSort', () => {
  it('should return non sorted rows by default', () => {
    const { result } = renderHook(() => useSort(mockTableData()))
    expect(result.current.rows).toEqual(mockTableData())
  })

  it('should sort asc', () => {
    const { result } = renderHook(() => useSort(mockTableData()))
    act(() => result.current.sort('name', 'asc'))
    expect(result.current.rows).toEqual([
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

  it('should sort desc', () => {
    const { result } = renderHook(() => useSort(mockTableData()))
    act(() => result.current.sort('name', 'desc'))
    expect(result.current.rows).toEqual([
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

  it('should clear sort', () => {
    const { result } = renderHook(() => useSort(mockTableData()))
    act(() => result.current.sort('name', 'asc'))
    act(() => result.current.sort('name', null))
    expect(result.current.rows).toEqual(mockTableData())
  })

  it('should sort by multiple columns', () => {
    const { result } = renderHook(() => useSort(mockTableData()))
    act(() => result.current.sort('age', 'asc'))
    act(() => result.current.sort('name', 'desc'))
    expect(result.current.rows).toEqual([
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
