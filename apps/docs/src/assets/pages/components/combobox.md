# Combobox

<app-references
issues="https://github.com/valentingavran/anglify/labels/component%3A%20Combobox"
w3c="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"/>

## Playground

<app-combobox-playground></app-combobox-playground>

## Examples

### Chips

<app-code-example component="combobox" example="chips"></app-code-example>

### Item slot

<app-code-example component="combobox" example="items-slot"></app-code-example>

### Access value

**When using objects**: Notice the properties `itemTextKey` & `itemValueKey`. These properties can be used to control which field is displayed and which field contains the desired value. If `itemValueKey` is not passed, then the whole object will be returned when the respective item is selected.

**Primitive values:** In the second example you can see how the component behaves with primitive values (in this case strings). Here the previously mentioned input properties are no longer necessary, since no objects were passed.

<app-code-example component="combobox" example="access-value"></app-code-example>

### Control values manually

<app-code-example component="combobox" example="control-values-manually"></app-code-example>

### No data with chips

<app-code-example component="combobox" example="no-data-with-chips"></app-code-example>

## API

```typescript
import { ComboboxComponent, SlotDirective } from '@anglify/components';
```

<app-inputs-table components="ComboboxComponent"></app-inputs-table>

<app-styling-table component="combobox"></app-styling-table>
