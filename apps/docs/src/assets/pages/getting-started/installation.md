# Installation

If you have not already created a new Angular project, you can do so by typing:

```shell
$ npm install -g @angular/cli
$ ng new my-app
$ cd my-app
```

If you need more information on this topic, you can visit the official
[Angular CLI](https://angular.io/cli) documentation or read through
[Angular's Getting Started Guide](https://angular.io/start).

Now that you have an instantiated project, you can install the Anglify package.

```shell
$ npm install @anglify/components
```

After that you only have to import the common Anglify styles into your `styles.scss` file.

All Anglify Custom CSS properties must also be defined. You can either import the predefined light theme as shown below or define all CSS
custom properties in the root element yourself. You can learn how to style your application on the
[Theming page](/getting-started/theming)

```scss
// styles.scss
@use 'node_modules/@anglify/components/styles/index';
@use 'node_modules/@anglify/components/styles/themes/light' as *;
// ...
:root {
  @include light-theme;
}
// ...
```

Now you are ready to use the numerous Anglify components.

## Using components

In order to use a Anglify component, you first need to import the respective component module. To do this, open the module in which your
component is defined and in which you want to use an Anglify component.

After that you import the desired Anglify module and add it to the `imports` array:

```typescript
import { CardModule } from '@anglify/components';

@NgModule({
  declarations: [
    //...
  ],
  imports: [CardModule],
  providers: [
    //...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Finally, you can start using the component in the template:

```html
<anglify-card>Hello world</anglify-card>
```
