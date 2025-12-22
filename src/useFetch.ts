import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type IFetchResult<T> = [data: T, state: { loading: boolean; error?: unknown }, refresh: () => Promise<void>]

export function useFetch<T>(fetch: (signal: AbortSignal) => Promise<T>, defaultValue: T): IFetchResult<T>
export function useFetch<T>(fetch: (signal: AbortSignal) => Promise<T>): IFetchResult<T | undefined>
export function useFetch<T>(fetch: (signal: AbortSignal) => Promise<T>, defaultValue?: T): IFetchResult<T | undefined> {
  const controllerRef = useRef<AbortController | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()
  const [data, setData] = useState(defaultValue)

  const refresh = useCallback(async () => {
    if (controllerRef.current) {
      controllerRef.current.abort()
    }

    const controller = new AbortController()
    controllerRef.current = controller

    setLoading(true)
    setError(undefined)
    try {
      const data = await fetch(controller.signal)
      if (!controller.signal.aborted) {
        setData(data)
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
  }, [fetch])

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort()
      }
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return useMemo(() => [data, { loading, error }, refresh], [data, loading, error, refresh])
}
