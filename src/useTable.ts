import { useMemo } from 'react'
import { type IFilter, type IFilterFunctions, useFilterState, useFilteredRows } from './useFilter.js'
import { type IPaginate, usePaginatedRows, usePaginationState } from './usePaginate.js'
import { type ISort, useSortState, useSortedRows } from './useSort.js'

export type IState<T, F extends IFilter<T> = T> = {
  filter: Partial<F>
  sort: ISort<T>[]
  sortDir: {
    [key in keyof T]?: 'asc' | 'desc'
  }
  pagination: IPaginate
}

export type IInitialState<T, F extends IFilter<T> = T> = Partial<Omit<IState<T, F>, 'sortDir'>>

export interface ITableState<T, F extends IFilter<T> = T> {
  state: IState<T, F>
  filter: <K extends keyof T>(column: K, value: F[K]) => void
  sort: (column: keyof T, dir?: 'asc' | 'desc') => void
  goTo: (index: number) => void
  setLimit: (limit: number) => void
}

export interface ITable<T, F extends IFilter<T> = T> extends ITableState<T, F> {
  rows: T[]
  total: number
}

export interface ITableOptions<T, F extends IFilter<T> = T> {
  filterFunctions: IFilterFunctions<T, F>
}

export function useTableState<T, F extends IFilter<T> = T>(): ITableState<T, F> {
  const { state: filterState, filter } = useFilterState<T, F>()
  const { state: sortState, sort } = useSortState<T>()
  const { state: paginationState, goTo, setLimit } = usePaginationState()

  const state = useMemo(() => {
    const state: IState<T, F> = {
      filter: filterState,
      sort: sortState,
      sortDir: {},
      pagination: paginationState,
    }

    for (const sort of state.sort) {
      state.sortDir[sort.column] = sort.dir
    }

    return state
  }, [filterState, sortState, paginationState])

  return useMemo(() => ({ state, filter, sort, goTo, setLimit }), [state, filter, sort, goTo, setLimit])
}

export function useTableRows<T, F extends IFilter<T> = T>(
  data: T[],
  state: IInitialState<T, F>,
  options?: ITableOptions<T, F>,
) {
  const filteredRows = useFilteredRows<T, F>(data, state.filter, options?.filterFunctions)
  const sortedRows = useSortedRows<T>(filteredRows, state.sort)
  const rows = usePaginatedRows(sortedRows, state.pagination)

  return useMemo(() => ({ rows, total: filteredRows.length }), [rows, filteredRows])
}

export function useTable<T, F extends IFilter<T> = T>(data: T[], options?: ITableOptions<T, F>): ITable<T, F> {
  const { state, filter, sort, goTo, setLimit } = useTableState<T, F>()
  const { rows, total } = useTableRows(data, state, options)

  return useMemo(
    () => ({ rows, total, state, filter, sort, goTo, setLimit }),
    [rows, total, state, filter, sort, goTo, setLimit],
  )
}
