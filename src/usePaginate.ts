import { useCallback, useMemo, useState } from 'react'

export interface IPaginate {
  index: number
  limit: number
}

export function usePaginationState(initialPagination: IPaginate = { index: 1, limit: 10 }) {
  const [state, setState] = useState<IPaginate>(initialPagination)

  const goTo = useCallback((index: number) => {
    setState((state) => ({ ...state, index }))
  }, [])

  const setLimit = useCallback((limit: number) => {
    setState((state) => ({ ...state, limit }))
  }, [])

  return useMemo(() => ({ state, goTo, setLimit }), [state, goTo, setLimit])
}

export function usePaginatedRows<T>(data: T[], pagination?: IPaginate) {
  return useMemo(() => {
    if (!pagination) {
      return data
    }

    return data.slice((pagination.index - 1) * pagination.limit, pagination.index * pagination.limit)
  }, [data, pagination])
}
