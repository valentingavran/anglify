# Checkbox

<app-references
issues="https://github.com/valentingavran/anglify/labels/component%3A%20Checkbox"
material-design="https://material.io/components/checkboxes"
bundle-size="https://bundlephobia.com/package/@anglify/components@latest"
w3c="https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/"/>

Checkboxes allow users to select one or more items from a set. Checkboxes can turn an option on or off. Use checkboxes to:

- Select one or more options from a list
- Present a list containing sub-selections
- Turn an item on or off in a desktop environment

## Examples

### Default Checkboxes

<app-code-example component="checkbox" example="appearances"></app-code-example>

### Indeterminate Checkboxes

<app-code-example component="checkbox" example="indeterminate"></app-code-example>

### Custom Icon Checkboxes

<app-code-example component="checkbox" example="custom-icons"></app-code-example>

### Link inside label

It is important that you add the `ClickStopPropagationDirective` to your clickable element inside the label.
<app-code-example component="checkbox" example="label"></app-code-example>

### Different Sizes

<app-code-example component="checkbox" example="sizes"></app-code-example>

### Usage with NgModel, Control and Forms

<app-code-example component="checkbox" example="forms"></app-code-example>

## API

```typescript
import { CheckboxComponent, SlotDirective } from '@anglify/components';
```

<app-inputs-table components="CheckboxComponent"></app-inputs-table>

<app-styling-table component="checkbox"></app-styling-table>
