import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type ICopyStatus = [
  authorized: boolean,
  state: { loading: boolean; error?: unknown },
  copy: (data: string) => Promise<void>,
]

export function useCopy(): ICopyStatus {
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()

  const mountedRef = useRef(true)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const copy = useCallback(async (data: string) => {
    setError(undefined)
    setLoading(true)

    try {
      await navigator.clipboard.writeText(data)
    } catch (error) {
      if (mountedRef.current) {
        setError(error)
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    void navigator.permissions
      ?.query({ name: 'clipboard-write' as PermissionName })
      .then((result) => setAuthorized(result.state === 'granted' || result.state === 'prompt'))
  }, [])

  return useMemo(() => [authorized, { loading, error }, copy], [authorized, loading, error, copy])
}
