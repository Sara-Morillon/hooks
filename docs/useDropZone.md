# useDropZone

`useDropZone` offers helpers to drop files in the document.

## Example

```tsx
import { useDropZone } from '@saramorillon/hooks'

function MyList() {
  const onDrop = useCallback((files: FileList) => {
    console.log(`Dropped ${files.length} files`)
  }, [])

  const [isOver, events] = useDropZone(onDrop)

  return (
    <div {...events} style={{ backgroundColor: isOver ? 'yellow' : 'transparent' }}>
      Drop files here!
    </div>
  )
}
```

## API

```typescript
useDropZone(onDrop: (files: FileList) => void): [boolean, IDropZoneEvents];
```

### Arguments

`onDrop: (files: FileList) => void` - the drop action.

### Returns

An array containing:

- `isOver: boolean` - indicates weither files are currently over the target.
- `IDropZoneEvents` - an object containing events to attach to the target.
