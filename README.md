# Hooks

Some utility hooks.

## useTheme

`useTheme` returns 'dark' or 'light' according to prefers-color-scheme media query.

It also changes document root color-scheme accordingly.

```typescript
import { useTheme } from '@saramorillon/hooks'

function MyComponent() {
  const theme = useTheme()
  return theme === 'dark' ? <Dark /> : <Light />
}
```

## useFetch

`useFetch` provides an easy way to make any action that triggers a loading, returns some data and may generate an error (typical API call use case).

It also provides a refresh function to replay the action.

```typescript
import { useFetch } from '@saramorillon/hooks'
import { getData } from './service'

function MyComponent() {
  const [data, status, refresh] = useFetch(getData, null)

  if (status.loading) return <Spinner />
  if (status.error) return <Error />
  return (
    <>
      <Button onClick={refresh} />
      <Table data={data} />
    </>
  )
}
```

## usePagination

`usePagination` provides an easy way to generate a full pagination system.

```typescript
import { usePagination } from '@saramorillon/hooks'
import { getData } from './service'

const limit = 10

function MyComponent() {
  const { page, maxPages, setMaxPages, first, previous, next, last, canPrevious, canNext } = usePagination()
  const fetch = useCallback(() => getData(page, limit), [page])
  const [{ data, total }] = useFetch(fetch, { data: [], total: 0 })

  useEffect(() => {
    setMaxPages(Math.ceil(total / limit))
  }, [setMaxPages, total])
}

return (
  <div>
    <button disabled={!canPrevious} onClick={first}>
      First page
    </button>
    <button disabled={!canPrevious} onClick={previous}>
      Previous page
    </button>
    <span>
      Page {page} of {maxPages}
    </span>
    <button disabled={!canNext} onClick={next}>
      Next page
    </button>
    <button disabled={!canNext} onClick={last}>
      Last page
    </button>
  </div>
)
```

## fields

`fields` hooks are wrappers designed for form fields based on component state or props.

Unlike useState, they automatically refresh when input value changes.

### useText, useBoolean, useNumber

`useText`, `useBoolean` and `useNumber` are used for primitive inputs (text, password, checkbox, number, etc.).

```typescript
import { fields } from '@saramorillon/hooks'

type Data {
  name: string
  married: boolean
  age: number
}

function MyComponent({ data }: { data: Data }) {

  const [name, setName] = fields.useText(data.name)
  const [married, setMarried] = fields.useBoolean(data.married)
  const [age, setAge] = fields.useNumber(data.age)

  return (
    <form>
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <input type="checkbox" checked={married} onChange={(e) => setMarried(e.target.checked)} />

      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
    </form>
  )
}
```

### useSelect

`useSelect` is used for single select element.

```typescript
import { fields } from '@saramorillon/hooks'

type Data {
  color: 'red' | 'green' | 'blue'
}

function MyComponent({ data }: { data: Data }) {
  const [color, setColor] = fields.useSelect(data.color)

  return (
    <form>
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>

      <select
        multiple
        value={tags}
        onChange={(e) => setTags(Array.from(e.target.selectedOptions, (option) => option.value))}
      >
        <option value="1">Tag 1</option>
        <option value="2">Tag 2</option>
      </select>
    </form>
  )
}
```

### useMultiSelect

`useMultiSelect` is used for multiple select element.

```typescript
import { fields } from '@saramorillon/hooks'

type Data {
  colors: ('red' | 'green' | 'blue')[]
}

function MyComponent({ data }: { data: Data }) {
  const [colors, setColors] = fields.useMultiSelect(data.colors)

  return (
    <form>
      <select value={colors} onChange={(e) => setColors(Array.from(e.target.selectedOptions, (option) => option.value))}>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>
    </form>
  )
}
```

## API

```typescript
useTheme(): Theme
```

**Arguments**

None

**Returns**

The theme ("light" or "dark").

---

```typescript
useFetch<T>(fetchFn: () => Promise<T>, defaultValue?: T): [T, IFetchedStatus, () => void]
```

**Arguments**

`fetchFn`: The action to run. **/!\ Must be memoized to avoid potential infinite loops.**

`defaultValue`: The default value to return.

**Returns**

The value return by the action, the status of the action and a refresh function.

---

```typescript
usePagination(): IPagination
```

**Arguments**

None

**Returns**

The current page, the max page and a fonction to set the max page.

Actions to navigate: first, previous, next, last and goTo.

State of the current navigation: canPrevious and canNext.

---

```typescript
useText(input?: string): State<string>
```

**Arguments**

`input`: The input value. Default to "".

**Returns**

The value and the modifier (same as useState result).

---

```typescript
useBoolean(input?: boolean): State<boolean>
```

**Arguments**

`input`: The input value. Default to false.

**Returns**

The value and the modifier (same as useState result).

---

```typescript
useNumber(input?: number): State<number>
```

**Arguments**

`input`: The input value. Default to 0.

**Returns**

The value and the modifier (same as useState result).

---

```typescript
useSelect<T>(input: T): State<T>
```

**Arguments**

`input`: The input value. **/!\ Must be memoized to avoid infinite loops.**

**Returns**

The value and the modifier (same as useState result).

---

```typescript
useMultiSelect<T>(input?: T[]): State<T[]>
```

**Arguments**

`input`: The input value. Default to []. **/!\ Must be memoized to avoid infinite loops.**

**Returns**

The value and the modifier (same as useState result) and three additional modifiers to add, remove and toggle a particular value. Note that additional modifiers are based on `includes` and `filter` fonctions and will only work on primitive or referenced values.

## Contribute

Any PR is welcomed! Please be sure to meet following requirements when posting a PR:

- Unit tests pass and code coverage is over 90%
- Code conventions have been respected (`yarn lint` can help)
- Code is properly formatted (`yarn format` can help)
