# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
