# Menu

<app-references
issues="https://github.com/valentingavran/anglify/labels/component%3A%20Menu"
material-design="https://material.io/components/menus"
bundle-size="https://bundlephobia.com/package/@anglify/components@latest"
w3c="https://www.w3.org/WAI/ARIA/apg/patterns/menu/"/>

A menu displays a list of choices on a temporary surface. They appear when users interact with a button, action, or other control.

## Examples

### Show & hide manually

<app-code-example component="menu" example="show-hide-manually" hide-overflow="false"></app-code-example>

### Different positions

<app-code-example component="menu" example="position" hide-overflow="false"></app-code-example>

### Offset

<app-code-example component="menu" example="offset" hide-overflow="false"></app-code-example>

### Flip

By default, the menu is offset if it cannot be displayed completely. However, if you set the `flip` property, then the menu will open on the opposite side, if there is not enough space on the actual side.
<app-code-example component="menu" example="flip" hide-overflow="false"></app-code-example>

### Open on hover

<app-code-example component="menu" example="open-on-hover" hide-overflow="false"></app-code-example>

### With tooltip

<app-code-example component="menu" example="with-tooltip" hide-overflow="false"></app-code-example>

### Close on click

<app-code-example component="menu" example="close-on-click" hide-overflow="false"></app-code-example>

### Trap Focus

Use the Tab key and tab through the menu after it has been opened. You will see that you cannot exit the menu with the Tab key.
<app-code-example component="menu" example="trap-focus" hide-overflow="false"></app-code-example>

## API

```typescript
import { MenuComponent, SlotDirective } from '@anglify/components';
```

<app-inputs-table components="MenuComponent"></app-inputs-table>

<app-styling-table component="menu"></app-styling-table>
