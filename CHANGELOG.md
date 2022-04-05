# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog],
and this project adheres to [Semantic Versioning].

## [0.12.0] - 2022-04-05

### Added

- Progress Circular Component including `PROGRESS_CIRCULAR_SETTINGS` token that can be provided
- Checkbox Component including `CHECKBOX_SETTINGS` token that can be provided
- Data Table component

### Changed

- Anglify now uses Angular 13

### Docs

- Opening component pages by pressing the Space key when the card is focused is now possible
- Added installation guide
- Progress Circular documentation page was added

## [0.11.0] - 2022-03-25

### Added

- List Component and some helper components
- Menu Component including `MENU_SETTINGS` token that can be provided
- Card Component including `CARD_SETTINGS` token that can be provided
- Elevation classes (`.anglify-elevation-<0-24>`) were added
- Typography classes are now available, which have been implemented according to [the Material Design 3](https://m3.material.io/styles/typography/overview) specification
- A stylesheet that contains the basic Anglify styles and must be imported globally

```scss
// styles.scss
@use '~@anglify/components/styles';
```

### Changed

- The `TooltipPosition` interface is now called `Position` and is shared with other components
- Providing default settings for components is now done in a uniform manner
  - Tooltip settings are no longer passed via `TooltipModule.forRoot({})` but via the `TOOLTIP_SETTINGS` injection token
  - Icon settings are no longer passed via `IconModule.forRoot({})` but via the `ICON_SETTINGS` injection token
  - FormField settings are no longer passed via `FormFieldModule.forRoot({})` but via the `FORM_FIELD_SETTINGS` injection token
