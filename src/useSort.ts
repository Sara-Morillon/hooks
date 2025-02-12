import { useCallback, useMemo, useState } from 'react'
import type { Unknown } from './useFilter.js'

export type ISortFunctions<T, F extends Unknown<T> = T> = {
  [field in keyof F]?: (rowA: T, rowB: T) => number
}

export interface ISortItem<T> {
  field: keyof T
  dir: 'asc' | 'desc'
}

export interface ISortState<T> {
  state: ISortItem<T>[]
  sort: (field: keyof T, dir?: 'asc' | 'desc') => void
}

export interface ISorted<T> extends ISortState<T> {
  rows: T[]
}

export function useSortState<T>(initialSort: ISortItem<T>[] = []): ISortState<T> {
  const [state, setState] = useState<ISortItem<T>[]>(initialSort)

  const sort = useCallback((field: keyof T, dir?: 'asc' | 'desc') => {
    setState((state) => {
      const newState = state.filter((s) => s.field !== field)
      if (dir) {
        newState.push({ field: field, dir })
      }
      return newState
    })
  }, [])

  return useMemo(() => ({ state, sort }), [state, sort])
}

export function useSortedRows<T, F extends Unknown<T> = T>(
  data: T[],
  sort?: ISortItem<T>[],
  sortFunctions?: ISortFunctions<T, F>,
): T[] {
  return useMemo(() => {
    if (!sort) {
      return data
    }

    return data.toSorted((rowA: T, rowB: T) => {
      for (const { field, dir } of sort) {
        const sortFunction = sortFunctions?.[field]
        if (sortFunction) {
          return sortFunction(rowA, rowB)
        }
        if (rowA[field] < rowB[field]) {
          return dir === 'asc' ? -1 : 1
        }
        if (rowA[field] > rowB[field]) {
          return dir === 'asc' ? 1 : -1
        }
      }
      return 0
    })
  }, [data, sort, sortFunctions])
}

export function useSort<T, F extends Unknown<T> = T>(
  data: T[],
  initialSort: ISortItem<T>[] = [],
  sortFunctions?: ISortFunctions<T, F>,
): ISorted<T> {
  const { state, sort } = useSortState<T>(initialSort)
  const rows = useSortedRows(data, state, sortFunctions)

  return useMemo(() => ({ rows, state, sort }), [rows, state, sort])
}
