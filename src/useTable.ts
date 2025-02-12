import { useMemo } from 'react'
import { type IFilterFunctions, type IFilterState, type Unknown, useFilterState, useFilteredRows } from './useFilter.js'
import { type IPaginationState, usePaginatedRows, usePaginationState } from './usePaginate.js'
import { type ISortFunctions, type ISortState, useSortState, useSortedRows } from './useSort.js'

export type IState<T, F extends Unknown<T> = T> = {
  filter: IFilterState<T, F>['state']
  sort: ISortState<T, F>['state']
  sortDir: {
    [key in keyof F]?: 'asc' | 'desc'
  }
  pagination: IPaginationState['state']
}

export type IInitialState<T, F extends Unknown<T> = T> = Partial<Omit<IState<T, F>, 'sortDir'>>

export interface ITableState<T, F extends Unknown<T> = T> {
  state: IState<T, F>
  filter: IFilterState<T, F>['filter']
  sort: ISortState<T, F>['sort']
  goTo: IPaginationState['goTo']
  setLimit: IPaginationState['setLimit']
}

export interface ITableRows<T> {
  rows: T[]
  total: number
}

export interface ITable<T, F extends Unknown<T> = T> extends ITableState<T, F>, ITableRows<T> {}

export interface ITableOptions<T, F extends Unknown<T> = T> {
  filterFunctions?: IFilterFunctions<T, F>
  sortFunctions?: ISortFunctions<T, F>
}

export function useTableState<T, F extends Unknown<T> = T>(initialState?: IInitialState<T, F>): ITableState<T, F> {
  const { state: filterState, filter } = useFilterState<T, F>(initialState?.filter)
  const { state: sortState, sort } = useSortState<T, F>(initialState?.sort)
  const { state: paginationState, goTo, setLimit } = usePaginationState(initialState?.pagination)

  const state = useMemo(() => {
    const state: IState<T, F> = {
      filter: filterState,
      sort: sortState,
      sortDir: {},
      pagination: paginationState,
    }

    for (const sort of state.sort) {
      state.sortDir[sort.field] = sort.dir
    }

    return state
  }, [filterState, sortState, paginationState])

  return useMemo(() => ({ state, filter, sort, goTo, setLimit }), [state, filter, sort, goTo, setLimit])
}

export function useTableRows<T, F extends Unknown<T> = T>(
  data: T[],
  state?: IInitialState<T, F>,
  options?: ITableOptions<T, F>,
): ITableRows<T> {
  const filteredRows = useFilteredRows<T, F>(data, state?.filter, options?.filterFunctions)
  const sortedRows = useSortedRows<T, F>(filteredRows, state?.sort, options?.sortFunctions)
  const rows = usePaginatedRows(sortedRows, state?.pagination)

  return useMemo(() => ({ rows, total: filteredRows.length }), [rows, filteredRows])
}

export function useTable<T, F extends Unknown<T> = T>(
  data: T[],
  initialState?: IInitialState<T, F>,
  options?: ITableOptions<T, F>,
): ITable<T, F> {
  const { state, filter, sort, goTo, setLimit } = useTableState<T, F>(initialState)
  const { rows, total } = useTableRows(data, state, options)

  return useMemo(
    () => ({ rows, total, state, filter, sort, goTo, setLimit }),
    [rows, total, state, filter, sort, goTo, setLimit],
  )
}
