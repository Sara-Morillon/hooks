# useFilter

`useFilter` offers an easy way to apply local filters to a set of local data.

## Example

```tsx
import { useFilter } from '@saramorillon/hooks'

interface IData {
  name: string
  age: number
}

const data: IData[] = [
  { name: 'Zola Ray', age: 30 },
  { name: 'Arlo Curtis', age: 32 },
]

function MyComponent() {
  const { rows, state, filter } = useFilter<IData>(data)

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
useFilter<T, F extends IFilter<T>>(data: T[], initialFilter?: Partial<F>, filterFunctions?: IFilterFunctions<T, F>): IFiltered<T, F>
```

### Arguments

`data: T[]` - the data that the state will by applied to.

`initialFilter?: Partial<F>` - the initial filters, default to an empty object.

`filterFunctions: IFilterFunctions<T, F>` - the functions to use to filter the data.

### Returns

`IFiltered<T, F>` - an object containing:

- `rows: T[]` - the filtered rows.
- `state: Partial<F>` - the filter state.
- `filter: <K extends keyof T>(field: K, value: F[K]) => void` - a function to apply a filter to a field.
