import { useCallback, useEffect, useMemo, useState } from 'react'

type S<T> = T extends (...args: infer P) => infer R ? { p: P; r: Awaited<R> } : never

type O<F> =
  | (S<F>['p'] extends []
      ? {
          autoRun: true
          defaultParams: S<F>['p']
          defaultValue?: S<F>['r']
        }
      : {
          autoRun: true
          defaultValue?: S<F>['r']
        })
  | {
      autoRun?: false
      defaultValue?: S<F>['r']
    }

type R<F> = {
  execute: (...params: S<F>['p']) => Promise<void>
  loading: boolean
  error?: unknown
  result: S<F>['r']
}

export function useQuery<F extends Function>(queryFn: F, options: O<F> = {}): R<F> {
  const [loading, setLoading] = useState(options.autoRun || false)
  const [result, setResult] = useState<S<F>['r'] | undefined>(options.defaultValue)
  const [error, setError] = useState<unknown>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  const execute = useCallback(
    (...args: S<F>['p']) => {
      if (mounted) {
        setLoading(true)
        setError(undefined)
        return queryFn(...args)
          .then((data: S<F>['p']) => {
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

  useEffect(() => {
    if (options.autoRun) {
      if ('defaultParams' in options) {
        void execute(...options.defaultParams)
      } else {
        void execute()
      }
    }
  }, [execute, options.autoRun])

  return useMemo(() => ({ execute, loading, error, result }), [execute, loading, error, result])
}
