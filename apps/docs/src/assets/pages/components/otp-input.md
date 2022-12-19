# OTP Input

<app-references
issues="https://github.com/valentingavran/anglify/labels/component%3A%20OTP%20Input"/>

The OTP input is used for MFA procedure of authenticating users by a one-time password.

## Examples

### Basic

<app-code-example component="otp-input" example="basic"></app-code-example>

### Complete Event

As soon as the last number is filled in, the `complete` event is fired.
<app-code-example component="otp-input" example="completed-event"></app-code-example>

### Reactive Forms

<app-code-example component="otp-input" example="reactive-forms"></app-code-example>

### Hidden Input

Type something into the OTP input and you will see that instead of the actual values, points are displayed.
<app-code-example component="otp-input" example="hidden-input"></app-code-example>

## API

```typescript
import { OtpInputComponent } from '@anglify/components';
```

<app-inputs-table components="OtpInputComponent"></app-inputs-table>

<app-styling-table component="otp-input"></app-styling-table>
