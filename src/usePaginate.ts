import { useCallback, useMemo, useState } from 'react'

export interface IPaginate {
  index: number
  limit: number
}

export function usePaginate<T>(data: T[]) {
  const [state, setState] = useState<IPaginate>({ index: 1, limit: 10 })

  const goTo = useCallback((index: number) => {
    setState((state) => ({ ...state, index }))
  }, [])

  const setLimit = useCallback((limit: number) => {
    setState((state) => ({ ...state, limit }))
  }, [])

  const rows = useMemo(() => {
    return data.slice((state.index - 1) * state.limit, state.index * state.limit)
  }, [data, state])

  return useMemo(() => ({ state, goTo, setLimit, rows }), [state, goTo, setLimit, rows])
}
