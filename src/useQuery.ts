import { useCallback, useEffect, useMemo, useState } from 'react'

interface IQueryResult<T> {
  execute: () => Promise<void>
  loading: boolean
  error?: unknown
  result?: T
}

export function useQuery<T>(queryFn: () => Promise<T>): IQueryResult<T> {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<T>()
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
      setResult(undefined)
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

  return useMemo(() => ({ execute, loading, error, result }), [execute, loading, error, result])
}
