import { useCallback, useMemo, useState } from 'react'

export type IFilter<T> = {
  [key in keyof T]: unknown
}

export type IFilterFunctions<T, F extends IFilter<T> = T> = {
  [column in keyof T]?: (row: T, filter: F[column]) => boolean
}

export function useFilter<T, F extends IFilter<T> = T>(data: T[], filterFunctions?: IFilterFunctions<T, F>) {
  const [state, setState] = useState<Partial<F>>({})

  const filter = useCallback(<K extends keyof F>(column: K, value?: F[K]) => {
    setState((state) => ({ ...state, [column]: value }))
  }, [])

  const rows = useMemo(() => {
    return data.filter((row) => {
      return Object.entries(state).every((entry) => {
        const column = entry[0] as keyof T
        const value = entry[1] as F[keyof T]
        if (value === undefined || value === null || value === '' || (Array.isArray(value) && !value.length)) {
          return true
        }
        const filterFunction = filterFunctions?.[column]
        if (filterFunction) {
          return filterFunction(row, value)
        }
        return row[column] === value
      })
    })
  }, [data, state, filterFunctions])

  return useMemo(() => ({ state, filter, rows }), [state, filter, rows])
}
