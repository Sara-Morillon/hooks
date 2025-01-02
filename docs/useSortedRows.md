# useSortedRows

`useSortedRows` offers an easy way to apply remote sort to a set of local data.

## Example

```tsx
import { useSortedRows } from '@saramorillon/hooks'

interface IData {
  name: string
  age: number
}

const data: IData[] = [
  { name: 'Zola Ray', age: 30 },
  { name: 'Arlo Curtis', age: 32 },
]

function MyComponent({ tableState }) {
  const { rows, total } = useSortedRows<IData>(data, tableState)

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
useSortedRows<T>(data: T[], sort?: ISortItem<T>[]): T[]
```

### Arguments

`data: T[]` - the data that will be sorted.

`sort?: ISortItem<T>[]` - the sort to apply to the data.

### Returns

`T[]` - the sorted rows.
