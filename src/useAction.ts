import { useCallback, useEffect, useMemo, useState } from 'react'

export type IActionResult<P extends unknown[], T> = [
  T | undefined,
  { loading: boolean; error?: unknown },
  (...args: P) => Promise<void>,
]

export function useAction<P extends unknown[], T>(action: (...args: P) => Promise<T>): IActionResult<P, T> {
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
        return action(...args)
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
    [mounted, action],
  )

  return useMemo(() => [result, { loading, error }, execute], [result, loading, error, execute])
}
