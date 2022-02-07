import { FormEvent, useCallback, useMemo, useState } from 'react'

export interface IForm<T = never> {
  onSubmit(e: FormEvent): void
  values: T
  onChange<K extends keyof T>(name: K, value: T[K]): void
  reset(): void
}

export function useForm<T = never>(onSave: (values: T) => void, initialValues: T): IForm<T> {
  const [values, setValues] = useState<T>(initialValues)

  const onChange = useCallback(<K extends keyof T>(name: K, value: T[K]) => {
    setValues((values) => ({ ...values, [name]: value }))
  }, [])

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      e.stopPropagation()
      onSave(values)
    },
    [onSave, values]
  )

  const reset = useCallback(() => {
    setValues(initialValues)
  }, [initialValues])

  return useMemo(() => ({ onSubmit, values, onChange, reset }), [onSubmit, values, reset, onChange])
}
