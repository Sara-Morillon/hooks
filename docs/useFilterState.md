# useFilterState

`useFilterState` offers an easy way to provide local filters to a set of remote data.

## Example

```tsx
import { useFilterState } from '@saramorillon/hooks'

interface IData {
  name: string
  age: number
}

function MyComponent() {
  const { state, filter } = useFilterState<IData>()
  const rows = fetchData(state)

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>

        <tr>
          <td>
            <input value={state.name} onChange={(e) => filter('name', e.target.value)} />
          </td>
          <td>
            <input type="number" value={state.age} onChange={(e) => filter('age', e.target.value)} />
          </td>
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <tr>
            <td>{row.name}</td>
            <td>{row.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

## API

```typescript
useFilterState<T, F extends IFilter<T>>(initialFilters?: Partial<F>) : IFilterState<T, F>
```

### Arguments

`initialFilters?: Partial<F>` - the initial filters, default to an empty object.

### Returns

`IFilterState<T, F>` - an object containing:

- `state: IState<T, F>` - the filter state.
- `filter: <K extends keyof T>(field: K, value: F[K]) => void` - a function to apply a filter to a field.
