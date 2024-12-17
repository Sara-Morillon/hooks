import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

interface IFetchedStatus {
  loading: boolean
  error?: unknown
}

export function useFetch<T>(
  fetchFn: () => Promise<T>,
  defaultValue: T
): [T, IFetchedStatus, () => void, Dispatch<SetStateAction<T>>] {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T>(defaultValue)
  const [error, setError] = useState()
  const [mounted, setMounted] = useState(false)

  const replay = useCallback(() => {
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
    replay()
    return () => {
      setMounted(false)
    }
  }, [replay])

  return useMemo(() => [data, { loading, error }, replay, setData], [data, loading, error, replay])
}
