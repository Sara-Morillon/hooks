import { useCallback, useMemo, useState } from 'react'

export interface IPaginationInfo {
  index: number
  limit: number
}

export interface IPaginationState {
  state: IPaginationInfo
  goTo: (index: number) => void
  setLimit: (limit: number) => void
}

export interface IPaginated<T> extends IPaginationState {
  rows: T[]
}

export function usePaginationState(initialPagination: IPaginationInfo = { index: 0, limit: 10 }): IPaginationState {
  const [state, setState] = useState<IPaginationInfo>(initialPagination)

  const goTo = useCallback((index: number) => {
    setState((state) => ({ ...state, index }))
  }, [])

  const setLimit = useCallback((limit: number) => {
    setState((state) => ({ ...state, limit }))
  }, [])

  return useMemo(() => ({ state, goTo, setLimit }), [state, goTo, setLimit])
}

export function usePaginatedRows<T>(data: T[], pagination?: IPaginationInfo): T[] {
  return useMemo(() => {
    if (!pagination) {
      return data
    }

    return data.slice(pagination.index * pagination.limit, (pagination.index + 1) * pagination.limit)
  }, [data, pagination])
}

export function usePaginate<T>(data: T[], initialPagination: IPaginationInfo = { index: 0, limit: 10 }): IPaginated<T> {
  const { state, goTo, setLimit } = usePaginationState(initialPagination)
  const rows = usePaginatedRows(data, state)

  return useMemo(() => ({ rows, state, goTo, setLimit }), [rows, state, goTo, setLimit])
}
