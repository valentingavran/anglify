# Breakpoints

Breakpoints are the key points at which the layout changes to better fit a screen size. Anglify natively supports the breakpoints listed below, which can be used via `SCSS mixins` or programmatically using the `BreakpointObserverService`.

| Device      | Code |  Type                  | Range               |
| ----------- | ---- | ---------------------- | ------------------- |
| Extra small | xs   |  Small to large phone  | 0 < x < 600px       |
| Small       | sm   | Small to medium tablet | 600px < x < 960px   |
| Medium      | md   | Large tablet to laptop | 960px < x < 1280px  |
| Large       | lg   | Desktop                | 1280px < x < 1920px |
| Extra large | xl   | 4k and ultra-wide      | 1920px < x          |

## SCSS Breakpoints

```scss
@use 'node_modules/@anglify/components/styles/mixins/breakpoints.scss' as *;
:host {
  background-color: red; // red on xs and sm devices

  @include md-and-up {
    background-color: green; // green on medium sized devices
  }

  @include lg-and-up {
    background-color: blue; // blue on large devices and xl devices
  }
}
```

## Breakpoint Observer Service

The `BreakpointObserverService` can be used to programmatically control aspects of your application based on the viewport size.
In the following example, the Anglify Navigation Drawer is displayed as a modal drawer for the viewport sizes `xs`, `sm`, and `md`, and as a default drawer for all other sizes (`lg` and `xl`).

```html
<anglify-navigation-drawer [mode]="(breakpointService.mdAndDown$ | async) ? 'modal' : 'standard'"> ... </anglify-navigation-drawer>
```

```typescript
import { BreakpointObserverService } from '@anglify/components';

@Component({...})
export class MyComponent {

public constructor(private breakpointObserverService: BreakpointObserverService){}

}

```

You can subscribe yourself to the following observables provided by the **BreakpointObserverService**:

- smAndDown$
- sm$
- smAndUp$
- mdAndDown$
- md$
- mdAndUp$
- lgAndDown$
- lg$
- lgAndUp$

Look at the table above to find out at which screen sizes the respective observable fires true or false.

## Configuration

Of course you can also overwrite the default breakpoints. To avoid confusions, we recommend you to do this globally.

You have to configure the `BreakpointObserverService` on the one hand and the `SCSS mixins` on the other hand. Here again: It is best to configure both things, otherwise it will lead to confusion.

### Configuring the BreakpointObserverService

```typescript
import { BREAKPOINT_SETTINGS } from '@anglify/components';

@NgModule({
  // ...
  providers: [
    {
      provide: BREAKPOINT_SETTINGS,
      useValue: {
        xl: 1920,
        lg: 1440,
        md: 720,
        sm: 480,
        xs: 0,
      },
    },
    // ...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Configuring the SCSS Mixins

First you must create a new SCSS file globally. Then you have to forward the SCSS module that contains the Anglify breakpoints and at the very end you have to configure the new breakpoints.

```scss
@forward '../../../libs/anglify/src/styles/mixins/breakpoints.scss' with (
  $grid-breakpoints: (
    'xs': 0,
    'sm': 480px,
    'md': 720px,
    'lg': 1440px,
    'xl': 1920px,
  )
);
```

From now on you have to import your own breakpoints module at the needed places.
