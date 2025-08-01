import { useCallback, useEffect, useMemo, useState } from 'react'

export type IFetchResult<T> = [T, { loading: boolean; error?: unknown }, () => Promise<void>]

export function useFetch<T>(fetch: () => Promise<T>, defaultValue: T): IFetchResult<T>
export function useFetch<T>(fetch: () => Promise<T>): IFetchResult<T | undefined>
export function useFetch<T>(fetch: () => Promise<T>, defaultValue?: T): IFetchResult<T | undefined> {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T | undefined>(defaultValue)
  const [error, setError] = useState<unknown>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  const refresh = useCallback(() => {
    if (mounted) {
      setLoading(true)
      setError(undefined)
      return fetch()
        .then((data) => {
          if (mounted) setData(data)
        })
        .catch((error) => {
          if (mounted) setError(error)
        })
        .finally(() => {
          if (mounted) setLoading(false)
        })
    }
    return Promise.resolve()
  }, [mounted, fetch])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return useMemo(() => [data, { loading, error }, refresh], [data, loading, error, refresh])
}
