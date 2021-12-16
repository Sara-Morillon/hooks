import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

export type State<S> = [S, Dispatch<SetStateAction<S>>]

export function useText(input = ''): State<string> {
  return useSelect(input)
}

export function useBoolean(input = false): State<boolean> {
  return useSelect(input)
}

export function useNumber(input = 0): State<number> {
  return useSelect(input)
}

export function useSelect<T>(input: T): State<T> {
  const [value, setValue] = useState(input)

  useEffect(() => {
    if (input) setValue(input)
  }, [input])

  return [value, setValue]
}

export type MultiSelectState<T> = [...State<T[]>, (value: T) => void, (value: T) => void, (value: T) => void]

export function useMultiSelect<T>(input: T[] = []): MultiSelectState<T> {
  const [values, setValues] = useSelect(input)

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
