# List

<app-references
issues="https://github.com/valentingavran/anglify/labels/component%3A%20List"
material-design="https://material.io/components/lists"/>

Lists are a continuous group of text or images. They are composed of items containing primary and supplemental actions, which are
represented by icons and text.

## Examples

### Standard Group

<app-code-example component="list" example="groups"></app-code-example>

### Mandatory Item

<app-code-example component="list" example="mandatory"></app-code-example>

### Multiple Selectable Items

<app-code-example component="list" example="multiple"></app-code-example>

### Multiple Mandatory Selectable Items

<app-code-example component="list" example="multiple-mandatory"></app-code-example>

### Multiple Selectable Items with Actions

<app-code-example component="list" example="actions"></app-code-example>

### List Groups

<app-code-example component="list" example="list-group"></app-code-example>

## API

```typescript
import {
  ListComponent,
  ListGroupComponent,
  ListItemComponent,
  ListItemGroupComponent,
  ListItemTitleComponent,
  ListItemDescriptionComponent,
  SlotDirective,
} from '@anglify/components';
```

<app-inputs-table components="ListComponent, ListGroupComponent, ListItemComponent, ListItemGroupComponent, ListItemTitleComponent, ListItemDescriptionComponent"></app-inputs-table>

<app-styling-table component="list"></app-styling-table>
