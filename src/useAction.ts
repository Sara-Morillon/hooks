import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type IActionResult<P extends unknown[], T> = [
  state: { loading: boolean; error?: unknown },
  execute: (...args: P) => Promise<T | undefined>,
  cancel: () => void,
]

export function useAction<P extends unknown[], T>(
  action: (...args: [...P, AbortSignal]) => Promise<T>,
): IActionResult<P, T> {
  const controllerRef = useRef<AbortController | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()

  const execute = useCallback(
    async (...args: P) => {
      if (controllerRef.current) {
        controllerRef.current.abort()
      }

      const controller = new AbortController()
      controllerRef.current = controller

      setLoading(true)
      setError(undefined)
      try {
        const data = await action(...args, controller.signal)
        if (!controller.signal.aborted) {
          return data
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setError(error)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    },
    [action],
  )

  const cancel = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort()
    }
  }, [])

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort()
      }
    }
  }, [])

  return useMemo(() => [{ loading, error }, execute, cancel], [loading, error, execute, cancel])
}
