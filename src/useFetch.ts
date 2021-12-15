import { useCallback, useEffect, useState } from 'react'

interface IFetchedStatus {
  loading: boolean
  error?: unknown
  refresh: () => void
}

export function useFetch<T>(fetchFn: () => Promise<T>, defaultValue: T): [T, IFetchedStatus] {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T>(defaultValue)
  const [error, setError] = useState()
  const [mounted, setMounted] = useState(false)

  const refresh = useCallback(() => {
    if (mounted) {
      setLoading(true)
      fetchFn()
        .then((data) => mounted && setData(data))
        .catch((error) => mounted && setError(error))
        .finally(() => mounted && setLoading(false))
    }
  }, [mounted, fetchFn])

  useEffect(() => {
    setMounted(true)
    refresh()
    return () => {
      setMounted(false)
    }
  }, [refresh])

  return [data, { loading, error, refresh }]
}
