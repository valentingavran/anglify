# Dialog

<app-references
issues="https://github.com/valentingavran/anglify/labels/component%3A%20Dialog"
material-design="https://material.io/components/dialogs"
bundle-size="https://bundlephobia.com/package/@anglify/components@latest"
w3c="https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/"/>

A dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision. Dialogs
disable all app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.

Dialogs are purposefully interruptive, so they should be used sparingly.

## Examples

### Simple

You can open the Anglify dialog simply with the `open()` method. But this way you can't get any values from the dialog back.
<app-code-example component="dialog" example="simple"></app-code-example>

### Complex

If you want the dialog to return data to you, use the `open$()` method. This method returns an observable which emits on various dialog events.
<app-code-example component="dialog" example="complex"></app-code-example>

## API

```typescript
import { DialogService } from '@anglify/components';
```

<app-inputs-table services="DialogService"></app-inputs-table>

<app-styling-table component="dialog"></app-styling-table>
