# Button

<app-references 
issues="https://github.com/valentingavran/anglify/labels/component%3A%20Button"
material-design="https://material.io/components/buttons"
w3c="https://www.w3.org/WAI/ARIA/apg/patterns/button/"/>

Buttons communicate actions that users can take. They are typically placed throughout your UI, in places like: Dialogs, Modal windows,
Forms, Cards & Toolbars.

## Examples

### Appearances

<app-code-example component="button" example="appearances"></app-code-example>

### Block

<app-code-example component="button" example="block"></app-code-example>

### With icon

<app-code-example component="button" example="with-icon"></app-code-example>

### Fab

<app-code-example component="button" example="fab"></app-code-example>

### Disabled

<app-code-example component="button" example="disabled"></app-code-example>

### Loading

Using the `loading` prop, you can notify a user that there is processing taking place. You can change the loading element by using the `loader` slot.

Click the respective buttons in this example to toggle the loading states on and off.
<app-code-example component="button" example="loading"></app-code-example>

## API

```typescript
import { ButtonComponent } from '@anglify/components';
```

<app-inputs-table components="ButtonComponent"></app-inputs-table>

<app-styling-table component="button"></app-styling-table>
