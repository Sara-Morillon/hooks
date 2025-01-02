# useDrag/useDrop

`useDrag` and `useDrop` offer helpers to drag and drop elements.

## Example

```tsx
import { useDrag, useDrop } from '@saramorillon/hooks'

function MyList() {
  const [isDragged, events] = useDrag()

  const onDrop = useCallback((source: string, target: string) => {
    console.log(`Dragged ${source} on ${target}`)
  }, [])

  return (
    <ul>
      <MyListSlot item="Item1" onDrop={onDrop} />
      <MyListSlot item="Item2" onDrop={onDrop} />
      <MyListSlot item="Item3" onDrop={onDrop} />
    </ul>
  )
}

function MyListSlot({ item, onDrop }: { item: string; onDrop: (source: string, target: string) => void }) {
  const onMove = useCallback((source: string) => onDrop(source, item), [item])
  const [isOver, events] = useDrop(onMove)

  return (
    <div {...events} style={{ backgroundColor: isOver ? 'yellow' : 'transparent' }}>
      <MyListItem item={item} />
    </div>
  )
}

function MyListItem({ item }: { item: string }) {
  const [isDragged, events] = useDrag(item)

  return (
    <div draggable {...events} style={{ color: isDragged ? 'red' : 'blue' }}>
      {item}
    </div>
  )
}
```

## API

```typescript
useDrag(source: string): [boolean, IDragEvents];
useDrop(onDrop: (source: string) => void): [boolean, IDropEvents];
```

### Arguments

`source: string` - the source element. Don't forget to memoize stringified JSON objects.

`onDrop: (source: string) => void` - the drop action.

### Returns

An array containing:

- `isDragged: boolean` - indicates weither the item is currently dragged.
- `IDragEvents` - an object containing events to attach to the draggable item.

An array containing:

- `isOver: boolean` - indicates weither a dragged item is currently over the target.
- `IDropEvents` - an object containing events to attach to the target.
