import { useMemo } from 'react'
import { type IFilter, type IFilterFunctions, useFilter } from './useFilter.js'
import { type IPaginate, usePaginate } from './usePaginate.js'
import { ISort, useSort } from './useSort.js'

interface IState<T> {
  filter: IFilter<T>
  sort: ISort<T>
  pagination: IPaginate
}

export interface ITable<T> {
  rows: T[]
  total: number
  state: IState<T>
  filter: <K extends keyof T>(column: K, value: T[K] | T[K][]) => void
  sort: (column: keyof T, dir: 'asc' | 'desc' | null) => void
  goTo: (index: number) => void
  setLimit: (limit: number) => void
}

export interface ITableOptions<T> {
  filterFunctions: IFilterFunctions<T>
}

export function useTable<T>(data: T[], options?: ITableOptions<T>): ITable<T> {
  const { state: filterState, filter, rows: filteredRows } = useFilter<T>(data, options?.filterFunctions)
  const { state: sortState, sort, rows: sortedRows } = useSort<T>(filteredRows)
  const { state: paginationState, goTo, setLimit, rows } = usePaginate(sortedRows)
  const state = useMemo(
    () => ({
      filter: filterState,
      sort: sortState,
      pagination: paginationState,
    }),
    [filterState, sortState, paginationState],
  )

  return useMemo(
    () => ({ rows, total: filteredRows.length, state, filter, sort, goTo, setLimit }),
    [rows, filteredRows, state, filter, sort, goTo, setLimit],
  )
}
