# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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


### 🛠  Other Commmits

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


### 🛠  Other Commmits

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


### 🛠  Other Commmits

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


### 🛠  Other Commmits

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

### 🛠  Other Commmits

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


### 🛠  Other Commmits

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


### 🛠  Other Commmits

* add contributing guide ([9e1734c](https://github.com/valentingavran/anglify/commit/9e1734cdd0318917d511c0324a848a70fa680635))
* add GitHub issue templates ([9ade2fd](https://github.com/valentingavran/anglify/commit/9ade2fd2e98d01ac9a552fb5fa3968fdc9e26cb0))
* add GitHub pull request template ([fb24380](https://github.com/valentingavran/anglify/commit/fb2438095af7146ee1c1510f3d201c3e9e367171))
* add husky, commitlint & standard-version ([e5cd933](https://github.com/valentingavran/anglify/commit/e5cd93379f72d3d252157732cdc319e3146ad1da))
* run CSS variable extractor when starting dev environment ([6e24b7a](https://github.com/valentingavran/anglify/commit/6e24b7a4abe60e4ce13b6311a4d8857d0795e69c))
