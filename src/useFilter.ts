import { useCallback, useMemo, useState } from 'react'

export type Unknown<T> = {
  [P in keyof T]: unknown
}

export type IFilterFunctions<T, F extends Unknown<T> = T> = {
  [field in keyof T]?: (row: T, filter: F[field]) => boolean
}

export interface IFilterState<T, F extends Unknown<T> = T> {
  state: Partial<F>
  filter: <K extends keyof F>(field: K, value?: F[K]) => void
}

export interface IFiltered<T, F extends Unknown<T> = T> extends IFilterState<T, F> {
  rows: T[]
}

export function useFilterState<T, F extends Unknown<T> = T>(initialFilters: Partial<F> = {}): IFilterState<T, F> {
  const [state, setState] = useState<Partial<F>>(initialFilters)

  const filter = useCallback(<K extends keyof F>(field: K, value?: F[K]) => {
    setState((state) => ({ ...state, [field]: value }))
  }, [])

  return useMemo(() => ({ state, filter }), [state, filter])
}

export function useFilteredRows<T, F extends Unknown<T> = T>(
  data: T[],
  filters?: Partial<F>,
  filterFunctions?: IFilterFunctions<T, F>,
): T[] {
  return useMemo(() => {
    if (!filters) {
      return data
    }

    return data.filter((row) => {
      return Object.entries(filters).every((entry) => {
        const field = entry[0] as keyof T
        const value = entry[1] as F[keyof T]
        if (value === undefined || value === null || value === '' || (Array.isArray(value) && !value.length)) {
          return true
        }
        const filterFunction = filterFunctions?.[field]
        if (filterFunction) {
          return filterFunction(row, value)
        }
        return row[field] === value
      })
    })
  }, [data, filters, filterFunctions])
}

export function useFilter<T, F extends Unknown<T> = T>(
  data: T[],
  initialFilter: Partial<F> = {},
  filterFunctions?: IFilterFunctions<T, F>,
): IFiltered<T, F> {
  const { state, filter } = useFilterState<T, F>(initialFilter)
  const rows = useFilteredRows(data, state, filterFunctions)

  return useMemo(() => ({ rows, state, filter }), [rows, state, filter])
}
