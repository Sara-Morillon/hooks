# Hooks

Some utility hooks

## Usage

```typescript
import { useTheme } from '@saramorillon/hooks'

function MyComponent() {
  const theme = useTheme()
  return theme === 'dark' ? <Dark /> : <Light />
}
```
