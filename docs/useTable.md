# useTable

`useTable` offers an easy way to apply local filters, sort and pagination to a set of local data.

_:information_source: Pagination is 0 based._

## Example

```tsx
import { useTable } from '@saramorillon/hooks'

interface IData {
  name: string
  age: number
}

const data: IData[] = [
  { name: 'Zola Ray', age: 30 },
  { name: 'Arlo Curtis', age: 32 },
]

function MyComponent() {
  const { rows, total, state, filter, sort, goTo, setLimit } = useTable<IData>(data)

  return (
    <>
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

      <Pagination pagination={state.pagination} goTo={goTo} setLimit={setLimit} total={total} />
    </>
  )
}
```

## API

```typescript
useTable<T, F extends IFilter<T>>(data: T[], initialState?: IInitialState<T, F>, options?: ITableOptions<T, F>): ITable<T, F>
```

### Arguments

`data: T[]` - the data that will be filtered, sorted and paginated.

`initialState?: IInitialState<T, F>` - the initial state of the table.

`options?: ITableOptions<T, F>` - an object containing:

- `filterFunctions: IFilterFunctions<T, F>` - functions to use to filter the data.

### Returns

`ITable<T, F>` - an object containing:

- `rows: T[]` - the filtered, sorted and paginated rows.
- `total: number` - the total number of rows available (total of filtered rows).
- `state: IState<T, F>` - an object containing:
  - `filter: Partial<F>` - the filter state.
  - `sort: ISort<T>[]` - the sort state, as an ordered list.
  - `sortDir: { [key in keyof T]?: 'asc' | 'desc' }` - the sort state, as an unordered object.
  - `pagination: IPaginationInfo` - an object containing:
    - `index: number` - the page index.
    - `limit: number` - the page size.
- `filter: <K extends keyof T>(field: K, value: F[K]) => void` - a function to apply a filter to a field.
- `sort: (field: keyof T, dir?: 'asc' | 'desc') => void` - a function to apply a sort to a field.
- `goTo: (index: number) => void` - a function to change page index.
- `setLimit: (limit: number) => void` - a function to change page size.
