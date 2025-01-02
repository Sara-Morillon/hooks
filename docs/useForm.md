# useForm

`useForm` offers helpers to handle forms.

## Example

```tsx
import { useForm } from '@saramorillon/hooks'

type Data {
  name: string
}

function MyComponent({ data }: { data: Data }) {
  const save = useCallback((values: Data) => {
    console.log(values)
  }, [])
  const { values, submit, onChange, reset } = useForm(save, data)

  return (
    <form onSubmit={submit} onReset={reset}>
      <input value={values.name} onChange={(e) => onChange('name', e.target.value)} />
      <button type='submit'>Submit</button>
      <button type='reset'>Reset</button>
    </form>
  )
}
```

## API

```typescript
useForm<T>(props: IFormProps<T>): IForm<T>
```

### Arguments

`save: (values: T) => void` - the save action. **:warning: Must be memoized to avoid potential infinite loops.**

`initialValues: T` - the initial values.

### Returns

An object containing:

- `values: T` - the form values.
- `onChange: <K extends keyof T>(name: K, value: T[K]) => void` - a function to change the values of the form.
- `submit: (e: FormEvent) => void` - a function for submitting a form.
- `reset: () => void` - a function to reset the form to its initial values.
- `loading: boolean` - indicates when the form is being submitted.
- `error?: unknown` - contains a potential error thrown by the save function.
