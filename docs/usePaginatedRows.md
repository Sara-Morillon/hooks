# usePaginatedRows

`usePaginatedRows` offers an easy way to apply remote pagination to a set of local data.

## Example

```tsx
import { usePaginatedRows } from '@saramorillon/hooks'

interface IData {
  name: string
  age: number
}

const data: IData[] = [
  { name: 'Zola Ray', age: 30 },
  { name: 'Arlo Curtis', age: 32 },
]

function MyComponent({ tableState }) {
  const { rows, total } = usePaginatedRows<IData>(data, tableState)

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
usePaginatedRows<T>(data: T[], pagination?: IPaginationInfo): T[]
```

### Arguments

`data: T[]` - the data that will be paginated.

`state?: IInitialState<T, F>` - the pagination to apply to the data.

### Returns

`T[]` - the paginated rows.
