# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.39.0](https://github.com/valentingavran/anglify/compare/v0.38.0...v0.39.0) (2022-10-20)


### ⚠ BREAKING CHANGES

* **Toolbar:** The toolbar no longer sets text and icon colors itself. This must now be done
manually by the developer.

### 🔬  Code Refactoring

* **Toolbar:** text and icon colors are no longer set by the toolbar ([395643c](https://github.com/valentingavran/anglify/commit/395643c765c7845536518558f752ad2d68b4d651))


### 🚀  Features

* **List:** list item title color can be set with CSS custom properties ([49d1159](https://github.com/valentingavran/anglify/commit/49d11598403a510b323492d21aeaae1febb9d754))

## [0.38.0](https://github.com/valentingavran/anglify/compare/v0.37.0...v0.38.0) (2022-10-18)


### ⚠ BREAKING CHANGES

* **Menu:** The Menu directive is no longer available for external use and has been replaced
by the Menu Component. Internally, the directive is still used on some components, but the
occurrences will all be replaced by the Menu Component soon.

### 📝  Docs

* allow overflow inside code examples ([b99b7e0](https://github.com/valentingavran/anglify/commit/b99b7e0490a2ba2cc6ae6b63662b96f994550d77))


### 🐛  Bug Fixes

* **Ripple:** ripples now get removed on blur events ([df81ad4](https://github.com/valentingavran/anglify/commit/df81ad4e99922abfd143fb7addbe0e555966d615))


### 🚀  Features

* export internal utility functions ([b592910](https://github.com/valentingavran/anglify/commit/b59291046f66af7f2fc610c4e152fd574f96110e))
* **ListItem:** list items are now keyboard focusable by default ([05f0c80](https://github.com/valentingavran/anglify/commit/05f0c8009624986b73a2bb4fdd59d8af40690e09))


### 🔬  Code Refactoring

* **Menu:** menu directive is now a component (+ new features) ([5b4371e](https://github.com/valentingavran/anglify/commit/5b4371e888d83fc080efb6f9324b1d18b7e1eba9))

## [0.37.0](https://github.com/valentingavran/anglify/compare/v0.36.4...v0.37.0) (2022-10-18)


### ⚠ BREAKING CHANGES

* **DataTable:** DataTable sorting may not work like before.

### 🐛  Bug Fixes

* **ListItem:** change ListItem gap to match material standards ([e05192b](https://github.com/valentingavran/anglify/commit/e05192bae4a3ae78f7d58f3024fc3d94aef04ede))


### 🔬  Code Refactoring

* **DataTable:** sort functions has now access to sort direction ([caab6cd](https://github.com/valentingavran/anglify/commit/caab6cd43403c1f0f23c541008819c6019856ff4))


### 🚀  Features

* **DataTable:** add customFilter input property ([fe88d8b](https://github.com/valentingavran/anglify/commit/fe88d8b178db69a51f23e3c1a692d0312c7a4283))
* divider ([8908790](https://github.com/valentingavran/anglify/commit/8908790c2316c266c26fbfca87831e224c5da4e7))

### [0.36.4](https://github.com/valentingavran/anglify/compare/v0.36.3...v0.36.4) (2022-10-14)


### 📝  Docs

* improve base application layout example ([2876cec](https://github.com/valentingavran/anglify/commit/2876cece619a4c22fa3bd103038e8eaad7b7b919))


### 🐛  Bug Fixes

* don't pin package versions of dependencies ([7a101c6](https://github.com/valentingavran/anglify/commit/7a101c6977d83a8f060c9ce1ba75e9b58d2980df))

### [0.36.3](https://github.com/valentingavran/anglify/compare/v0.36.2...v0.36.3) (2022-10-05)


### 🐛  Bug Fixes

* **Button:** fix button text alignment ([fdc8283](https://github.com/valentingavran/anglify/commit/fdc8283e0efe7ab63e4c737c91f4f8675932f3d3))

### [0.36.2](https://github.com/valentingavran/anglify/compare/v0.36.1...v0.36.2) (2022-10-05)


### 🐛  Bug Fixes

* **Stepper:** fix output property names (removed $ character) ([bb65c4a](https://github.com/valentingavran/anglify/commit/bb65c4aa9c2db67358886e3a8ec71789f41459aa))
* **Stepper:** style overwrites in horizontal mode are now applied ([55cf990](https://github.com/valentingavran/anglify/commit/55cf9900ee39156952375b17e0707f87cf3015c9))

### [0.36.1](https://github.com/valentingavran/anglify/compare/v0.36.0...v0.36.1) (2022-10-05)


### 🔬  Code Refactoring

* **Checkbox:** remove stopPropagation on click ([38e6be0](https://github.com/valentingavran/anglify/commit/38e6be0541ee0378ea2028b1b531d83bec9e1077))
* detaching inside overlay service was improved ([ad577bd](https://github.com/valentingavran/anglify/commit/ad577bda7fefabb42a7d762da6f074a0da1f28e4))
* expose overlay & id service ([4b8352d](https://github.com/valentingavran/anglify/commit/4b8352df3fce1a48bcd6b53f970317b4661e97a6))
* **Snackbar:** add stacked property back again ([0c35915](https://github.com/valentingavran/anglify/commit/0c3591543e73ea36dc235df86ed2742bede1f1d9))

## [0.36.0](https://github.com/valentingavran/anglify/compare/v0.35.0...v0.36.0) (2022-10-04)


### ⚠ BREAKING CHANGES

* **Snackbar:** `stacked` Snackbar property was removed. `leading` is not a valid position
anymore. `SnackbarInteralDismissReason` was renamed to `SnackbarInternalDismissReason`
(fixed typo).

### 📝  Docs

* add `color-scheme` CSS property for dark scrollbars in dark mode ([9318d33](https://github.com/valentingavran/anglify/commit/9318d33696528ffc25cbdff183fef1badaf42402))
* don't hide navigation drawer scrollbar to avoid layout shifts ([14ba48e](https://github.com/valentingavran/anglify/commit/14ba48e5e8e5fa3ac52518ae08db2cb1c6f9e8ad))
* fix links to GitHub for layout examples ([dccadc9](https://github.com/valentingavran/anglify/commit/dccadc99df72dacb2bcad516efbf403a4ecee7b4))


### 🐛  Bug Fixes

* **DataTable:** checkboxes inside selectable rows work now as expected ([3386ac3](https://github.com/valentingavran/anglify/commit/3386ac3587aaafddb55dc78ca03520b402af07f3))


### 🚀  Features

* add new Anglify overlay service (CDK replacement) ([436f514](https://github.com/valentingavran/anglify/commit/436f5140255c3b1bae35739d7fe3510082eea3e5))
* create trap focus directive ([54648a8](https://github.com/valentingavran/anglify/commit/54648a8daf93c84383aa6a03ba00599a5daf1f2c))


### 🔬  Code Refactoring

* **Dialog:** use Anglify Overlay Service instead of CDK one ([9a2938e](https://github.com/valentingavran/anglify/commit/9a2938e254167be2836141d2231567192948d814))
* remove @angular/cdk dependency ([c4e6d9d](https://github.com/valentingavran/anglify/commit/c4e6d9d1e8035829e86ff59d19962edf1f5c2f34))
* **Snackbar:** use Anglify Overlay Service instead of CDK one ([6f754d9](https://github.com/valentingavran/anglify/commit/6f754d99659740b75932ed0b3cd3f469418c6f4e))

## [0.35.0](https://github.com/valentingavran/anglify/compare/v0.34.0...v0.35.0) (2022-09-26)


### ⚠ BREAKING CHANGES

* **Badge:** The badge directive is now a component. This completely changes the way the badge
is used. Check out the badge examples on the website for more information.

### 🔬  Code Refactoring

* **Badge:** the badge directive is now a component ([1f5cb1f](https://github.com/valentingavran/anglify/commit/1f5cb1f1a989da1ae191037fb592209faafd228e))


### 🛠  Other Commits

* adjust eslint config ([ad03441](https://github.com/valentingavran/anglify/commit/ad0344120c5ec9be9eb9d280d0bc9938147211d9))


### 🚀  Features

* **Button:** add loading state support ([ce3c7d8](https://github.com/valentingavran/anglify/commit/ce3c7d8625db9ab111d8a99c06c0f5ff9374b613))
* **ListGroup:** the list group can now be controlled with the keyboard ([1c11e6a](https://github.com/valentingavran/anglify/commit/1c11e6a09b2983985fcdeabab0e9fd89b964869d))
* **ProgressCircular:** width and height is now configurable ([b083069](https://github.com/valentingavran/anglify/commit/b0830693ab2f601bfbe865e90ac675019e47fe1f))


### 🐛  Bug Fixes

* dialog service now disables body scroll (no fixed position anymore) ([7c61923](https://github.com/valentingavran/anglify/commit/7c6192304265f652fc1ab06f8a546a59a1e34192))
* select/autocomplete/combobox this binding bug ([e5253ba](https://github.com/valentingavran/anglify/commit/e5253ba97c5a71e1ce06c1225d5b86ac724b1775))

## [0.34.0](https://github.com/valentingavran/anglify/compare/v0.33.0...v0.34.0) (2022-09-19)


### ⚠ BREAKING CHANGES

* The Ripple/State system has been completely refactored. The following global
custom properties have been removed `--state-hover-opacity`, `--state-focus-opacity`,
`--state-pressed-opacity`, `--state-dragged-opacity`, `--state-inactive-color`,
`--state-active-color` and the following custom properties have been newly introduced:
`--color-state-inactive-hover`, `--color-state-inactive-focus`, `--color-state-inactive-pressed`,
 `--color-state-inactive-dragged`, `--color-state-active-hover`, `--color-state-active-focus`,
  `--color-state-active-pressed`, `--color-state-active-dragged`.

  **Remove the old properties and add the new properties to your SCSS file.**
* **Checkbox:** `onCheckedChange` was renamed to `checkedChange`. This allows two way binding now.

### 🐛  Bug Fixes

* **Checkbox:** fix two way binding ([7d36a2c](https://github.com/valentingavran/anglify/commit/7d36a2c6a96c60c162d0156bee8c0b73440b7892))


### 🔬  Code Refactoring

*  ripple/state system was made more flexible ([2446e39](https://github.com/valentingavran/anglify/commit/2446e39b87595cdff76dfdd8e51df0967f29c7f6))

## [0.33.0](https://github.com/valentingavran/anglify/compare/v0.32.1...v0.33.0) (2022-09-16)


### ⚠ BREAKING CHANGES

* The Ripple/State system has been completely refactored. All **state custom
properties of the respective components have been removed**. Also, the following global custom
properties have been removed ~~`--color-primary-state-hover`~~, ~~`--color-primary-state-focus`~~,
~~`--color-surface-state-hover`~~, ~~`--color-surface-state-focus`~~ and the following custom
properties have been newly introduced: `--state-hover-opacity`, `--state-focus-opacity`,
`--state-pressed-opacity`, `--state-dragged-opacity`, `--state-inactive-color`,
`--state-active-color`.
* **DataTable:** Access modifiers of some Data Table properties have been changed.

### 📝  Docs

* fix some code examples ([d4e233d](https://github.com/valentingavran/anglify/commit/d4e233d18f8a4dea1e1b438a114213a6949fd909))


### 🔬  Code Refactoring

* ripple/state system was made more flexible ([3a637b5](https://github.com/valentingavran/anglify/commit/3a637b5f44c17b9afcded515e4bd3475fe0d6a60))


### 🚀  Features

* **BreakpointObserverService:** add xs$ observable ([1da6444](https://github.com/valentingavran/anglify/commit/1da64448cadd78efe906347e554febf4b8e27d6b))
* **DataTable:** add possibility to show and hide columns ([eb87081](https://github.com/valentingavran/anglify/commit/eb870814682196b909808626b8eb829a1e1f3313))
* **DataTable:** add support for mobile mode (toggled by using property) ([0dcbdb0](https://github.com/valentingavran/anglify/commit/0dcbdb0ce3bdf41861f29d36096c1e6a58c7c8b5))
* **DataTable:** footer doesn't  scroll with content anymore ([56dec10](https://github.com/valentingavran/anglify/commit/56dec10a0454dfa63e2b1b566413426f05bb27a6))


### 🐛  Bug Fixes

* **DataTable:** next page button is now disabled if there are no items ([69b14fb](https://github.com/valentingavran/anglify/commit/69b14fb86b19a0c70c1f9fa093d49b55b7bde06e))
* ripples/states of parent elements do not influence children anymore ([15e9672](https://github.com/valentingavran/anglify/commit/15e9672c8b5da18049fd308185338f443a838c11))

### [0.32.1](https://github.com/valentingavran/anglify/compare/v0.32.0...v0.32.1) (2022-09-12)


### 🛠  Other Commits

* eslint config neon ([c6f209c](https://github.com/valentingavran/anglify/commit/c6f209c50239d6289602924bbbd9f122f57a1908))


### 📝  Docs

* add typography docs page ([9b535da](https://github.com/valentingavran/anglify/commit/9b535dadcd0ee08d4a108134486c0f97b47a8f96))
* fix application layout examples ([804aad5](https://github.com/valentingavran/anglify/commit/804aad52a8a65e2900ad2fb7c4ffe5fb6f612903))
* improve typography preview component ([da896a8](https://github.com/valentingavran/anglify/commit/da896a8c0e834ba6d2268ed3ff07fe29d73461bd))


### 🐛  Bug Fixes

* **Tabs:** routerLink works now as expected & add tabs wireframe ([754ea22](https://github.com/valentingavran/anglify/commit/754ea22133b5343b77a521ea26645062523a55fc))

## [0.32.0](https://github.com/valentingavran/anglify/compare/v0.31.1...v0.32.0) (2022-09-07)


### ⚠ BREAKING CHANGES

* ModalInteralCloseReason  was renamed to DialogInternalCloseReason

### 🐛  Bug Fixes

* replace first pipe operator with take(1) to avoid race conditions ([8c95456](https://github.com/valentingavran/anglify/commit/8c95456c417ae9edbd1fce295bfadc261cd940ec))


### 🛠  Other Commits

* switch to yarn ([63e398d](https://github.com/valentingavran/anglify/commit/63e398dfa5b89f41cd22253579c62815964c4af5))


### 📝  Docs

* add table of content to each page ([6d220ea](https://github.com/valentingavran/anglify/commit/6d220ea8efaba3752c7cf70d03f927986b9f5a78))
* update import examples ([a667870](https://github.com/valentingavran/anglify/commit/a667870784b96705c0c20172bd2fe9b8e0eebd5b))
* use font from assets folder instead of CDN ([95b3a87](https://github.com/valentingavran/anglify/commit/95b3a871c1fe8ecadc6bb2b795a7b0fe0814fc67))
* use markdown for writing documentation pages ([aa8987d](https://github.com/valentingavran/anglify/commit/aa8987d2b7f215a3b38756c0782dafe8a25ec998))


### 🔬  Code Refactoring

* rename ModalInteralCloseReason to DialogInternalCloseReason ([f907798](https://github.com/valentingavran/anglify/commit/f907798129bf299ebf8e30fed4a33b6f0c5e9c97))
* **Toolbar:** set z-index of toolbar to 10 ([f9e9f44](https://github.com/valentingavran/anglify/commit/f9e9f4480c276f436c09f165eb2fc5ac083a9824))


### 🚀  Features

* **Card:** add outlined property ([3289a3d](https://github.com/valentingavran/anglify/commit/3289a3d45bcac183bdf3f3c5eed6cf17a65e6c93))
* **DataTable:** add computeContent method for manipulating column data ([c36d5b8](https://github.com/valentingavran/anglify/commit/c36d5b8dfeda5e51ad52ef111354692fe7a80f36))
* **DataTable:** add loading state support ([9eab147](https://github.com/valentingavran/anglify/commit/9eab14742d0c2736f9217e03c424aacde0973378))
* **DataTable:** add no data state support ([411e74c](https://github.com/valentingavran/anglify/commit/411e74c11a25b37951c90e6240e5bd1ded0089b7))
* **Timeline:** add padding custom CSS properties ([3282abd](https://github.com/valentingavran/anglify/commit/3282abdb018f1c47e963ee8bb50518abf549f9d2))

### [0.31.1](https://github.com/valentingavran/anglify/compare/v0.31.0...v0.31.1) (2022-08-29)


### 🐛  Bug Fixes

* add missing imports that broke some components ([639f323](https://github.com/valentingavran/anglify/commit/639f32305e353e2167e38d4628b779f9820c4b8b))
* **SimpleTable:** fix code examples & hover style on footer ([17af262](https://github.com/valentingavran/anglify/commit/17af26215839dc5a9603bae7a386ec0667c19c59))

## [0.31.0](https://github.com/valentingavran/anglify/compare/v0.30.0...v0.31.0) (2022-08-28)


### ⚠ BREAKING CHANGES

* All components are now standalone components. Previously imported modules must be
replaced with component imports. Also, the SlotDirective must be imported when slots are used.

### 🛠  Other Commits

* **Chip:** remove fixed chip height ([587f861](https://github.com/valentingavran/anglify/commit/587f861edbb7927e9d7c3760e016bd125dbcd6b4))
* **DataTable:** adjust styling and expose new CSS custom properties ([6f05365](https://github.com/valentingavran/anglify/commit/6f05365a6d9a3377b6cf80ec14b8d6fdf6ec5063))


### 🐛  Bug Fixes

* **Checkbox:** show default checked icon when checkbox is disabled ([2655798](https://github.com/valentingavran/anglify/commit/265579819c91fd8bb1211c47625c749afadf9a91))


### 🚀  Features

* **DataTable:** add buttons that allow jumping to first & last page ([7531dfa](https://github.com/valentingavran/anglify/commit/7531dfaba0ba404782a1e16eabb734dac0ce2c20))
* **DataTable:** add support for custom sort functions per header ([5309df3](https://github.com/valentingavran/anglify/commit/5309df36ef4d780467eb93fa41d1920ad78ec51f))
* **DataTable:** add support for own (generic) types ([243a406](https://github.com/valentingavran/anglify/commit/243a40687ae445191a3a5657e74070cdeebe60a0))
* standalone components ([118cdba](https://github.com/valentingavran/anglify/commit/118cdba3bccf8a4f845f4b45c4555dad48f0a0a6))


### 🔬  Code Refactoring

* change anglify folder structure ([eebf652](https://github.com/valentingavran/anglify/commit/eebf65254983a5ee13fa7cad48ef60e030d25de0))

## [0.30.0](https://github.com/valentingavran/anglify/compare/v0.29.1...v0.30.0) (2022-08-26)


### ⚠ BREAKING CHANGES

* **Checkbox:** Click propagation has been disabled. This may cause some unexpected behaviour in
existing applications.
* **Table:** The Table component was renamed to SimpleTable (and all related properties).
* Almost every output property was renamed (The word `on` was prefixed).

### 🛠  Other Commits

* **Table:** add hover styling to rows ([1d4ce95](https://github.com/valentingavran/anglify/commit/1d4ce95fbafc21a1855f36e0d366134b6b9bfd45))


### 🔬  Code Refactoring

* rename & prefix the word `on` to every output property ([6182392](https://github.com/valentingavran/anglify/commit/6182392431aba51dac97be93c93f8f5a5902857f))
* **Table:** rename Table component to SimpleTable ([f258bf4](https://github.com/valentingavran/anglify/commit/f258bf48b410e149066ed3ad430bd8ea088edd98))


### 🐛  Bug Fixes

* **Checkbox:** clicking will stop propagation now ([85ba9f7](https://github.com/valentingavran/anglify/commit/85ba9f71ec98eb9c2edd933cafa7974cd522c2dc))
* **Stepper:** make stepper header text not selectable ([7110949](https://github.com/valentingavran/anglify/commit/7110949c716208728ac845cbe68dde077d1ef569))


### 📝  Docs

* add page titles to every route ([9965b31](https://github.com/valentingavran/anglify/commit/9965b31314a3615b49a4a0ed736832179fd0432e))
* add support for displaying interfaces inside the api table ([8d57e59](https://github.com/valentingavran/anglify/commit/8d57e5969790ff899bea52f2a5ceb2dd39dd38ac))
* improve code example component (add scroll behaviour) ([29fcc5f](https://github.com/valentingavran/anglify/commit/29fcc5f316f11614c2ba8facb584a49aa829dff8))
* use dynamic navigation tree inside navigation drawer ([01bb64a](https://github.com/valentingavran/anglify/commit/01bb64a77d7782eccd32eec00baf957a2fe75213))


### 🚀  Features

* add color on primary variant CSS custom properties ([8b185e2](https://github.com/valentingavran/anglify/commit/8b185e2d0dc185d17177cf9cb3a9f36db30922d6))
* **Chip:** add inactive & active CSS custom properties for label color ([04adf83](https://github.com/valentingavran/anglify/commit/04adf83a9ff7d37f770f2d6d6af357ae01e06507))
* implement Button Group component ([9531173](https://github.com/valentingavran/anglify/commit/9531173f7cd92173bb01dc61a1daf26daa3ffec7))
* implement DataTable component ([cfad2b2](https://github.com/valentingavran/anglify/commit/cfad2b2f400ebf459f81fde799a27a8ef3093b90))
* **Toolbar:** add navigation role to improve accessibility ([d743e91](https://github.com/valentingavran/anglify/commit/d743e91dd59bede0bc71ee7e512b2f4404cd511e))

### [0.29.1](https://github.com/valentingavran/anglify/compare/v0.29.0...v0.29.1) (2022-08-18)


### 🐛  Bug Fixes

* **OtpInput:** remove focus style when input is focused & gets disabled ([b99f39f](https://github.com/valentingavran/anglify/commit/b99f39f4766a895edcef757876fa4501d3455c7d))

## [0.29.0](https://github.com/valentingavran/anglify/compare/v0.28.0...v0.29.0) (2022-08-18)


### ⚠ BREAKING CHANGES

* **OtpInput:** methods/properties were renamed and access modifiers were changed.

### 🔬  Code Refactoring

* **OtpInput:** change access modifiers & rename methods/properties ([541a496](https://github.com/valentingavran/anglify/commit/541a496019494d4e9b29138dd295099be5c47ea0))


### 🚀  Features

* **ListGroup:** add `disableGroupCollapse` property back again ([048b8b6](https://github.com/valentingavran/anglify/commit/048b8b6ee91e1dbf259b69ab38977359a196acf5))
* **OtpInput:** add `focus()` & `blur()`methods ([0c505b8](https://github.com/valentingavran/anglify/commit/0c505b808f3479799c75a7f1019176d0ed8fe448))

## [0.28.0](https://github.com/valentingavran/anglify/compare/v0.27.0...v0.28.0) (2022-08-18)


### ⚠ BREAKING CHANGES

* **NavigationDrawer:** `ngModel` input property of the NavigationDrawer was renamed to `value`.
* **Autocomplete, Combobox, Select:** The `noOptions` input property was renamed to `noDataText`.
* **Autocomplete, Combobox, Select:** The options input property was renamed to items.

### 🛠  Other Commits

* ship components as non-peer deps ([fc4ebc7](https://github.com/valentingavran/anglify/commit/fc4ebc794e1e3f66de25d3f2dafb5aa1100dc9a0))


### 📝  Docs

* **Badge:** fix complex docs example ([161ba9a](https://github.com/valentingavran/anglify/commit/161ba9a6c61fa4fd4fe9a0003ebb4c08c4f9b5f0))


### 🐛  Bug Fixes

* **Checkbox, RadioButton:** fix focus & hover states ([025a95c](https://github.com/valentingavran/anglify/commit/025a95c7ce6a8e42799aef4723995e8153417af1))
* **ExpansionPanels:** remove panel margins in accordion mode ([fa5ab9e](https://github.com/valentingavran/anglify/commit/fa5ab9e9c4e9d5f51288c2d6bce89ba2ce2975e0))


### 🚀  Features

* add OTP Input component ([132ece2](https://github.com/valentingavran/anglify/commit/132ece2e1da4cd558563abfa5d71f98106b6e131))
* testing library ([612b7ba](https://github.com/valentingavran/anglify/commit/612b7babcde59102a9caa779c63380c3df8988e4))


### 🔬  Code Refactoring

* **Autocomplete, Combobox, Select:** rename noOptions to noDataText ([859a5c0](https://github.com/valentingavran/anglify/commit/859a5c013c82825696d0f4bf2528b1494d082956))
* **Autocomplete, Combobox, Select:** rename options to items ([45ed04d](https://github.com/valentingavran/anglify/commit/45ed04d625fc87f0f8eb477b13a4fc38be6b9592))
* **Button:** cleanup button component ([46f00d8](https://github.com/valentingavran/anglify/commit/46f00d872de4b4dc1ef7e8f3187846a9681a222c))
* cleanup code ([0763c61](https://github.com/valentingavran/anglify/commit/0763c619050514594b8e7c1dc17c211ca42d52c5))
* **NavigationDrawer:** rename `ngModel` input property to `value` ([59cc325](https://github.com/valentingavran/anglify/commit/59cc3255c5fbfd5ef9a5a8e457f5458399c596bd))

## [0.27.0](https://github.com/valentingavran/anglify/compare/v0.26.0...v0.27.0) (2022-07-26)


### ⚠ BREAKING CHANGES

* **Button:** `contained-tonal` Button appearance was removed. It was an artifact.

### 🛠  Other Commits

* fix typo inside .versionrc ([b628993](https://github.com/valentingavran/anglify/commit/b62899361915ea5116a1b22ae15eebc10785797d))


### 🐛  Bug Fixes

* **Button:** improve background & label color for contained appearance ([d67489b](https://github.com/valentingavran/anglify/commit/d67489b6eed71a4de0011e5b85f996df997dd128))
* **Button:** remove contained-tonal appearance ([bf4f44c](https://github.com/valentingavran/anglify/commit/bf4f44c681ced508c1769595a704c25bf448393f))
* change colors on surface overlay for dark theme ([1230a7f](https://github.com/valentingavran/anglify/commit/1230a7f505b1fec531021fc12fc588e0ee61866d))
* **TextField:** change details spacing & component size ([275837a](https://github.com/valentingavran/anglify/commit/275837a4779d645a2096541822f8a73dde706ec3))
* **TextField:** improve inactive bottom border ([b5f5a1c](https://github.com/valentingavran/anglify/commit/b5f5a1c79f813d5114aeca67d3e305ff6a929c4a))

## [0.26.0](https://github.com/valentingavran/anglify/compare/v0.25.0...v0.26.0) (2022-07-23)


### ⚠ BREAKING CHANGES

* All dependencies including Angular have been updated to the latest version.
Anglify now uses Angular 14 Updating should work seamlessly.

### 🛠  Other Commits

* update to Angular 14 ([64d971d](https://github.com/valentingavran/anglify/commit/64d971d666459dd5b17b0fdfeb4357614dd1e5f0))

## [0.25.0](https://github.com/valentingavran/anglify/compare/v0.24.2...v0.25.0) (2022-07-23)


### ⚠ BREAKING CHANGES

* **Toolbar:** Toolbar slots and some CSS custom properties were renamed

### 🐛  Bug Fixes

* **BottomNavigation:** add FormControl support ([1f6d466](https://github.com/valentingavran/anglify/commit/1f6d4667f5b38ad09ffffbf84d460b88ae933e13))
* **Input:** remove hint & error spacing ([bc0b825](https://github.com/valentingavran/anglify/commit/bc0b825e4984ecbc188511a0480d1830927ad3bf))
* **Tabs:** improve performance ([8de69eb](https://github.com/valentingavran/anglify/commit/8de69eb442fcca10fa9ec3f5027a7d3dd63ca404))


### 🔬  Code Refactoring

* **Toolbar:** change slot structure & add extension slot ([0a9039a](https://github.com/valentingavran/anglify/commit/0a9039ac07aa490813caec7b64766175de9eaf16))


### 🚀  Features

* add timeline component ([5cf0dcf](https://github.com/valentingavran/anglify/commit/5cf0dcff5834a78da93ad92a585c0d66ef9c120b))
* **Table:** add css custom properties for table fonts ([e98c828](https://github.com/valentingavran/anglify/commit/e98c828af5a0f57aaacce5fcf17de421b9c73d53))


### 📝  Docs

* add component APIs ([a415c78](https://github.com/valentingavran/anglify/commit/a415c789c772591655c1eb24160cc7221616c30c))
* add jsdoc descriptions to input properties ([bb3eca0](https://github.com/valentingavran/anglify/commit/bb3eca0e209c8ee0fb0cf077bd67e723aead7aea))
* fix some deprecated slots ([bd90880](https://github.com/valentingavran/anglify/commit/bd90880b04d77f6f34e9c326133c25802495b260))


### 🛠  Other Commits

* add compodoc npm script command ([73afce5](https://github.com/valentingavran/anglify/commit/73afce558ac6bcc748f109946361d6fae4eec0fe))

### [0.24.2](https://github.com/valentingavran/anglify/compare/v0.24.1...v0.24.2) (2022-07-19)


### 🐛  Bug Fixes

* **TextArea, TextField:** export missing Typescript files ([7c09ecd](https://github.com/valentingavran/anglify/commit/7c09ecd563acb8d6f4474e6f223d2edeac6b8cfd))

### [0.24.1](https://github.com/valentingavran/anglify/compare/v0.24.0...v0.24.1) (2022-07-19)


### 🔄  Reverts

* **Checkbox:** remove flex align center behaviour from label ([6a716a7](https://github.com/valentingavran/anglify/commit/6a716a7cdcdce6dd5290ed2fc0101175a259f081))

## [0.24.0](https://github.com/valentingavran/anglify/compare/v0.23.0...v0.24.0) (2022-07-19)


### ⚠ BREAKING CHANGES

* **Checkbox:** Checkbox labels are no longer in a flex container and therefore not centered.
* The `BooleanLike` type is no longer supported. All `BooleanLike` types have been
changed to `boolean`. Templates must be adapted and use the bracket syntax that is normal for
Angular.
* **Breadcrumbs:** Breadcrumb matchOptions are now configured for each item separately.
* **Textarea:** Text areas now have only two lines by default

### 📝  Docs

* add module import examples to every component ([d2e80be](https://github.com/valentingavran/anglify/commit/d2e80be5e7b8688350a005096211f563658e535a))
* improve accessibility ([81200ed](https://github.com/valentingavran/anglify/commit/81200ed4bf6cf993f6f22de1140fc4b7e1cf4ff0))
* update w3c links ([ecf41cd](https://github.com/valentingavran/anglify/commit/ecf41cdb3bf130239f61c8c1459e4ecc7507dbe8))
* use Anglify table for styling API ([febfd29](https://github.com/valentingavran/anglify/commit/febfd299259f9d9e7fdafa82053728acf0b66e30))


### 🛠  Other Commits

* adjust vscode settings to exclude build directory from search ([fd89678](https://github.com/valentingavran/anglify/commit/fd8967811434b14fe5642d1cca308b73f9204867))
* cleanup index.ts ([b901192](https://github.com/valentingavran/anglify/commit/b901192f625e199e5a3afba64a2ecea1c3f5f4e8))


### 🐛  Bug Fixes

* **Menu:** click outside listener now works correctly ([55c4435](https://github.com/valentingavran/anglify/commit/55c443532795e673dff7cdc955f89496d7c4499b))
* **Menu:** rename styles that were leaking into this component ([08d7849](https://github.com/valentingavran/anglify/commit/08d7849ca92451d37642340f8e37c019cc54dba5))
* **RadioButton:** focus color ([8c62225](https://github.com/valentingavran/anglify/commit/8c62225d75f35f2228b5fa764cde0077b54da85a))


### 🚀  Features

* add additional internal icons ([79be106](https://github.com/valentingavran/anglify/commit/79be106ec65029bc371096a209d5dc1f44bc7f79))
* add directive that can stop click event propagation ([10e4826](https://github.com/valentingavran/anglify/commit/10e482673dbeb8e45ff3851f5a97cf0a1c8b41c4))
* add flip functionality to position service ([56f4ce3](https://github.com/valentingavran/anglify/commit/56f4ce35b49eb6125691252752ffd2539731f9d9))
* **Checkbox:** improve accessibility ([6c6d89a](https://github.com/valentingavran/anglify/commit/6c6d89a892a8c63b286979c837c9ae29a43b18dd))
* **Chip:** don't allow text selection ([3476723](https://github.com/valentingavran/anglify/commit/347672348357c91a53fb3d96b8df7f3414c393e1))
* **Dialog, Snackbar:** enum for internal reasons ([ac93637](https://github.com/valentingavran/anglify/commit/ac936379775a00c7fa250ae912c24c266ab1e244))
* **Dialog, Snackbar:** simple opening method ([f694026](https://github.com/valentingavran/anglify/commit/f69402666181cf2e6a001bb8f3d3ad9e221d67d7))
* **Input:** show tooltip when hint is cut off ([8a1ac28](https://github.com/valentingavran/anglify/commit/8a1ac28ceecdc0a6ff93079f076ff27385547c6a))
* **Menu:** expose open$ observable ([99a295a](https://github.com/valentingavran/anglify/commit/99a295a6c42b5035d5df2174a5f86378caa8aa05))
* pre-publish autocomplete component (should not be used yet) ([41a9454](https://github.com/valentingavran/anglify/commit/41a94541224f7cfda909631c936298c223774866))
* pre-publish combobox component (should not be used yet) ([bed0ea9](https://github.com/valentingavran/anglify/commit/bed0ea9ba9034d4bca389f7d66b047f880b45a03))
* pre-publish select component (should not be used yet) ([4dd62e8](https://github.com/valentingavran/anglify/commit/4dd62e81075c0062c87c500409d7e5379d41d9bc))
* **ProgressCircular:** improve accessibility ([9d521f1](https://github.com/valentingavran/anglify/commit/9d521f1ad72893d2c9438b79f814021e3415d23f))
* **ProgressLinear:** improve accessibility ([e1a98ab](https://github.com/valentingavran/anglify/commit/e1a98ab5920051f2c5e499fd5a7ea0756077baa9))
* **Tabs:** improve accessibility ([3e76e41](https://github.com/valentingavran/anglify/commit/3e76e414f95a4920015ce5ab4db392fe051a1f28))
* **Textarea:** add autoresize support & example ([49881ee](https://github.com/valentingavran/anglify/commit/49881ee5a354debdb374328fa55dc2cde5b24fae))
* **Tooltip:** improve accessibility ([6494527](https://github.com/valentingavran/anglify/commit/6494527d97a624d8a5d8040e2066118879f9a253))


### 🔬  Code Refactoring

* **Breadcrumbs:** make some item props optional ([1126075](https://github.com/valentingavran/anglify/commit/1126075411f7be4afee4dbd69584980419031324))
* **Checkbox:** remove flex align center behaviour from label ([486044e](https://github.com/valentingavran/anglify/commit/486044eb11d91e099fd1816c8ecc4219b9ef44b9))
* **Input:** adjust styles ([e3db5c6](https://github.com/valentingavran/anglify/commit/e3db5c668d4505873a66e3967ad804fa6c2450d0))
* **Input:** make hint optional ([458775b](https://github.com/valentingavran/anglify/commit/458775be3c4ed27fa4573e6662dddd23568fc1aa))
* remove BooleanLike type & helpers ([4e1b8df](https://github.com/valentingavran/anglify/commit/4e1b8dff4221ae59ef49db3ce212b0f3913a8bea))
* **TextField:** adjust styles ([6b3d897](https://github.com/valentingavran/anglify/commit/6b3d897260d21cec60baeebaba1c6d2f35b5253e))

## [0.23.0](https://github.com/valentingavran/anglify/compare/v0.22.1...v0.23.0) (2022-07-06)


### ⚠ BREAKING CHANGES

* **Breakpoints:** breakpoint SCSS mixins were renamed
* **Stepper:** The names of the stepper service and directive classes have changed

### 🐛  Bug Fixes

* expose modal data and snackbar data generic to allow typing the return data ([d1b81e7](https://github.com/valentingavran/anglify/commit/d1b81e7f8b6ba53e21be1ea5e2744042a60cb00a))


### 📝  Docs

* add breakpoints feature page ([1f6d013](https://github.com/valentingavran/anglify/commit/1f6d01322b219921f22c5801a55870582d1894a2))


### 🔬  Code Refactoring

* add default flag to all SCSS variables ([48b9277](https://github.com/valentingavran/anglify/commit/48b9277564543ee6f11ff22ec47ce977dc28d291))
* **Breakpoints:** rename breakpoint SCSS mixins ([4219357](https://github.com/valentingavran/anglify/commit/4219357121310831242a562588fc1020a64ceaac))
* **Stepper:** directives and services have now the according suffix ([836ebe1](https://github.com/valentingavran/anglify/commit/836ebe125a08c0972f37b573f3c921462858ad7a))
* unify setting token file names ([64467a6](https://github.com/valentingavran/anglify/commit/64467a681640eca7bfaf747172be2cebe3814909))


### 🚀  Features

* add expansion panels component ([9ee1df9](https://github.com/valentingavran/anglify/commit/9ee1df995791673fa80293239227c4f12172d142))

### [0.22.1](https://github.com/valentingavran/anglify/compare/v0.22.0...v0.22.1) (2022-06-24)


### 📝  Docs

* add release notes page ([dbbb083](https://github.com/valentingavran/anglify/commit/dbbb0833de578ad3885abc395fc6e22326782dc8))


### 🛠  Other Commits

* fix anglify build command ([5543a6a](https://github.com/valentingavran/anglify/commit/5543a6ae623764b77b19f69da7d5fb0b9badf723))

## [0.22.0](https://github.com/valentingavran/anglify/compare/v0.21.3...v0.22.0) (2022-06-24)


### ⚠ BREAKING CHANGES

* **completeWith:** The completeWith function for Dialogs and Snackbars now requires passing an object
with `{ reason: string; data?: any | unknown }`, where reason is the reason for closing/sending
(required) and data is the arbitrary data that is passed.
This allows for a consistent interface instead of a possible union type of
`string | unknown | undefined`, which made it much harder to check what was being returned or why
the Dialog/Snackbar action completed
* The Form Field component has been removed. Instead you should use the Text Field
and the Text Area component

### 🐛  Bug Fixes

* **Stepper:** horizontal step header items will fill the full width now ([3053324](https://github.com/valentingavran/anglify/commit/3053324ebe3d14a6d9a7ca112b881d1930722deb))


### 📝  Docs

* add text area page and examples ([1593cd4](https://github.com/valentingavran/anglify/commit/1593cd43d8ccd64ab1fa5b0d9a548b9284749cdd))
* add text field page and examples ([292c2b5](https://github.com/valentingavran/anglify/commit/292c2b53934a3accf91aa5ade8cfbe42a6a731b1))
* remove form field page and examples ([bc0a31e](https://github.com/valentingavran/anglify/commit/bc0a31ea50a0e2b47e3d5a1611e830cd25ac3c45))
* **Stepper:** add custom visited icon example ([a032303](https://github.com/valentingavran/anglify/commit/a032303806dc8c67a1bd9a2d668f70f15203d878))


### 🚀  Features

* create text field & text area components ([0f4f772](https://github.com/valentingavran/anglify/commit/0f4f772665febc8f9c4d0cb57942acd39a36add7))
* expose frequently used form control validators ([33421ee](https://github.com/valentingavran/anglify/commit/33421ee86862562754d6ce894e119aa23b6bec71))


### 🔬  Code Refactoring

* **completeWith:** modal data and snackbar data format ([0a6f86e](https://github.com/valentingavran/anglify/commit/0a6f86ec5ddb1172d964b03676b1a25792a04aa3))
* remove form field component ([d536e32](https://github.com/valentingavran/anglify/commit/d536e32507378591bd6634f56ff1af85c0f79a2d))
* replace [@import](https://github.com/import) with [@use](https://github.com/use) everywhere ([5fdf7d1](https://github.com/valentingavran/anglify/commit/5fdf7d15706db03c34e72a6eed4ce9d04257dd04))


### 🛠  Other Commits

* update deps and add cpy-cli and rimraf for cross-platform compatability ([9ea98c0](https://github.com/valentingavran/anglify/commit/9ea98c0ea3cc0e896b4887c99b51cd5579db57aa))

### [0.21.3](https://github.com/valentingavran/anglify/compare/v0.21.2...v0.21.3) (2022-06-23)


### 🐛  Bug Fixes

* **ListItemGroup:** selected indices can now be accessed by FormControls ([025c1bb](https://github.com/valentingavran/anglify/commit/025c1bbcf37b7a20cf27e25bf90f467e100d3641))

### [0.21.2](https://github.com/valentingavran/anglify/compare/v0.21.1...v0.21.2) (2022-06-23)


### 🛠  Other Commits

* add missing test files ([e96dc50](https://github.com/valentingavran/anglify/commit/e96dc50feb2973e2ecb23f1186795110b9c8254f))


### 🐛  Bug Fixes

* **dialog:** backdrop clicking reason and pane class ([4542aa3](https://github.com/valentingavran/anglify/commit/4542aa3d02a05b1d373c1944fbafa92e0580087c))
* **Ripple:** ripples are now behind texts ([b834a68](https://github.com/valentingavran/anglify/commit/b834a68d4ed9b88e8b8bf6a11f88f7d215cc3b56))


### 🚀  Features

* add breadcrumbs component ([5c3a382](https://github.com/valentingavran/anglify/commit/5c3a3821b0fc9845bb60d81007fa762ea8bbaf01))
* **Tabs:** add support for routerLinks ([514f1ff](https://github.com/valentingavran/anglify/commit/514f1ff31bd557ab36c9f7d96582dffeb945c5c5))

### [0.21.1](https://github.com/valentingavran/anglify/compare/v0.21.0...v0.21.1) (2022-06-07)


### 🐛  Bug Fixes

* **Tabs:** remove absolute paths that prevent application launching ([08d3b3a](https://github.com/valentingavran/anglify/commit/08d3b3a913cfdea05336b889738c93dda7052e8a))

## [0.21.0](https://github.com/valentingavran/anglify/compare/v0.20.2...v0.21.0) (2022-06-07)


### ⚠ BREAKING CHANGES

* **NavigationDrawer:** All occurrences of `anglify-nav-drawer`, `NavDrawer`, `NavDrawerSettings`, etc.
have been renamed to `NavigationDrawer`, `anglify-nav-drawer` etc.. To update to this version, all
occurrences in your application must be renamed.
* **NavigationDrawer:** How you use Navigation Drawers has completely changed. Check every navigation
drawer in your app and visit the documentation page for more information.
* **List:** ListGroups no longer have the `exact` input property. Instead, the ListItem
should indicate whether it should be active when the exact route is found, or a subset of it. If
ListGroups have active items, then they are automatically opened when the web page is loaded.
Checking is now done via the `active` property of the ListItem component.
* **Tooltip:** All tooltip input properties have been removed. The tooltip is now configured
using the new `tooltipConfig` input property. This prevents overrides if two directives use input
properties with the same name.

### 🐛  Bug Fixes

* **Radio Button:** remove hover state when hovering over label ([74a4cb1](https://github.com/valentingavran/anglify/commit/74a4cb14b0294d74490a60d22e43bfab0aee7f9e))


### 🛠  Other Commits

* add package description and additional information ([f97ed25](https://github.com/valentingavran/anglify/commit/f97ed253e9d63205065bba3dffb0cfa1cc19e0f0))
* copy root README to anglify lib bundle just before publishing ([ff52da2](https://github.com/valentingavran/anglify/commit/ff52da2ed935c456b32c61205a8b622860bbba46))
* remove README from anglify lib ([d44b30b](https://github.com/valentingavran/anglify/commit/d44b30b887886d051ff9445f93698bf912af9543))


### 🚀  Features

* add and expose enterLeaveOpacityAnimation ([0f6c204](https://github.com/valentingavran/anglify/commit/0f6c204ca2cc5ba87e03c3222627d5fd4b390ee3))
* add breakpoint observer service ([158058b](https://github.com/valentingavran/anglify/commit/158058ba18511815ff6aef1d861313eeec6066da))
* add breakpoints scss mixin ([6e6c984](https://github.com/valentingavran/anglify/commit/6e6c98421642ab72cd7d891d894a4b3c5981a8d7))
* add color secondary variant & adjust color secondary ([7ae9be8](https://github.com/valentingavran/anglify/commit/7ae9be80423b473523cd138da874975be754f5b2))
* add tab component ([b38cc88](https://github.com/valentingavran/anglify/commit/b38cc88da2c3462f9a1fb683ccc9180a43522077))
* **Lists:** add `nav` property that enables a different display mode ([dbe8dc7](https://github.com/valentingavran/anglify/commit/dbe8dc7f2c979839eae6cc0148db7f8d4d607670))


### 📝  Docs

* add application layout examples ([381b001](https://github.com/valentingavran/anglify/commit/381b00188f17c7f6fad31bc2c036093b67cbfefa))
* add feature group inside the navigation drawer ([48d5d44](https://github.com/valentingavran/anglify/commit/48d5d44e08fc2aafdb4e053e4ef169f0398fbe3f))
* add page meta description & meta keywords using package.json info ([95d9785](https://github.com/valentingavran/anglify/commit/95d97858c37a8e7ac6ae358266cca7ad38f203c0))
* adjust navigation drawer examples ([ef4f3df](https://github.com/valentingavran/anglify/commit/ef4f3df53960003641193eda3316710cc51b8563))
* extract component pages into own module ([9d448a7](https://github.com/valentingavran/anglify/commit/9d448a71f471ef6a429198c21019bdeea33a6f2d))
* introduce app layouts that can be set for each route individually ([61aba71](https://github.com/valentingavran/anglify/commit/61aba71a4c3db903d3b77056557e3370f23b0fb9))
* optimize docs for all screen sizes ([b397b02](https://github.com/valentingavran/anglify/commit/b397b02ffcbb6716c28f66f566b8650d8c0c963b))


### 🔬  Code Refactoring

* **List:** move exact responsibility from list group to list items ([cb50203](https://github.com/valentingavran/anglify/commit/cb5020341538908b6a0ae20deb0ed6dc1849c1ff))
* **NavigationDrawer:** make it usable in complex app layouts ([208f40b](https://github.com/valentingavran/anglify/commit/208f40b0e366b726cc6b03b0e92065082bd47b0a))
* **NavigationDrawer:** rename NavDrawer to NavigationDrawer ([8cf9124](https://github.com/valentingavran/anglify/commit/8cf91248461f511adbdcd9b804cc0401e2527b52))
* **Tooltip:** add tooltipConfig input property and remove others ([db28b96](https://github.com/valentingavran/anglify/commit/db28b960f71b6295a0e65ef592d31eda51706fda))

### [0.20.2](https://github.com/valentingavran/anglify/compare/v0.20.1...v0.20.2) (2022-05-27)


### 🐛  Bug Fixes

* detach dialog and snackbars properly ([4c2b632](https://github.com/valentingavran/anglify/commit/4c2b632273f00a00689cdcaf83518253670dd3ca))

### [0.20.1](https://github.com/valentingavran/anglify/compare/v0.20.0...v0.20.1) (2022-05-25)


### 🔬  Code Refactoring

* simplify dialog and snackbar services ([82bdd7b](https://github.com/valentingavran/anglify/commit/82bdd7be0c2e88fe52abaf47748701311525bb61))


### 🐛  Bug Fixes

* **Icon:** custom icons are now displayed in safari ([76a59ef](https://github.com/valentingavran/anglify/commit/76a59ef2560bdb3973bcc078654deed866b998fa))

## [0.20.0](https://github.com/valentingavran/anglify/compare/v0.19.0...v0.20.0) (2022-05-25)


### ⚠ BREAKING CHANGES

* **ColorSystem:** The color system has been revised. `--color-on-primary`, `--color-on-secondary` &
`--color-on-bar` have been removed, they are covered by the respective `--color-on-*-high-emphasis`
colors. `--color-secondary-variant` has been removed and `--color-secondary` is instead used where
needed. `--color-background-tooltip` has also been removed. The tooltip and snackbar color can now
be customized by the `--color-inverse-surface` color (and the matching font colors).
* **Icon:** The `--anglify-icon-inactive-color` and `--anglify-icon-active-color` properties
of the icon component have been removed and replaced by the `--anglify-icon-color` property.
* The type system has been completely revised. As a result, existing custom font
properties of components have been either removed or unnamed. Now you can override the fonts either
globally or on component level and style them as you wish.
* **Button:** The `--anglify-hover-state-color` and `--anglify-focus-state-color` properties of
the button were renamed to `--anglify-button-hover-state-color` and
`--anglify-button-focus-state-color`
* **Icon:** The `--anglify-icon-size` css property was removed, because the icon size can be
overwritten by the different size properties (for example: `--anglify-icon-size-regular: 2rem)`

### 🚀  Features

* composables can now also be used outside the library ([337cb60](https://github.com/valentingavran/anglify/commit/337cb60bf8d170965a0fd424f9a1c0dbb3471c28))
* internal animations are now exported for own usage ([6cd8790](https://github.com/valentingavran/anglify/commit/6cd87906f1fb740ae3d229171c8719a42acd0f61))
* **List:** add line clamp css props for list item title & description ([80ac6fc](https://github.com/valentingavran/anglify/commit/80ac6fc5b4a867617c4ab1d030d08470e3c3b6d7))
* **ListItem:** add hover and focus state colors ([87b3b0e](https://github.com/valentingavran/anglify/commit/87b3b0e3096fe35d5eb98860bf926c9815ae0aa6))
* **ListItem:** add possibility to either match exact URL or partial ([94fca33](https://github.com/valentingavran/anglify/commit/94fca33c450be6dd060a42c9b84a659de4543785))
* **ListItem:** text has now primary color when item active ([43c95e3](https://github.com/valentingavran/anglify/commit/43c95e34e4d6ead673e05bb99f03c0006e996c36))
* **ProgressLinear:** provide SettingsToken ([ecddf33](https://github.com/valentingavran/anglify/commit/ecddf33cf4eb1f455ddfe05ebe2f343e1400ce7e))
* **Toolbar:** add elevation property ([e8c61ca](https://github.com/valentingavran/anglify/commit/e8c61ca15ac38868c71bfa140661925fa913df5f))


### 🛠  Other Commits

* adjust changelog generation ([7d9381d](https://github.com/valentingavran/anglify/commit/7d9381d84b82fb64b1b50bc803b747facf87c5a8))
* extend stylelint config so that style properties get sorted ([d611a28](https://github.com/valentingavran/anglify/commit/d611a286dc2568355aa3dc4a0cc6c1d8ad850b4a))


### 🐛  Bug Fixes

* **Badge:** short badges are now completely round ([a3f855f](https://github.com/valentingavran/anglify/commit/a3f855f7c8d531da47510ff17d082e76dc2fc8a9))
* **Button:** make transparent default background of outlined buttons ([e76eda4](https://github.com/valentingavran/anglify/commit/e76eda481283ecf0f26bc29422806e67f5e3cbae))
* **FormField:** outlined label properties are now displayed correctly ([543f986](https://github.com/valentingavran/anglify/commit/543f986be8eb47c191cb5a5d4c39eb86f61af11e))
* internalIcons change automatically according to set default iconSet ([0ace0c5](https://github.com/valentingavran/anglify/commit/0ace0c5db7b27a2cc8db65fb1bfe05bc99262b0a))
* **Ripple:** the origin is now calculated correctly ([8146344](https://github.com/valentingavran/anglify/commit/814634449b9b8e22a490d9fc039405f6eb4bfd0b))
* **SettingsFactory:** settings of components are now deep merged ([25608e3](https://github.com/valentingavran/anglify/commit/25608e3261dc3ad31dc123373b243b183a1840f6))
* **Stepper:** fix hover and active state of stepper header ([3d61e22](https://github.com/valentingavran/anglify/commit/3d61e2216742dc0b0aad0930d725956915f10e0f))
* **Stepper:** make active step indicator color configurable ([9e04965](https://github.com/valentingavran/anglify/commit/9e049659657cb225a01d569c092817ad7e4ef43f))


### 🔬  Code Refactoring

* **Button:** change hover and focus css custom property names ([4751fe2](https://github.com/valentingavran/anglify/commit/4751fe2b1d19720920b6935f64a11b5e3fb4d6c0))
* **Checkbox:** remove internal input element ([07c2637](https://github.com/valentingavran/anglify/commit/07c2637d7cc606d86efa5868714ce8dc29952605))
* **ColorSystem:** remove & add some global colors ([9ef4fbe](https://github.com/valentingavran/anglify/commit/9ef4fbefa688edffafcf1ae909d3ed10a406ff3e))
* **Icon:** remove --anglify-icon-size css property ([0431179](https://github.com/valentingavran/anglify/commit/04311796062cc8060656552aa0def8e6fef1bcbb))
* **Icon:** replace active and inactive color through simple color ([85474a2](https://github.com/valentingavran/anglify/commit/85474a21943eddc22473a7b5816b39d0eebf4bd9))
* introduce "Entire*" types for every component ([7f02ab7](https://github.com/valentingavran/anglify/commit/7f02ab738573b386060b2e758d85817549e4beb5))
* **ProgressLinear:** remove unused ProgressLinearMode interface ([6af324a](https://github.com/valentingavran/anglify/commit/6af324a971662ccb6ce358e76dade4cee3da86f4))
* the typography system was completely revised ([1e0a043](https://github.com/valentingavran/anglify/commit/1e0a043c549f56f5e7dc54386d69e38d9951180f))
* **Toolbar:** remove unused navigation input property ([6228d1f](https://github.com/valentingavran/anglify/commit/6228d1fc94e7eb78ed2fe6fbe1c8da73808c2148))

## [0.19.0](https://github.com/valentingavran/anglify/compare/v0.18.1...v0.19.0) (2022-05-19)


### ⚠ BREAKING CHANGES

* By default, the bars now use the global `--color-bar` CSS custom property for the
background color. This also changed the background color of the bars in dark mode to a grey tone.
* In order to set an error manually on untouched FormFields, the FormField must now
be marked as dirty beforehand with the FormControl method `markAsDirty()`. Otherwise the error will
not be displayed.

### 🐛  Bug Fixes

* dark theme colors across all components ([b8a30b5](https://github.com/valentingavran/anglify/commit/b8a30b52c8a89cfb6469874a42a3401c39560921))
* form field error state checking ([99def9e](https://github.com/valentingavran/anglify/commit/99def9e51a1825c2d2bb0efdb89db13b8ff181e7))
* position service window resize position bug ([fc7ebcd](https://github.com/valentingavran/anglify/commit/fc7ebcd43331f2cf3425074e2a2b2586c8bd5bfe))


### 🚀  Features

* add item group component ([7ada336](https://github.com/valentingavran/anglify/commit/7ada336fa8b3540387bead72b2edb02ecd72cf7c))
* badge component ([d35b256](https://github.com/valentingavran/anglify/commit/d35b2569fbaf87a48d2e71a02a316b8f5d854ad5))
* chip ([e26cd53](https://github.com/valentingavran/anglify/commit/e26cd5386ebcc466df10fa3d70fcac6f92b7adb3))
* list group collapsing ([b3fe51c](https://github.com/valentingavran/anglify/commit/b3fe51c6d79e96671966b58c84a9202bc281a730))
* set color of Anglify icons in tooltips the same as the text color ([ce1a99d](https://github.com/valentingavran/anglify/commit/ce1a99d516c8f487420fb27afe70a1e0c91d82bd))
* snackbar ([53413d0](https://github.com/valentingavran/anglify/commit/53413d05b5604b301884fb5e90783fd002a951fb))
* **Tooltip:** possibility to activate/deactivate shift & flip ([a4708a4](https://github.com/valentingavran/anglify/commit/a4708a4de79ec133e91eca8833455dea44d62ddf))


### 📝  Docs

* add references to material.io and other pages to every component ([6030d3f](https://github.com/valentingavran/anglify/commit/6030d3f1c32d1118e6d2a41696c61899752fa199))
* improve examples and code quality ([a0419b8](https://github.com/valentingavran/anglify/commit/a0419b85e894e1192da7205bf8e7eaebd2cd17bc))
* remove active group in navigation drawer ([b3fbcf3](https://github.com/valentingavran/anglify/commit/b3fbcf359a76836a66ff8902f3acb2401864f901))
* remove button sizing example ([45d3f52](https://github.com/valentingavran/anglify/commit/45d3f52023d088b5909ffc3a1102d30773283084))

### [0.18.1](https://github.com/valentingavran/anglify/compare/v0.18.0...v0.18.1) (2022-05-19)


### 🐛  Bug Fixes

* replace absolute paths inside bottom navigation component ([d7101e1](https://github.com/valentingavran/anglify/commit/d7101e145206324f74793c4ca294834ac2dfc58d))

## [0.18.0](https://github.com/valentingavran/anglify/compare/v0.17.2...v0.18.0) (2022-05-13)


### ⚠ BREAKING CHANGES

* Themes are now mixins and do not manipulate the root element directly. At the point where you want
to add the theme variables, you must now call the mixin with `@include light-theme;`

    ```scss
    @use 'node_modules/@anglify/components/styles/themes/light' as *;

    :root {
        @include light-theme;
    }
    ```
- Removal of `elevated` button style.
  - There is no reason for us to do this, we can already use the elevation utility for this.
- Rename of `filled` button style to `contained` as per material spec.
- Removal of `filled-tonal` button style.
  - We can already handle changing the button color and text color within just a certain button
    really easily, no need to do this.
- Removal of `sizing` property on buttons.
  - We can handle changing the button size with CSS rather easily too, no need to do all out here
    and change it weirdly with props to have 5 fixed sizes.
- Removal of `sizing` property on fab buttons.
  - See above.

### ✨  Styles

* cleanup return types, add missing spacing ([0d48b9b](https://github.com/valentingavran/anglify/commit/0d48b9b5262ce3684ba889b5b070392910ca88b7))


### 🔬  Code Refactoring

* material spec 2 ([bf2cfc2](https://github.com/valentingavran/anglify/commit/bf2cfc2098b334485ba5d9cec05d7b76d08c48af))
* themes to be mixins ([bafeb7f](https://github.com/valentingavran/anglify/commit/bafeb7f9005974067a9ff8fe6947081183dd0ace))


### 🐛  Bug Fixes

* improve spacing in form fields ([f11a971](https://github.com/valentingavran/anglify/commit/f11a971d634ad0145a2abfa9a94413fefc77df2b))
* typographies should not have predefined colors ([813ea7d](https://github.com/valentingavran/anglify/commit/813ea7d173692325bf058786aaf275a2d44fbf39))


### 🛠  Other Commits

* add husky pre-commit checks ([3f3ed9c](https://github.com/valentingavran/anglify/commit/3f3ed9cdd02507c73df47b10d915bf3032af41f4))
* add stylelint ([c36fc84](https://github.com/valentingavran/anglify/commit/c36fc840351deec8c1d821297eedf2b294e15467))
* upgrade deps ([1066138](https://github.com/valentingavran/anglify/commit/10661382104948452f2c6f81e1b7f063194f02c8))


### 🚀  Features

* bottom navigation ([3515ce9](https://github.com/valentingavran/anglify/commit/3515ce9297f75cfb121c302d68acfa8114682344))
* dark theme ([5e6c87d](https://github.com/valentingavran/anglify/commit/5e6c87df3ed4e792a72e52d820af6cb8ea1b0317))
* **Stepper:** use anglify icon internally by default ([77409c1](https://github.com/valentingavran/anglify/commit/77409c16cf5625d9691e23b3ca9943ff72d6d2bb)), closes [#119](https://github.com/valentingavran/anglify/issues/119)
* toolbar ([65e9d28](https://github.com/valentingavran/anglify/commit/65e9d28f2945e3a122485f7f7e66a75422e30a06))


### 📝  Docs

* add common-tags for easier insertion of values ([9198bcb](https://github.com/valentingavran/anglify/commit/9198bcb04e45ed13bdb14e94f83692106a710b35))
* fix form field readonly example ([2e3f815](https://github.com/valentingavran/anglify/commit/2e3f8151e3ce65982f8c721d2bb58e3e596638f6))

### [0.17.2](https://github.com/valentingavran/anglify/compare/v0.17.1...v0.17.2) (2022-05-06)


### 🔄  Reverts

* export missing util functions ([9f02644](https://github.com/valentingavran/anglify/commit/9f026441573fe977125b39157ef856249149de83))


### 🐛  Bug Fixes

* change absolute import paths to relative ones in some places ([f733ed3](https://github.com/valentingavran/anglify/commit/f733ed3ac66bb302ce487b5e425d31b8978e7ef3))


### 🛠  Other Commits

* **release:** 0.17.2 ([53e996e](https://github.com/valentingavran/anglify/commit/53e996ebf24566932a3f1321b3cd13e32039955d))
* **release:** 0.17.2 ([debf753](https://github.com/valentingavran/anglify/commit/debf753f8537e81515b150150fccaf0a540589ca))

### [0.17.1](https://github.com/valentingavran/anglify/compare/v0.17.0...v0.17.1) (2022-05-06)


### 🐛  Bug Fixes

* export missing util functions ([c3d6046](https://github.com/valentingavran/anglify/commit/c3d6046fe868ef69ce314429653ba036caaeb19f))

## [0.17.0](https://github.com/valentingavran/anglify/compare/v0.16.0...v0.17.0) (2022-05-06)


### ⚠ BREAKING CHANGES

* There were many identical directives which exported only the TemplateRef. There
were also places where no TemplateRefs were used at all (instad only normal selectors). This has
now been standardized. At the respective places one must now use
`<ng-template slot="...">...</ng-template>`. The slot name is passed via the slot attribute

### 🛠  Other Commits

* improve pull request and issue templates ([af08084](https://github.com/valentingavran/anglify/commit/af08084ef5549ecfc271bbf807d01c4ac7a71753))
* test anglify library when running npm run test ([b0fd37a](https://github.com/valentingavran/anglify/commit/b0fd37afcb4239f0322f111f6a63d11ae045edf5))


### 🔬  Code Refactoring

* improve filterEmpty function typing ([0d44ab7](https://github.com/valentingavran/anglify/commit/0d44ab77108ad470921ec554dba60945c5a4c092))
* **ListItemGroup:** store only active element count ([633e4dd](https://github.com/valentingavran/anglify/commit/633e4dd745bd9193f853a2c8c7994b048254ab05))
* move pipe module into module folder & rename it ([1d56c0f](https://github.com/valentingavran/anglify/commit/1d56c0fd06d9ecbf941937d8336d239c3d664f4e))
* unify content projection ([fab3c18](https://github.com/valentingavran/anglify/commit/fab3c1829a425175a991ad9621e79761dad74177))


### 🚀  Features

* **List:** add list group component ([df1bd6c](https://github.com/valentingavran/anglify/commit/df1bd6cc7fdf5c4a7b63f52501fa7c6ac337cd8d))
* **ListItem:** router link support ([9226ea1](https://github.com/valentingavran/anglify/commit/9226ea1d77c135200f762136464151e83b91266c))


### 📝  Docs

* add navigation drawer and remove home page ([cb06932](https://github.com/valentingavran/anglify/commit/cb0693203d10dfe645e764f2e03bc3a0015dec23))
* update contributing guide ([3f514a5](https://github.com/valentingavran/anglify/commit/3f514a5ee6c041b9d4aae9e33b325c646f114872))

## [0.16.0](https://github.com/valentingavran/anglify/compare/v0.15.1...v0.16.0) (2022-05-03)


### ⚠ BREAKING CHANGES

* **Checkbox:** The internally unused checkbox CSS custom properties
`--anglify-checkbox-checked-hover-color` & `--anglify-checkbox-checked-hover-border-color` were
removed.
* **NavigationDrawer:** The drawer padding custom CSS property was removed. Users can easily add this with
their own containers if needed. Therefore this was removed.
* **SettingTokens:** Other settings use boolean but in some places BooleanLike was used. This has now
been unified. BooleanLike only makes sense in templates.

### 🚀  Features

* add observable HostBinding helper methods ([7ec1793](https://github.com/valentingavran/anglify/commit/7ec17935fb1b2e4adb3651cdef066deb6c68d4c4)), closes [#108](https://github.com/valentingavran/anglify/issues/108)
* **Checkbox:** readonly input property ([357ff92](https://github.com/valentingavran/anglify/commit/357ff922c9085fb133e19974246462b21a1f3d99))
* **ListItem:** add active state which can be toggled ([8b7fa08](https://github.com/valentingavran/anglify/commit/8b7fa08db4c46c1ba48297ddd586fecce6c12bd6))
* **ListItem:** make text non-selectable  ([2e71ef2](https://github.com/valentingavran/anglify/commit/2e71ef2c11f0f2283e4fe18464b680a23c92fbf2))
* **Lists:** add ListItemGroup component ([81a754d](https://github.com/valentingavran/anglify/commit/81a754d9601740fbdb3a7e7ad768cd254d4d24fa))
* possibility to disable component states ([0d9b2b8](https://github.com/valentingavran/anglify/commit/0d9b2b8140476254793d252cacdcd7685ab8edf3))


### ✨  Styles

* **ListItem:** add padding & adjust normal and dense size ([2270d74](https://github.com/valentingavran/anglify/commit/2270d74d3169e14cb4ef7d8e61f1f6820393e152))
* **List:** make list a block element ([491b203](https://github.com/valentingavran/anglify/commit/491b203feeee1fd1783554f50f2de7b1cc9fb67f))


### 📝  Docs

* **List:** add list item group examples ([125b289](https://github.com/valentingavran/anglify/commit/125b289758ae9d575a45a383aa1907d90dbf312a))


### 🛠  Other Commits

* change release notes structure ([82f40cc](https://github.com/valentingavran/anglify/commit/82f40cc28495eb628363d5ee9eb74e88908b0e26))


### 🐛  Bug Fixes

* **Checkbox:** hovering over label does not change interaction state ([65dfd19](https://github.com/valentingavran/anglify/commit/65dfd19e2df68ff8ef204e306e27c1dfad7e38fa)), closes [#115](https://github.com/valentingavran/anglify/issues/115)
* **NavigationDrawer:** sticky drawer property works now as expected ([93edef3](https://github.com/valentingavran/anglify/commit/93edef37da7c61b7cb00e115e34d41e215bcdd4f))


### 🔬  Code Refactoring

* **Checkbox:** remove unused CSS custom properties ([a426b72](https://github.com/valentingavran/anglify/commit/a426b727fdafa01dec2bcde189ad5c8bdea7a6b5))
* **NavigationDrawer:** remove custom drawer padding css property ([3f7616c](https://github.com/valentingavran/anglify/commit/3f7616c3a7620e159969ed141e9a17dfbd793d18))
* rewrite position service to use floating-ui lib ([fea8e81](https://github.com/valentingavran/anglify/commit/fea8e817b1597712e5a25ca70a8fd7878c97cf35))
* **SettingTokens:** change BooleanLike setting types to boolean ([327f08a](https://github.com/valentingavran/anglify/commit/327f08aba951c99d529166ba126187ba344bc773))

### [0.15.1](https://github.com/valentingavran/anglify/compare/v0.15.0...v0.15.1) (2022-05-02)


### 🛠  Other Commits

* add contributing guide ([9e1734c](https://github.com/valentingavran/anglify/commit/9e1734cdd0318917d511c0324a848a70fa680635))
* add GitHub issue templates ([9ade2fd](https://github.com/valentingavran/anglify/commit/9ade2fd2e98d01ac9a552fb5fa3968fdc9e26cb0))
* add GitHub pull request template ([fb24380](https://github.com/valentingavran/anglify/commit/fb2438095af7146ee1c1510f3d201c3e9e367171))
* add husky, commitlint & standard-version ([e5cd933](https://github.com/valentingavran/anglify/commit/e5cd93379f72d3d252157732cdc319e3146ad1da))
* run CSS variable extractor when starting dev environment ([6e24b7a](https://github.com/valentingavran/anglify/commit/6e24b7a4abe60e4ce13b6311a4d8857d0795e69c))
