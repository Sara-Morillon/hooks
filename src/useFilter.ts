import { useCallback, useMemo, useState } from 'react'

export type IFilter<T> = {
  [key in keyof T]?: unknown
}

export type IFilterFunctions<T> = {
  [column in keyof T]?: (row: T, filter: unknown) => boolean
}

export function useFilter<T>(data: T[], filterFunctions?: IFilterFunctions<T>) {
  const [state, setState] = useState<IFilter<T>>({})

  const filter = useCallback(<K extends keyof T>(column: K, value?: unknown) => {
    setState((state) => ({ ...state, [column]: value }))
  }, [])

  const rows = useMemo(() => {
    return data.filter((row) => {
      return Object.entries(state).every((entry) => {
        const column = entry[0] as keyof T
        const value = entry[1] as IFilter<T>[keyof T]
        if (!value || (Array.isArray(value) && !value.length)) {
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
