# useSortState

`useSortState` offers an easy way to provide local sort to a set of remote data.

## Example

```tsx
import { useSortState } from '@saramorillon/hooks'

interface IData {
  name: string
  age: number
}

function MyComponent() {
  const { state, filter, sort, goTo, setLimit } = useSortState<IData>()
  const rows = fetchData(state)

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
useSortState<T>(initialSort?: ISortItem<T>[]): ISortState<T>
```

### Arguments

`initialSort?: ISortItem<T>[]` - the initial sort, default to an empty array.

### Returns

`ISortState<T>` - an object containing:

- `state: ISortItem<T>[]` - the sort state, as an ordered list
- `sort: (field: keyof T, dir?: 'asc' | 'desc') => void` - a function to apply a sort to a field
