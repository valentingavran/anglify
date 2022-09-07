# Icon Fonts

Anglify comes bootstrapped with support for Material Design Icons, Material Icons, Font Awesome 4 and Font Awesome 5. By default,
applications will default to use [Material Design Icons](https://materialdesignicons.com/).

## Usage

To change your font library you have to provide the `IconSettings` token.

```typescript
import { IconSettings, ICON_SETTINGS } from '@anglify/components';

@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    {
      provide: ICON_SETTINGS,
      useFactory: (): IconSettings => ({
        defaultSet: 'fa5', // 'fa4' | 'fa5' | 'md' | 'mdi' | 'custom' | 'faSVG' | 'mdiSVG'
        ...
      }),
    },
    ...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Afterwards the respective icon font must be imported. In the next section the installation process of each icon font is described
separately.

## Installing icon fonts

You are required to include the specified icon library (even if using default). This can be done by including a CDN link or importing the
icon library into your application.

When changing icon fonts, make sure that you remove the old imports, as this can improve the performance of the website.

### Material Design Icons

This is the default icon font for Anglify. You can include it through a CDN:

```html
<!-- index.html -->
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet" />
```

You can then provide the SettingsToken, but this is not necessary as `mdi` is used by default.

```typescript
// app.module.ts
import { IconSettings, ICON_SETTINGS } from '@anglify/components';

@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    {
      provide: ICON_SETTINGS,
      useFactory: (): IconSettings => ({
        defaultSet: 'mdi',
        ...
      }),
    },
    ...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

```html
<anglify-icon icon="mdi-theme-light-dark"></anglify-icon>
```

### Material Icons

Installation is the same as the above.

```html
<!-- index.html -->
<link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet" />
```

```typescript
// app.module.ts
import { IconSettings, ICON_SETTINGS } from '@anglify/components';

@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    {
      provide: ICON_SETTINGS,
      useFactory: (): IconSettings => ({
        defaultSet: 'md',
        ...
      }),
    },
    ...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Font Awesome 4

Same as above. Installing FontAwesome through cdn is the easiest way to check it out within your project:

```html
<!-- index.html -->
<link href="https://cdn.jsdelivr.net/npm/font-awesome@4.x/css/font-awesome.min.css" rel="stylesheet" />
```

```typescript
// app.module.ts
import { IconSettings, ICON_SETTINGS } from '@anglify/components';

@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    {
      provide: ICON_SETTINGS,
      useFactory: (): IconSettings => ({
        defaultSet: 'fa4',
        ...
      }),
    },
    ...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

```html
<anglify-icon icon="fa fa-user-circle"></anglify-icon>
```

<h3>Font Awesome 5</h3>

The easiest way to get started with FontAwesome is to use a cdn.

```html
<!-- index.html -->
<link rel="preload" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" as="style" />
```

```typescript
// app.module.ts
import { IconSettings, ICON_SETTINGS } from '@anglify/components';

@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    {
      provide: ICON_SETTINGS,
      useFactory: (): IconSettings => ({
        defaultSet: 'fa5',
        ...
      }),
    },
    ...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

<h3>Material Design JS SVG Icons</h3>

Use the SVG paths as designated in <a href="https://www.npmjs.com/package/@mdi/js">@mdi/js</a>. This is the recommended installation when
optimizing your application for production.

```shell
$ npm install @mdi/js -D
```

```typescript
// app.module.ts
import { IconSettings, ICON_SETTINGS } from '@anglify/components';
import { mdiAccount, mdiCancel } from '@mdi/js';

@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    {
      provide: ICON_SETTINGS,
      useFactory: (): IconSettings => ({
        defaultSet: 'mdiSVG',
        svgIconSets: {
          mdiSVG: { mdiAccount, mdiCancel,... },
        },
      }),
    },
    ...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

```html
<anglify-icon icon="mdiAccount"></anglify-icon>
```

### Font Awesome SVG **Icons**

```shell
$ npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons -D
```

```typescript
// app.module.ts
import { IconSettings, ICON_SETTINGS } from '@anglify/components';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    {
      provide: ICON_SETTINGS,
      useFactory: (): IconSettings => {
        const bookOpen = icon(faBookOpen);
        ...
        return {
          defaultSet: 'faSVG',
          svgIconSets: {
            faSVG: [
              { iconName: bookOpen.iconName, html: bookOpen.html, node: bookOpen.node },
              ...
            ],
          },
        };
      },
    },
    ...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

```html
<anglify-icon icon="book-open"></anglify-icon>
```
