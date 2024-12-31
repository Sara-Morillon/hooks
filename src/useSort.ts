import { useCallback, useMemo, useState } from 'react'

export interface ISort<T> {
  column: keyof T
  dir: 'asc' | 'desc'
}

export function useSortState<T>(initialSort: ISort<T>[] = []) {
  const [state, setState] = useState<ISort<T>[]>(initialSort)

  const sort = useCallback((column: keyof T, dir?: 'asc' | 'desc') => {
    setState((state) => {
      const newState = state.filter((s) => s.column !== column)
      if (dir) {
        newState.push({ column, dir })
      }
      return newState
    })
  }, [])

  return useMemo(() => ({ state, sort }), [state, sort])
}

export function useSortedRows<T>(data: T[], sort?: ISort<T>[]) {
  return useMemo(() => {
    if (!sort) {
      return data
    }

    return data.toSorted((rowA: T, rowB: T) => {
      for (const { column, dir } of sort) {
        if (rowA[column] < rowB[column]) {
          return dir === 'asc' ? -1 : 1
        }
        if (rowA[column] > rowB[column]) {
          return dir === 'asc' ? 1 : -1
        }
      }
      return 0
    })
  }, [data, sort])
}
