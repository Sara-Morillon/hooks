# useDebounce

`useDebounce` allows to debounce a value or a function.

## Example

```tsx
import { useDebounce } from '@saramorillon/hooks'

function fetchData(): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve('value'), 200))
}

function MyComponent() {
  const debouncedFetch = useDebounce(fetchData)

  return (
    <>
      <button onClick={show}>Show dialog</button>
      <dialog ref={ref} onClick={hide}>
        {visible && (
          <div onClick={(e) => e.stopPropagation()}>
            <button onClick={hide}>Hide dialog</button>
          </div>
        )}
      </dialog>
    </>
  )
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
