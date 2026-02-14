import { useCallback, useMemo, useState } from 'react'

export type ICopyStatus = [
  state: { loading: boolean; error?: unknown },
  copy: (data: string | ClipboardItems) => Promise<void>,
]

export function useCopy(): ICopyStatus {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()

  const copy = useCallback(async (data: string | ClipboardItems) => {
    setError(undefined)
    setLoading(true)

    try {
      if (typeof data === 'string') {
        await navigator.clipboard.writeText(data)
      } else {
        await navigator.clipboard.write(data)
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return useMemo(() => [{ loading, error }, copy], [loading, error, copy])
}
