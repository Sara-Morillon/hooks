# useTableRows

`useTableRows` offers an easy way to apply remote filters, sort and pagination to a set of local data.

## Example

```tsx
import { useTableRows } from '@saramorillon/hooks'

interface IData {
  name: string
  age: number
}

const data: IData[] = [
  { name: 'Zola Ray', age: 30 },
  { name: 'Arlo Curtis', age: 32 },
]

function MyComponent({ tableState }) {
  const { rows, total } = useTableRows<IData>(data, tableState)

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
useTableRows<T, F extends IFilter<T>>(data: T[], state: IInitialState<T, F>, options?: ITableOptions<T, F>): ITableRows<T>
```

### Arguments

`data: T[]` - the data that will be filtered, sorted and paginated.

`state?: IInitialState<T, F>` - the filters, sort and pagination to apply to the data.

`options?: ITableOptions<T, F>` - an object containing:

- `filterFunctions: IFilterFunctions<T, F>` - the functions to use to filter the data.

### Returns

`ITableRows<T>` - an object containing:

- `rows: T[]` - the filtered, sorted and paginated rows.
- `total: number` - the total number of rows available (total of filtered rows).
