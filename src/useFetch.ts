import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAction } from './useAction.js'

export type IFetchResult<T> = [data: T, state: { loading: boolean; error?: unknown }, refresh: () => Promise<void>]

export function useFetch<T>(fetch: (signal: AbortSignal) => Promise<T>, defaultValue: T): IFetchResult<T>
export function useFetch<T>(fetch: (signal: AbortSignal) => Promise<T>): IFetchResult<T | undefined>
export function useFetch<T>(fetch: (signal: AbortSignal) => Promise<T>, defaultValue?: T): IFetchResult<T | undefined> {
  const [{ loading, error }, execute, cancel] = useAction(fetch)
  const [data, setData] = useState(defaultValue)

  const refresh = useCallback(() => execute().then(setData), [execute])

  useEffect(() => {
    refresh()
    return cancel
  }, [refresh, cancel])

  return useMemo(() => [data, { loading, error }, refresh], [data, loading, error, refresh])
}
