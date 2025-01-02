# useDialog

`useDialog` offers helpers to show and hide native HTML dialogs.

## Example

```tsx
import { useDialog } from '@saramorillon/hooks'

function MyComponent() {
  const { ref, visible, show, hide } = useDialog()

  return (
    <>
      <button onClick={show}>Show dialog</button>
      <dialog ref={ref} onClick={hide}>
        {visible && (
          <div onClick={(e) => e.stopPropagation()}>
            <button onClick={hide}>Hide dialog</button>
          </div>
        )}
      </dialog>
    </>
  )
}
```

## API

```typescript
useDialog(): IDialog
```

### Arguments

None

### Returns

`IDialog` - An object containing:

- `ref: RefObject<HTMLDialogElement>` - the dialog ref
- `visible: boolean` - indicates weither the dialog is visible or not
- `show: () => void` - a function to show the dialog
- `hide: () => void` - a function to hide the dialog
