import { useFetch } from './useFetch'
import { useBoolean, useMultiSelect, useNumber, useSelect, useText } from './useFields'
import { useTheme } from './useTheme'

const fields = {
  useText,
  useBoolean,
  useMultiSelect,
  useNumber,
  useSelect,
}

export { useFetch, fields, useTheme }
