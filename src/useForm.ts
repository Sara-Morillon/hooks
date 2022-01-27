import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'

export interface IForm<T = never> {
  onSubmit(e: FormEvent): void
  values?: Partial<T>
  onChange<K extends keyof T>(name: K, value: Partial<T>[K]): void
  reset(): void
}

export function useForm<T = never>(onSave: (values: Partial<T>) => void, initialValues?: Partial<T>): IForm<T> {
  const [values, setValues] = useState<Partial<T> | undefined>(initialValues)

  const onChange = useCallback(<K extends keyof T>(name: K, value: Partial<T>[K]) => {
    setValues((values) => ({ ...values, [name]: value }))
  }, [])

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      if (values) onSave(values)
    },
    [onSave, values]
  )

  const reset = useCallback(() => {
    setValues(initialValues)
  }, [initialValues])

  useEffect(() => {
    if (initialValues) reset()
  }, [initialValues, reset])

  return useMemo(() => ({ onSubmit, values, onChange, reset }), [onSubmit, values, reset, onChange])
}
