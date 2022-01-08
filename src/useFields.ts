import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

export type State<S> = [S, Dispatch<SetStateAction<S>>]

export function useTextField(input = ''): State<string> {
  return useSelectField(input)
}

export function useBooleanField(input = false): State<boolean> {
  return useSelectField(input)
}

export function useNumberField(input = 0): State<number> {
  return useSelectField(input)
}

export function useSelectField<T>(input: T): State<T> {
  const [value, setValue] = useState(input)

  useEffect(() => {
    if (input) setValue(input)
  }, [input])

  return [value, setValue]
}

export type MultiSelectState<T> = [...State<T[]>, (value: T) => void, (value: T) => void, (value: T) => void]

export function useMultiSelectField<T>(input: T[] = []): MultiSelectState<T> {
  const [values, setValues] = useSelectField(input)

  const addValue = useCallback(
    (value: T) => {
      setValues((values) => [...values, value])
    },
    [setValues]
  )

  const removeValue = useCallback(
    (value: T) => {
      setValues((values) => values.filter((v) => v !== value))
    },
    [setValues]
  )

  const toggleValue = useCallback(
    (value: T) => {
      setValues((values) => (values.includes(value) ? values.filter((v) => v !== value) : [...values, value]))
    },
    [setValues]
  )

  return [values, setValues, addValue, removeValue, toggleValue]
}
