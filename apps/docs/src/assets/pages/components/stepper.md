# Stepper

<app-references
issues="https://github.com/valentingavran/anglify/labels/component%3A%20Stepper"
material-design="https://material.io/archive/guidelines/components/steppers.html#steppers-usage"
bundle-size="https://bundlephobia.com/package/@anglify/components@latest"/>

Steppers display progress through a sequence of logical and numbered steps. They may also be used for navigation. Steppers may display a
transient feedback message after a step is saved.

The individual Anglify Steps are loaded lazily.

## Examples

### Vertical Stepper

<app-code-example component="stepper" example="vertical-stepper"></app-code-example>

### Horizontal Stepper

<app-code-example component="stepper" example="horizontal-stepper"></app-code-example>

### Custom visited icon

Jump to the next step so that you can see the custom icon in the indicator. However, you don't necessarily have to pass Anglify symbols.
You can just as easily pass SVGs or completely different content.
<app-code-example component="stepper" example="custom-icon"></app-code-example>

## API

```typescript
import { StepperComponent, StepDirective, StepperPreviousDirective, StepperNextDirective } from '@anglify/components';
```

<app-inputs-table components="StepperComponent" directives="StepperPreviousDirective, StepperNextDirective"></app-inputs-table>

<app-styling-table component="stepper"></app-styling-table>
