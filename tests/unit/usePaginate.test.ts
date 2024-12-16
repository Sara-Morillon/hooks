import { act, renderHook } from '@testing-library/react'
import { usePaginate } from '../../src/usePaginate.js'
import { mockTableData } from '../mock.js'

describe('usePaginate', () => {
  it('should return first page rows by default', () => {
    const { result } = renderHook(() => usePaginate(mockTableData()))
    expect(result.current.rows).toEqual([
      { name: 'Zola Ray', age: 30 },
      { name: 'Arlo Curtis', age: 32 },
      { name: 'Alexis West', age: 39 },
      { name: 'Diego Fitzpatrick', age: 40 },
      { name: 'Annabella Vargas', age: 37 },
      { name: 'Ryker Gregory', age: 34 },
      { name: 'Alaya Winters', age: 40 },
      { name: 'Deandre Vu', age: 32 },
      { name: 'Kimora Higgins', age: 38 },
      { name: 'Sterling Pugh', age: 30 },
    ])
  })

  it('should return subset of rows when changing page index', () => {
    const { result } = renderHook(() => usePaginate(mockTableData()))
    act(() => result.current.goTo(2))
    expect(result.current.rows).toEqual([
      { name: 'Landry Pineda', age: 31 },
      { name: 'Gerardo Pearson', age: 39 },
      { name: 'Kiara Nava', age: 34 },
      { name: 'Stefan Hart', age: 35 },
      { name: 'Gemma Terrell', age: 38 },
      { name: 'Jaxen Smith', age: 35 },
      { name: 'Olivia Camacho', age: 30 },
    ])
  })

  it('should change subset size when changing limit', () => {
    const { result } = renderHook(() => usePaginate(mockTableData()))
    act(() => result.current.setLimit(5))
    expect(result.current.rows).toEqual([
      { name: 'Zola Ray', age: 30 },
      { name: 'Arlo Curtis', age: 32 },
      { name: 'Alexis West', age: 39 },
      { name: 'Diego Fitzpatrick', age: 40 },
      { name: 'Annabella Vargas', age: 37 },
    ])
  })
})
