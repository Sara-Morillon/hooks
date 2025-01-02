# useFilteredRows

`useFilteredRows` offers an easy way to apply remote filters to a set of local data.

## Example

```tsx
import { useFilteredRows } from '@saramorillon/hooks'

interface IData {
  name: string
  age: number
}

const data: IData[] = [
  { name: 'Zola Ray', age: 30 },
  { name: 'Arlo Curtis', age: 32 },
]

function MyComponent({ filters }) {
  const rows = useFilteredRows<IData>(data, filters)

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
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
useFilteredRows<T, F extends IFilter<T>>(data: T[], filters?: Partial<F>, filterFunctions?: IFilterFunctions<T, F>): T[]
```

### Arguments

`data: T[]` - the data that will be filtered.

`filters?: Partial<F>` - the filters to apply to the data.

`filterFunctions: IFilterFunctions<T, F>` - the functions to use to filter the data.

### Returns

`T[]` - the filtered rows.
