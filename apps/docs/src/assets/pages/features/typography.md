# Typography

The [Material Design type scale](https://material.io/design/typography/the-type-system.html) includes a range of contrasting styles that support the needs of your product and its content. It is a combination of thirteen styles that are supported by the Anglify type system. It contains reusable categories of text, each with an intended application and meaning.

<app-typography-preview></app-typography-preview>

The type scale uses the Roboto typeface by default for all headlines, subtitles, body, and captions, creating a cohesive typography experience. Hierarchy is communicated through differences in font weight (Light, Medium, Regular), size, letter spacing, and case.

## Advantages

- All fonts are consistent. You don't have to worry about whether a title has to be `60px` or `64px` so that it looks the same as the others.

- You can easily customize the fonts of all Anglify components in a consistent way, since they use the typography system internally. To do this, you only need to adjust the CSS Custom Properties globally once in `styles.scss`. This will automatically update the font of all components.

- The same applies to your own components. When you choose to use the Anglify typography system on your own components, they will automatically be updated when you globally adjust the corresponding CSS custom properties.

## Usage

### Option 1: Using CSS Custom Properties

1. Make sure you have imported the Common Anglify styles, which were described on the Installation page, into your `styles.scss` file.
2. After that you can use the CSS Custom Properties to adjust the font of your components.

   ```scss
   // my.component.scss
   .firstname {
     font: var(--font-body-1);
     letter-spacing: var(--font-letter-spacing-body-1);
     text-transform: var(--font-text-transform-body-1);
   }

   .time {
     font: var(--font-display-6);
     letter-spacing: var(--font-letter-spacing-display-6);
     text-transform: var(--font-text-transform-display-6);
   }

   h1 {
     font: var(--font-display-1);
     letter-spacing: var(--font-letter-spacing-display-1);
     text-transform: var(--font-text-transform-display-1);
   }
   ```

### Option 2: Using SCSS Mixins

1. Make sure you have imported the Common Anglify styles, which were described on the Installation page, into your `styles.scss` file.
2. Then import the typography stylesheet in your component, in which you want to use the typography system:

   ```scss
   // my.component.scss
   @use 'node_modules/@anglify/components/styles/settings/typography';
   ```

3. After that you can apply the respective typography to your text. By using SCSS mixins, you only have to write one line of code to apply the font, letter spacing, and text transform.

   ```scss
   // my.component.scss
   @use 'node_modules/@anglify/components/styles/settings/typography';

   .firstname {
     @include typography.body-1;
   }

   .time {
     @include typography.display-6;
   }

   h1 {
     @include typography.display-1;
   }
   ```

## Aim of this system

The goal is to need only these thirteen styles and to use them everywhere. New styles should not be introduced. However, the appearance of each font can and should be customized according to your own preferences.

In the [Material Studies](https://material.io/design/material-studies/about-our-material-studies.html) you can see a few examples of how the typography has been adapted in different applications:

- [Basil Typography](https://material.io/design/material-studies/basil.html#typography)
- [Crane Typography](https://material.io/design/material-studies/crane.html#typography)
- [Fortnightly Typography](https://material.io/design/material-studies/fortnightly.html#typography)
- [Owl Typography](https://material.io/design/material-studies/owl.html#typography)

## Recommendation

We recommend that you override the font of some default tags in your `styles.scss` file so that you don`t have to redefine them all the time. For example:

```scss
// styles.scss
@use 'node_modules/@anglify/components/styles/settings/typography';

h1 {
  @include typography.display-1;
}
h2 {
  @include typography.display-2;
}
h3 {
  @include typography.display-3;
}
h4 {
  @include typography.display-4;
}
h5 {
  @include typography.display-5;
}
h6 {
  @include typography.display-6;
}
p {
  @include typography.body-1;
}
```

## Customization

You can customize the typography system by adjusting the CSS Custom Properties in `styles.scss`:

```scss
// styles.scss
@use 'node_modules/@anglify/components/styles/settings/typography';

:root {
  --font-display-1: normal normal 600 90px/90px 'Roboto', sans-serif;
  --font-letter-spacing-display-1: 0px;
  --font-text-transform-display-1: uppercase;

  --font-body-1: normal normal 400 14px/14px 'Open Sans', sans-serif;
  --font-letter-spacing-body-1: 0px;
  --font-text-transform-body-1: none;

  // ...
}
```
