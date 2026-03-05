import { type FormEvent, useCallback, useMemo, useState } from 'react'

export type Updater<T> = (current: T) => T

export interface IForm<T = never> {
  values: T
  setValue<K extends keyof T>(name: K, value: T[K]): void
  updateValue<K extends keyof T>(name: K, value: Updater<T[K]>): void
  submit(e?: FormEvent): void
  reset(): void
  error?: unknown
}

export function useForm<T = never>(save: (values: T) => void, initialValues: T): IForm<T> {
  const [error, setError] = useState<unknown>()
  const [values, setValues] = useState<T>(initialValues)

  const setValue = useCallback(<K extends keyof T>(name: K, value: T[K]) => {
    setValues((values) => ({ ...values, [name]: value }))
  }, [])

  const updateValue = useCallback(<K extends keyof T>(name: K, value: Updater<T[K]>) => {
    setValues((values) => ({ ...values, [name]: value(values[name]) }))
  }, [])

  const submit = useCallback(
    (e?: FormEvent) => {
      e?.preventDefault()
      e?.stopPropagation()
      setError(undefined)
      try {
        save(values)
      } catch (error) {
        setError(error)
      }
    },
    [save, values],
  )

  const reset = useCallback(() => {
    setValues(initialValues)
  }, [initialValues])

  return useMemo(
    () => ({ values, setValue, updateValue, submit, reset, error }),
    [values, setValue, updateValue, submit, reset, error],
  )
}
