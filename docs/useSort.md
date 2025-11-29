# useSort

`useSort` offers an easy way to apply local sort to a set of local data.

## Example

```tsx
import { useSort } from '@saramorillon/hooks'

interface IData {
  name: string
  age: number
}

const data: IData[] = [
  { name: 'Zola Ray', age: 30 },
  { name: 'Arlo Curtis', age: 32 },
]

function MyComponent() {
  const { state, sort } = useSort<IData>(data)

  return (
    <table>
      <thead>
        <tr>
          <th>
            Name <SortToggle dir={state.sortDir.name} onSort={(dir) => sort('name', dir)} />
          </th>
          <th>
            Age <SortToggle dir={state.sortDir.age} onSort={(dir) => sort('age', dir)} />
          </th>
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
useSort<T>(data: T[], initialSort?: ISortItem<T>[]): ISorted<T>
```

### Arguments

`data: T[]` - the data that will be sorted.

`initialSort?: ISortItem<T>[]` - the initial sort, default to an empty array.

### Returns

`ISorted<T>` - an object containing:

- `rows: T[]` - the sorted rows.
- `state: ISortItem<T>[][]` - the sort state, as an ordered list.
- `sort: (field: keyof T, dir?: 'asc' | 'desc') => void` - a function to apply a sort to a field.
