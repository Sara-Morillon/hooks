import { useCallback, useEffect, useMemo, useState } from 'react'

interface IQueryOptions<T> {
  autoRun?: boolean
  defaultValue?: T
}

interface IQueryResult<T> {
  execute: () => Promise<void>
  loading: boolean
  error?: unknown
  result: T
}

export function useQuery<T>(queryFn: () => Promise<T>, options: IQueryOptions<T> & { defaultValue: T }): IQueryResult<T>
export function useQuery<T>(queryFn: () => Promise<T>, options?: IQueryOptions<T>): IQueryResult<T | undefined>
export function useQuery<T>(queryFn: () => Promise<T>, options: IQueryOptions<T> = {}): IQueryResult<T | undefined> {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<T | undefined>(options.defaultValue)
  const [error, setError] = useState<unknown>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  const execute = useCallback(() => {
    if (mounted) {
      setLoading(true)
      setError(undefined)
      setResult(options.defaultValue)
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
    if (options.autoRun) {
      void execute()
    }
  }, [execute, options.autoRun])

  return useMemo(() => ({ execute, loading, error, result }), [execute, loading, error, result])
}
