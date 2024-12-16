import { type FormEvent, useCallback, useMemo, useState } from 'react'

export interface IForm<T = never> {
  values: T
  onChange<K extends keyof T>(name: K, value: T[K]): void
  submit(e?: FormEvent): void
  reset(): void
  loading: boolean
  error?: unknown
}

export function useForm<T = never>(save: (values: T) => void | Promise<void>, initialValues: T): IForm<T> {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()
  const [values, setValues] = useState<T>(initialValues)

  const onChange = useCallback(<K extends keyof T>(name: K, value: T[K]) => {
    setValues((values) => ({ ...values, [name]: value }))
  }, [])

  const submit = useCallback(
    (e?: FormEvent) => {
      setLoading(true)
      setError(undefined)
      e?.preventDefault()
      e?.stopPropagation()
      Promise.resolve()
        .then(() => save(values))
        .catch(setError)
        .finally(() => setLoading(false))
    },
    [save, values],
  )

  const reset = useCallback(() => {
    setValues(initialValues)
  }, [initialValues])

  return useMemo(
    () => ({ values, onChange, submit, reset, loading, error }),
    [values, onChange, submit, reset, loading, error],
  )
}
