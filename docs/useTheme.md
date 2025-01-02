# useTheme

`useTheme` returns 'dark' or 'light' according to prefers-color-scheme media query.

It also changes document root color-scheme accordingly.

## Example

```tsx
import { useTheme } from '@saramorillon/hooks'

function MyComponent() {
  const theme = useTheme()
  return theme === 'dark' ? <Dark /> : <Light />
}
```

## API

```typescript
useTheme(): Theme
```

### Arguments

None

### Returns

`Theme` - the theme ("light" or "dark").
