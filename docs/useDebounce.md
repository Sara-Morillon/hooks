# useDebounce

`useDebounce` allows to debounce a value or a function.

## Example

```tsx
import { useDebounce } from '@saramorillon/hooks'

function MyComponent() {
  const [search, setSearch] = useState('')
  const fetch = useCallback(() => fetchData(search), [search])
  const debouncedFetch = useDebounce(fetch)

  useEffect(() => {
    debouncedFetch()
  }, [debouncedFetch])

  return <input value={search} onChange={(e) => setSearch(e.target.value)} />
}
```

## API

```typescript
useDebounce<T>(value: T, delay?: number): T
```

### Arguments

`value: T` - the value to debounce, can be a function.

`delay?: number` - the delay of the debounce in ms, default to 500ms.

### Returns

`T` - the debounced value or function.
