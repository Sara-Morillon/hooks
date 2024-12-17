import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export type State<S> = [S, Dispatch<SetStateAction<S>>]

export function useText(input = ''): State<string> {
  const [value, setValue] = useState(input)

  useEffect(() => {
    if (input) setValue(input)
  }, [input])

  return [value, setValue]
}

export function useBoolean(input = false): State<boolean> {
  const [value, setValue] = useState(input)

  useEffect(() => {
    if (input) setValue(input)
  }, [input])

  return [value, setValue]
}

export function useNumber(input = 0): State<number> {
  const [value, setValue] = useState(input)

  useEffect(() => {
    if (input) setValue(input)
  }, [input])

  return [value, setValue]
}

export function useSelect<T>(input: T): State<T> {
  const [value, setValue] = useState(input)

  useEffect(() => {
    if (input) setValue(input)
  }, [input])

  return [value, setValue]
}

export function useMultiSelect<T>(input: T[] = []): State<T[]> {
  const [value, setValue] = useState(input)

  useEffect(() => {
    if (input) setValue(input)
  }, [input])

  return [value, setValue]
}
