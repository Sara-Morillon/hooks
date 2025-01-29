# usePaginate

`usePaginate` offers an easy way to apply local pagination to a set of local data.

_:information_source: Pagination is 1-based._

## Example

```tsx
import { usePaginate } from '@saramorillon/hooks'

interface IData {
  name: string
  age: number
}

const data: IData[] = [
  { name: 'Zola Ray', age: 30 },
  { name: 'Arlo Curtis', age: 32 },
]

function MyComponent() {
  const { state, goTo, setLimit } = usePaginate<IData>(data)

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

      <Pagination pagination={state.pagination} goTo={goTo} setLimit={setLimit} total={data.length} />
    </>
  )
}
```

## API

```typescript
usePaginate<T>(data: T[], initialPagination?: IPaginationInfo): IPaginated<T>
```

### Arguments

`data: T[]` - the data that will be paginated.

`initialPagination?: IPaginationInfo` - an object containing:

- `index: number` - the initial page index, default to 1.
- `limit: number` - the initial page size, default to 10.

### Returns

`IPaginated<T>` - an object containing:

- `state: IPaginationInfo` - an object containing:
  - `index: number` - the page index.
  - `limit: number` - the page size.
- `goTo: (index: number) => void` - a function to change page index.
- `setLimit: (limit: number) => void` - a function to change page size.
