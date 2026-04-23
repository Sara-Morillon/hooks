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
  const { submit, values, setValue } = useForm(save, data)

  return (
    <form onSubmit={submit}>
      <input value={values.name} onChange={(e) => setValue('name', e.target.value)} />
      <button type='submit'>Submit</button>
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
- `setValues: Dispatch<SetStateAction<T>>` - a function to completely override the form values
- `setValue: <K extends keyof T>(name: K, value: T[K]) => void` - a function to change the values of the form using a plain value.
- `updateValue: <K extends keyof T>(name: K, value: Updater<T[K]>) => void` - a function to update the values of the form using an update function.
- `submit: (e: FormEvent) => void` - a function for submitting a form.
- `error?: unknown` - contains a potential error thrown by the save function.
