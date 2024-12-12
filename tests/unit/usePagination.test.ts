import { act, renderHook } from '@testing-library/react'
import { usePagination } from '../../src/usePagination.js'

describe('page', () => {
  it('should return page 1 by default', () => {
    const { result } = renderHook(() => usePagination(2))
    expect(result.current.page).toBe(1)
  })

  it('should return initial page', () => {
    const { result } = renderHook(() => usePagination(2, 5))
    expect(result.current.page).toBe(5)
  })
})

describe('goto', () => {
  it('should go to page', () => {
    const { result } = renderHook(() => usePagination(2))
    act(() => result.current.goTo(2))
    expect(result.current.page).toBe(2)
  })

  it('should not go to page lower than 1', () => {
    const { result } = renderHook(() => usePagination(2))
    act(() => result.current.goTo(0))
    expect(result.current.page).toBe(1)
  })

  it('should not go to page higher than max page', () => {
    const { result } = renderHook(() => usePagination(1))
    act(() => result.current.goTo(2))
    expect(result.current.page).toBe(1)
  })

  it('should go to page using function', () => {
    const { result } = renderHook(() => usePagination(2))
    act(() => result.current.goTo((page) => page + 1))
    expect(result.current.page).toBe(2)
  })

  it('should not go to page lower than 1 using function', () => {
    const { result } = renderHook(() => usePagination(2))
    act(() => result.current.goTo((page) => page - 1))
    expect(result.current.page).toBe(1)
  })

  it('should not go to page higher than max page using function', () => {
    const { result } = renderHook(() => usePagination(1))
    act(() => result.current.goTo((page) => page + 1))
    expect(result.current.page).toBe(1)
  })
})

describe('first', () => {
  it('should go to first page', () => {
    const { result } = renderHook(() => usePagination(2))
    act(() => result.current.goTo(2))
    act(() => result.current.first())
    expect(result.current.page).toBe(1)
  })
})

describe('previous', () => {
  it('should go to previous page', () => {
    const { result } = renderHook(() => usePagination(2))
    act(() => result.current.goTo(2))
    act(() => result.current.previous())
    expect(result.current.page).toBe(1)
  })

  it('should not go to previous page if page is 1', () => {
    const { result } = renderHook(() => usePagination(2))
    act(() => result.current.previous())
    expect(result.current.page).toBe(1)
  })
})

describe('next', () => {
  it('should go to next page', () => {
    const { result } = renderHook(() => usePagination(2))
    act(() => result.current.next())
    expect(result.current.page).toBe(2)
  })

  it('should not go to next page if page is max page', () => {
    const { result } = renderHook(() => usePagination(1))
    act(() => result.current.next())
    expect(result.current.page).toBe(1)
  })
})

describe('last', () => {
  it('should go to last page', () => {
    const { result } = renderHook(() => usePagination(2))
    act(() => result.current.last())
    expect(result.current.page).toBe(2)
  })
})

describe('canPrevious', () => {
  it('should return true if page is higher than 1', () => {
    const { result } = renderHook(() => usePagination(2))
    act(() => result.current.goTo(2))
    expect(result.current.canPrevious).toBe(true)
  })

  it('should return false if page is lower or equal than 1', () => {
    const { result } = renderHook(() => usePagination(2))
    expect(result.current.canPrevious).toBe(false)
  })
})

describe('canNext', () => {
  it('should return true if page is lower than max page', () => {
    const { result } = renderHook(() => usePagination(2))
    expect(result.current.canNext).toBe(true)
  })

  it('should return false if page is higher or equal than max page', () => {
    const { result } = renderHook(() => usePagination(2))
    act(() => result.current.goTo(2))
    expect(result.current.canNext).toBe(false)
  })
})
