import { useCallback, useEffect, useMemo, useState } from 'react'

export interface IActionResult<P extends unknown[], T> {
  execute: (...args: P) => Promise<void>
  loading: boolean
  error?: unknown
  result: T
}

export function useAction<P extends unknown[], T>(
  queryFn: (...args: P) => Promise<T>,
): IActionResult<P, T | undefined> {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<T | undefined>(undefined)
  const [error, setError] = useState<unknown>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  const execute = useCallback(
    (...args: P) => {
      if (mounted) {
        setLoading(true)
        setError(undefined)
        return queryFn(...args)
          .then((data: T) => {
            if (mounted) setResult(data)
          })
          .catch((error: unknown) => {
            if (mounted) setError(error)
          })
          .finally(() => {
            if (mounted) setLoading(false)
          })
      }
      return Promise.resolve()
    },
    [mounted, queryFn],
  )

  return useMemo(() => ({ execute, loading, error, result }), [execute, loading, error, result])
}
