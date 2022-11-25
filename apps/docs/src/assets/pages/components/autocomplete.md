# Autocomplete

<app-references
issues="https://github.com/valentingavran/anglify/labels/component%3A%20Autocomplete"
bundle-size="https://bundlephobia.com/package/@anglify/components@latest"/>

## Playground

<app-autocomplete-playground></app-autocomplete-playground>

## Examples

### Chips

<app-code-example component="autocomplete" example="chips" hide-overflow="false"></app-code-example>

### Item slot

<app-code-example component="autocomplete" example="items-slot" hide-overflow="false"></app-code-example>

### Access value

**When using objects**: Notice the properties `itemTextKey` & `itemValueKey`. These properties can be used to control which field is displayed and which field contains the desired value. If `itemValueKey` is not passed, then the whole object will be returned when the respective item is selected.

**Primitive values:** In the second example you can see how the component behaves with primitive values (in this case strings). Here the previously mentioned input properties are no longer necessary, since no objects were passed.

<app-code-example component="autocomplete" example="access-value" hide-overflow="false"></app-code-example>

### Control values manually

<app-code-example component="autocomplete" example="control-values-manually" hide-overflow="false"></app-code-example>

### No data with chips

<app-code-example component="autocomplete" example="no-data-with-chips" hide-overflow="false"></app-code-example>

## API

```typescript
imports { AutocompleteComponent, SlotDirective } from '@anglify/components';
```

<app-inputs-table components="AutocompleteComponent"></app-inputs-table>

<app-styling-table component="autocomplete"></app-styling-table>
