# Text Field

<app-references
issues="https://github.com/valentingavran/anglify/labels/component%3A%20Text%20Field"
material-design="https://material.io/components/text-fields"/>

Text fields allow users to enter text into a UI. They typically appear in forms and dialogs.

## Playground

<app-text-field-playground></app-text-field-playground>

## Examples

### Placeholder

<app-code-example component="text-field" example="placeholder"></app-code-example>

### Without label

<app-code-example component="text-field" example="without-label"></app-code-example>

### Using label slot

<app-code-example component="text-field" example="label-slot"></app-code-example>

### Persistent placeholder

<app-code-example component="text-field" example="persistent-placeholder"></app-code-example>

### Hint

<app-code-example component="text-field" example="hint"></app-code-example>

### Long label and long hint

Long labels and hints are not recommended, as form field descriptions must be short and crisp. However, if texts become too long, which
can quickly be the case on mobile devices, then they will be truncated and ellipsis will be added at the end.
<app-code-example component="text-field" example="long-hint-and-long-label"></app-code-example>

### Dense

<app-code-example component="text-field" example="dense"></app-code-example>

### Disabled

<app-code-example component="text-field" example="disabled"></app-code-example>

### Readonly

<app-code-example component="text-field" example="readonly"></app-code-example>

### Icons

<app-code-example component="text-field" example="icons"></app-code-example>

### Counter

<app-code-example component="text-field" example="counter"></app-code-example>

### Validation

#### Using error property

<app-code-example component="text-field" example="manual-error"></app-code-example>

#### Using reactive forms

<app-code-example component="text-field" example="reactive-forms-validation"></app-code-example>

#### Set the server error manually if necessary.

In this example, the password for the passed username is incorrect. After 2 seconds the server sends back an error message which is
displayed below the form field.
<app-code-example component="text-field" example="server-error-handling"></app-code-example>

#### Using native input validation

<app-code-example component="text-field" example="native-input-validation"></app-code-example>

#### Validation with disabled fields

<app-code-example component="text-field" example="disabled-validation"></app-code-example>

## API

```typescript
import { TextFieldComponent, InputDirective, SlotDirective } from '@anglify/components';
```

<app-inputs-table components="TextFieldComponent" directives="InputDirective"></app-inputs-table>
