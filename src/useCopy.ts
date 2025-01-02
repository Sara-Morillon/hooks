import { useCallback, useEffect, useMemo, useState } from 'react'

interface ICopyStatus {
  authorized: boolean
  copy: (data: string) => void
  loading: boolean
  error?: unknown
}

export function useCopy(): ICopyStatus {
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const copy = useCallback((data: string) => {
    setLoading(true)
    navigator.clipboard
      .writeText(data)
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (navigator.userAgent.includes('Firefox')) {
      setAuthorized(true)
    } else {
      void navigator.permissions.query({ name: 'clipboard-write' as PermissionName }).then((result) => {
        setAuthorized(result.state === 'granted' || result.state === 'prompt')
      })
    }
  }, [])

  return useMemo(() => ({ authorized, loading, error, copy }), [authorized, loading, error, copy])
}
