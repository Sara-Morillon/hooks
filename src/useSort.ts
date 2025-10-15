import { useCallback, useMemo, useState } from 'react'
import type { Unknown } from './useFilter.js'

export type ISortFunctions<T, F extends Unknown<T> = T> = {
  [field in keyof F]?: (rowA: T, rowB: T) => number
}

export interface ISortItem<T, F extends Unknown<T> = T> {
  field: keyof F
  dir: 'asc' | 'desc'
}

export interface ISortState<T, F extends Unknown<T> = T> {
  state: ISortItem<T, F>[]
  sort: (field: keyof F, dir?: 'asc' | 'desc') => void
}

export interface ISorted<T, F extends Unknown<T> = T> extends ISortState<T, F> {
  rows: T[]
}

export function useSortState<T, F extends Unknown<T> = T>(initialSort: ISortItem<F>[] = []): ISortState<T, F> {
  const [state, setState] = useState<ISortItem<T, F>[]>(initialSort)

  const sort = useCallback((field: keyof F, dir?: 'asc' | 'desc') => {
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
  sort?: ISortItem<T, F>[],
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
          return sortFunction(rowA, rowB) * (dir === 'asc' ? 1 : -1)
        }
        const valueA = rowA[field as keyof T]
        const valueB = rowB[field as keyof T]
        if (valueA < valueB) {
          return dir === 'asc' ? -1 : 1
        }
        if (valueA > valueB) {
          return dir === 'asc' ? 1 : -1
        }
      }
      return 0
    })
  }, [data, sort, sortFunctions])
}

export function useSort<T, F extends Unknown<T> = T>(
  data: T[],
  initialSort: ISortItem<T, F>[] = [],
  sortFunctions?: ISortFunctions<T, F>,
): ISorted<T, F> {
  const { state, sort } = useSortState<T, F>(initialSort)
  const rows = useSortedRows(data, state, sortFunctions)

  return useMemo(() => ({ rows, state, sort }), [rows, state, sort])
}
