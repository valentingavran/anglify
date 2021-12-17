# Anglify Tooltip

## Installation

```shell
npm install @anglify/tooltip
```

`app.module.ts ` (or any other module)

```typescript
/// ...
import {TooltipModule} from "@anglify/tooltip";

@NgModule({
  imports: [
    // ...
    TooltipModule // Import Tooltip Module
  ],
})
export class AppModule {
}
```

`styles.scss`

```scss
@import "~@anglify/tooltip/styles/tooltip";
```

## Usage

```html

<div anglifyTooltip="Tooltip text">
  Some content
</div>
```

**This is how you can change the tooltip position:**

```html

<div anglifyTooltip="Tooltip text" position="RIGHT">
  Some content
</div>
```

## SCSS Variables

| Name                                  | Default                |
|---------------------------------------|------------------------|
| `$tooltip-background-color`           | `#616161 !default`     |
| `$tooltip-text-color`                 | `white !default`       |
| `$tooltip-opacity`                    | `.9 !default`          |
| `$tooltip-border-radius`              | `4px !default`         |
| `$tooltip-font-size`                  | `14px !default`        |
| `$tooltip-transition-timing-function` | `ease-in-out !default` |
| `$tooltip-transition-duration`        | `150ms !default`       |
| `$tooltip-padding`                    | `5px 16px !default`    |
| `$tooltip-max-width`                  | `150px !default`       |
| `$tooltip-text-alignment`             | `center !default`      |

If you want to overwrite the default values of the variables, do it before importing the styles from the tooltip
component.

`styles.scss`

```scss
$tooltip-background-color: green;
// ...

@import "~@anglify/tooltip/styles/tooltip";
```
