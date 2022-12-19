# Tooltip

<app-references
issues="https://github.com/valentingavran/anglify/labels/component%3A%20Tooltip"
material-design="https://material.io/components/tooltips"
w3c="https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/"/>

Tooltips display informative text when users hover over, focus on, or tap an element.

When activated, Tooltips display a text label identifying an element, such as a description of its function.

## Examples

### Different Positions

<app-code-example component="tooltip" example="different-positions"></app-code-example>

### Long text

<app-code-example component="tooltip" example="long-text"></app-code-example>

### Show & hide manually

<app-code-example component="tooltip" example="show-hide-manually"></app-code-example>

### Custom content

<app-code-example component="tooltip" example="custom-content"></app-code-example>

### Opening and closing delay

<app-code-example component="tooltip" example="delay"></app-code-example>

### Custom mounting point

By default, the tooltip is displayed as a sibling of the host container. But sometimes it might be necessary that the tooltip is mounted
in a different place. Like in this example directly in the document body.

To see the difference, open the browser inspector and examine the two items
<app-code-example component="tooltip" example="custom-mounting-point"></app-code-example>

## API

```typescript
import { TooltipDirective } from '@anglify/components';
```

<app-inputs-table directives="TooltipDirective"></app-inputs-table>

<app-styling-table component="tooltip"></app-styling-table>
