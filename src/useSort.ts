import { useCallback, useMemo, useState } from 'react'

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

export function useSortedRows<T>(data: T[], sort?: ISortItem<T>[]): T[] {
  return useMemo(() => {
    if (!sort) {
      return data
    }

    return data.toSorted((rowA: T, rowB: T) => {
      for (const { field, dir } of sort) {
        if (rowA[field] < rowB[field]) {
          return dir === 'asc' ? -1 : 1
        }
        if (rowA[field] > rowB[field]) {
          return dir === 'asc' ? 1 : -1
        }
      }
      return 0
    })
  }, [data, sort])
}

export function useSort<T>(data: T[], initialSort: ISortItem<T>[] = []): ISorted<T> {
  const { state, sort } = useSortState<T>(initialSort)
  const rows = useSortedRows(data, state)

  return useMemo(() => ({ rows, state, sort }), [rows, state, sort])
}
