# usePaginationState

`usePaginationState` offers an easy way to provide local pagination to a set of remote data.

_:information_source: Pagination is 1-based._

## Example

```tsx
import { usePaginationState } from '@saramorillon/hooks'

interface IData {
  name: string
  age: number
}

function MyComponent() {
  const { state, filter, sort, goTo, setLimit } = usePaginationState<IData>()
  const rows = fetchData(state)

  return (
    <>
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

      <Pagination pagination={state.pagination} goTo={goTo} setLimit={setLimit} />
    </>
  )
}
```

## API

```typescript
usePaginationState(initialPagination?: IPaginationInfo): IPaginationState
```

### Arguments

`initialPagination?: IPaginationInfo` - an object containing:

- `index: number` - the initial page index, default to 1.
- `limit: number` - the initial page size, default to 10.

### Returns

`IPaginationState` - an object containing:

- `state: IPaginationInfo` - an object containing:
  - `index: number` - the page index.
  - `limit: number` - the page size.
- `goTo: (index: number) => void` - a function to change page index.
- `setLimit: (limit: number) => void` - a function to change page size.
