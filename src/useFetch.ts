import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

interface IFetchedStatus {
  loading: boolean
  error?: unknown
}

export function useFetch<T>(
  fetchFn: () => Promise<T>,
  defaultValue: T,
  autoFetch = true
): [T, IFetchedStatus, () => void, Dispatch<SetStateAction<T>>] {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T>(defaultValue)
  const [error, setError] = useState()
  const [mounted, setMounted] = useState(false)

  const fetch = useCallback(() => {
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
    if (autoFetch) fetch()
    return () => {
      setMounted(false)
    }
  }, [autoFetch, fetch])

  return useMemo(() => [data, { loading, error }, fetch, setData], [data, loading, error, fetch])
}
