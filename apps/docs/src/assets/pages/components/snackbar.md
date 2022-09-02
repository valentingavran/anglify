# Snackbar

<app-references
issues="https://github.com/valentingavran/anglify/labels/component%3A%20Snackbar"
bundle-size="https://bundlephobia.com/package/@anglify/components@latest"
material-design="https://material.io/components/snackbars"
w3c="https://www.w3.org/WAI/ARIA/apg/patterns/alert/" />

Snackbars inform users of a process that an app has performed or will perform. They appear temporarily, towards the bottom of the screen.
They shouldn't interrupt the user experience, and they don't require user input to disappear.

Snackbars contain a single line of text directly related to the operation performed. They may contain a text action, but no icons. You can
use them to display notifications.

## Examples

### Basic

If you use the simple `open()` method, receiving a return or close value is impossible. Instead, you can use the
`open$()` method, which returns an observable you can subscribe to.
<app-code-example component="snackbar" example="basic"></app-code-example>

### Indefinitely

If you set the timeout property to 0, the snackbar will stay open forever.
<app-code-example component="snackbar" example="indefinitely"></app-code-example>

## API

```typescript
import { SnackbarService } from '@anglify/components';
```

<app-inputs-table services="SnackbarService"></app-inputs-table>

<app-styling-table component="snackbar"></app-styling-table>
