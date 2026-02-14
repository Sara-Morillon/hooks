import { useCallback, useMemo, useState } from 'react'

export type ICopyStatus = [
  state: { loading: boolean; error?: unknown; done: boolean },
  copy: (data: string | ClipboardItems) => Promise<void>,
]

export function useCopy(): ICopyStatus {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<unknown>()

  const copy = useCallback(async (data: string | ClipboardItems) => {
    setLoading(true)
    setDone(false)
    setError(undefined)

    try {
      if (typeof data === 'string') {
        await navigator.clipboard.writeText(data)
      } else {
        await navigator.clipboard.write(data)
      }
      setDone(true)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return useMemo(() => [{ loading, done, error }, copy], [loading, done, error, copy])
}
