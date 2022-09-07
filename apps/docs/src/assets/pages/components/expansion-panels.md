# Expansion Panels

<app-references
issues="https://github.com/valentingavran/anglify/labels/component%3A%20Expansion%20Panels"
bundle-size="https://bundlephobia.com/package/@anglify/components@latest"
material-design="https://material.io/archive/guidelines/components/expansion-panels.html#expansion-panels-behavior"
w3c="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/"/>

This component is useful for reducing vertical space with large amounts of information. The default functionality of the component is to
only display one expansion-panel body at a time; however, with the `multiple` property, the expansion-panel can remain open
until explicitly closed.

## Examples

### Basic

<app-code-example component="expansion-panels" example="basic"></app-code-example>

### Mandatory

<app-code-example component="expansion-panels" example="mandatory"></app-code-example>

### Multiple

<app-code-example component="expansion-panels" example="multiple"></app-code-example>

### Accordion

<app-code-example component="expansion-panels" example="accordion"></app-code-example>

## API

```typescript
import { ExpansionPanelsComponent, ExpansionPanelComponent } from '@anglify/components';
```

<app-inputs-table components="ExpansionPanelComponent, ExpansionPanelsComponent"></app-inputs-table>

<app-styling-table component="expansion-panels"></app-styling-table>
