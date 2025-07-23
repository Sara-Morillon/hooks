import { useCallback, useEffect, useMemo, useState } from 'react'

export interface IQueryOptions<T> {
  defaultValue?: T
}

export interface IQueryResult<T> {
  refresh: () => Promise<void>
  loading: boolean
  error?: unknown
  result: T
}

export function useQuery<T>(queryFn: () => Promise<T>, options: IQueryOptions<T> & { defaultValue: T }): IQueryResult<T>
export function useQuery<T>(queryFn: () => Promise<T>, options?: IQueryOptions<T>): IQueryResult<T | undefined>
export function useQuery<T>(queryFn: () => Promise<T>, options: IQueryOptions<T> = {}): IQueryResult<T | undefined> {
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<T | undefined>(options.defaultValue)
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
      return queryFn()
        .then((data) => {
          if (mounted) setResult(data)
        })
        .catch((error) => {
          if (mounted) setError(error)
        })
        .finally(() => {
          if (mounted) setLoading(false)
        })
    }
    return Promise.resolve()
  }, [mounted, queryFn])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return useMemo(() => ({ refresh, loading, error, result }), [refresh, loading, error, result])
}
