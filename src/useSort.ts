import { useCallback, useMemo, useState } from 'react'

export interface ISort<T> {
  column: keyof T
  dir: 'asc' | 'desc'
}

export function useSort<T>(data: T[]) {
  const [state, setState] = useState<ISort<T>[]>([])

  const sort = useCallback((column: keyof T, dir: 'asc' | 'desc' | null) => {
    setState((state) => {
      const newState = state.filter((s) => s.column !== column)
      if (dir !== null) {
        newState.push({ column, dir })
      }
      return newState
    })
  }, [])

  const rows = useMemo(() => {
    return data.toSorted((rowA: T, rowB: T) => {
      let result = 0
      for (const { column, dir } of state) {
        if (result === 0) {
          if (rowA[column] < rowB[column]) {
            return dir === 'asc' ? -1 : 1
          }
          if (rowA[column] > rowB[column]) {
            return dir === 'asc' ? 1 : -1
          }
        }
      }
      return result
    })
  }, [data, state])

  return useMemo(() => ({ state, sort, rows }), [state, sort, rows])
}
