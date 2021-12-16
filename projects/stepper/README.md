# Anglify Stepper

> An Angular stepper based on RxJS, which provides various events to make development easier.
> This library has no dependencies.

It includes a ready to use stepper implementation as well as the possibility to create your own stepper using the
available services (similar to the Angular Material Stepper).

## Table of contents

* [Installation](#installation)
* [Usage](#usage)
* [API](#api)

## Installation

```shell
npm install @anglify/stepper
```

`app.module.ts ` (or any other module)

```typescript
import { StepperModule } from '@anglify/stepper';

@NgModule({
  // ...
  imports: [
    // ...
    BrowserAnimationsModule, // Required for stepper animations
    StepperModule, // Module that contains the stepper
  ],
})
export class AppModule {
}
```

## Usage

`app.component.html`

```html

<anglify-stepper #stepper>
  <ng-template anglifyStep label="First step">
    First step content
    <button (click)="stepper.next()">Continue</button>
  </ng-template>
  <ng-template anglifyStep label="Second step" [valid]="stepValid">
    Valid:<input type="checkbox" [(ngModel)]="stepValid" /><br />
    <button (click)="stepper.previous()">Back</button>
    <button anglifyStepperNext>Continue</button>
  </ng-template>
  <ng-template anglifyStep label="Third step">
    Third step content
    <button anglifyStepperPrevious>Back</button>
    <button anglifyStepperNext>Continue</button>
  </ng-template>
</anglify-stepper>

```

`app.component.ts`

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public stepValid = false;
}
```

## API

### anglify-stepper

#### Props

| Name               | Type                       | Default  | Description                                                                                    |
|--------------------|----------------------------|----------|------------------------------------------------------------------------------------------------|
| stepConnectionLine | `boolean`                  | true     | Activates or deactivates the connection line of the stepper, which is visible at the left edge |
| headerNavigation   | `boolean`                  | true     | Activates or deactivates the navigation via the step headers                                   |
| orientation        | `vertical` or `horizontal` | vertical | Sets the orientation of the stepper                                                            |

#### Events

| Name              | Description                                 | Emits                          |
|-------------------|---------------------------------------------|--------------------------------|
| onPrevious        | Emitted when the previous step is opened    |                                |
| onNext            | Emitted when the next step is opened        | `"horizontal"` or `"vertical"` |
| orientationChange | Emitted when the orientation changes        |                                |
| reset             | Emitted when the stepper is reset           |                                |
| stepChange        | Emitted when the step selected step changes | `Step`                         |

### anglifyStep

#### Props

| Name  | Type    | Default | Description                                                                                                                                     |
|-------|---------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| label | string  | -       | Label of the step, that is displayed in the stepper header                                                                                      |
| valid | boolean | true    | With this field you can validate the current step. If the step is valid, you can navigate to the following steps. Otherwise it is not possible. |

#### Events

| Name           | Description                                        | Emits     |
|----------------|----------------------------------------------------|-----------|
| selectedChange | Emitted when the step gets selected or unselected  | `boolean` |
| validChange    | Emitted when the valid state of the step changes   | `boolean` |
| visitedChange  | Emitted when the visited state of the step changes | `boolean` |

### anglifyStepperPrevious

This directive can be placed on a button, for example. After a click the stepper automatically goes to the previous step

```html

<anglify-stepper>
  ...
  <ng-template anglifyStep label="Step 2">
    Content 2
    <button anglifyStepperPrevious>Back</button>
  </ng-template>
</anglify-stepper>
```

Alternatively you can call the previous method of a stepper reference:

```html

<anglify-stepper #stepper>
  ...
  <ng-template anglifyStep label="Step label">
    Content x
    <button (click)="stepper.previous()">Back</button>
  </ng-template>
</anglify-stepper>
```

In this case you can place the button also outside the stepper.

### anglifyStepperNext

This directive can be placed on a button, for example. After a click the stepper automatically goes to the next step

```html

<anglify-stepper>
  <ng-template anglifyStep label="Step label">
    Content x
    <button anglifyStepperNext>Continue</button>
  </ng-template>
  ...
</anglify-stepper>
```

Alternatively you can call the next method of a stepper reference:

```html

<anglify-stepper #stepper>
  <ng-template anglifyStep label="Step label">
    Content x
    <button (click)="stepper.next()">Continue</button>
  </ng-template>
  ...
</anglify-stepper>
```

In this case you can place the button also outside the stepper.
