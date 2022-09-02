# Theming

With Anglify, you can customize the entire look of your application with just a few CSS custom properties. You can also customize
individual components separately.

## Using prebuilt themes

If you don't want to define all the CSS custom properties yourself or just want to get started quickly with Anglify, you can use one of the pre-built themes.

All predefined themes of the library are located in the `@anglify/components/styles/themes` folder. Afterwards you can import
the desired theme in your `styles.scss`:

```scss
// styles.scss
@use 'node_modules/@anglify/components/styles/themes/light' as *;
// ...
```

## Creating your own theme

CSS Custom Properties are scoped. This means that you can override the properties used by Anglify at any point in every stylesheet.
Afterwards, these properties apply to all child elements, assuming they are not overwritten again.

In order to apply the styling to the whole application, it is best to define the properties in the root element. Prebuild themes do this
automatically. But if you want to create your own theme, you have to do it yourself.

```scss
// styles.scss
:root {
  --color-primary: #43a047;
  --color-on-primary-high-emphasis: #000000;
  // ...
}
```

## Customizing components

Each Anglify component has several CSS custom properties that allow customization beyond their colors. This way you don't need to know the
internal structure and all the relations. All custom properties of each component are documented on the respective component pages
