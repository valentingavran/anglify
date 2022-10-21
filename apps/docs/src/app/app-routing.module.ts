import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';

@Component({ template: '', styles: [], standalone: true, changeDetection: ChangeDetectionStrategy.OnPush })
export class TemplateComponent {}

const routes: Routes = [
  {
    path: '',
    // eslint-disable-next-line promise/prefer-await-to-then, @typescript-eslint/promise-function-async
    loadComponent: () => import('./layouts/default/default.component').then(mod => mod.DefaultComponent),
    children: [
      {
        path: '',
        redirectTo: 'getting-started/installation',
        pathMatch: 'full',
      },
      {
        path: 'getting-started',
        children: [
          {
            path: 'installation',
            component: TemplateComponent,
            title: 'Installation | Anglify',
          },
          {
            path: 'application-layouts',
            component: TemplateComponent,
            title: 'Application Layouts | Anglify',
          },
          {
            path: 'release-notes',
            component: TemplateComponent,
            title: 'Release Notes | Anglify',
          },
        ],
      },
      {
        path: 'features',
        children: [
          {
            path: 'theming',
            component: TemplateComponent,
            title: 'Theming | Anglify',
          },
          {
            path: 'icon-fonts',
            component: TemplateComponent,
            title: 'Icon Fonts | Anglify',
          },
          {
            path: 'breakpoints',
            component: TemplateComponent,
            title: 'Breakpoints | Anglify',
          },
          {
            path: 'typography',
            component: TemplateComponent,
            title: 'Typography | Anglify',
          },
        ],
      },
      {
        path: 'components',
        children: [
          {
            path: 'autocomplete',
            component: TemplateComponent,
            title: 'Autocomplete | Anglify',
          },
          {
            path: 'badge',
            component: TemplateComponent,
            title: 'Badge | Anglify',
          },
          {
            path: 'bottom-navigation',
            component: TemplateComponent,
            title: 'Bottom Navigation | Anglify',
          },
          {
            path: 'breadcrumbs',
            component: TemplateComponent,
            title: 'Breadcrumbs | Anglify',
          },
          {
            path: 'button',
            component: TemplateComponent,
            title: 'Button | Anglify',
          },
          {
            path: 'button-group',
            component: TemplateComponent,
            title: 'Button Group | Anglify',
          },
          {
            path: 'card',
            component: TemplateComponent,
            title: 'Card | Anglify',
          },
          {
            path: 'checkbox',
            component: TemplateComponent,
            title: 'Checkbox | Anglify',
          },
          {
            path: 'chip',
            component: TemplateComponent,
            title: 'Chip | Anglify',
          },
          {
            path: 'combobox',
            component: TemplateComponent,
            title: 'Combobox | Anglify',
          },
          {
            path: 'data-table',
            component: TemplateComponent,
            title: 'Data Table | Anglify',
          },
          {
            path: 'dialog',
            component: TemplateComponent,
            title: 'Dialog | Anglify',
          },
          {
            path: 'divider',
            component: TemplateComponent,
            title: 'Divider | Anglify',
          },
          {
            path: 'expansion-panels',
            component: TemplateComponent,
            title: 'Expansion Panels | Anglify',
          },
          {
            path: 'icon',
            component: TemplateComponent,
            title: 'Icon | Anglify',
          },
          {
            path: 'item-group',
            component: TemplateComponent,
            title: 'Item Group | Anglify',
          },
          {
            path: 'list',
            component: TemplateComponent,
            title: 'List | Anglify',
          },
          {
            path: 'menu',
            component: TemplateComponent,
            title: 'Menu | Anglify',
          },
          {
            path: 'navigation-drawer',
            component: TemplateComponent,
            title: 'Navigation Drawer | Anglify',
          },
          {
            path: 'otp-input',
            component: TemplateComponent,
            title: 'OTP Input | Anglify',
          },
          {
            path: 'progress-circular',
            component: TemplateComponent,
            title: 'Progress Circular | Anglify',
          },
          {
            path: 'progress-linear',
            component: TemplateComponent,
            title: 'Progress Linear | Anglify',
          },
          {
            path: 'radio-button',
            component: TemplateComponent,
            title: 'Radio Button | Anglify',
          },
          {
            path: 'select',
            component: TemplateComponent,
            title: 'Select | Anglify',
          },
          {
            path: 'snackbar',
            component: TemplateComponent,
            title: 'Snackbar | Anglify',
          },
          {
            path: 'stepper',
            component: TemplateComponent,
            title: 'Stepper | Anglify',
          },
          {
            path: 'simple-table',
            component: TemplateComponent,
            title: 'Simple Table | Anglify',
          },
          {
            path: 'slider',
            component: TemplateComponent,
            title: 'Slider | Anglify',
          },
          {
            path: 'tabs',
            component: TemplateComponent,
            title: 'Tabs | Anglify',
          },
          {
            path: 'text-area',
            component: TemplateComponent,
            title: 'Text Area | Anglify',
          },
          {
            path: 'text-field',
            component: TemplateComponent,
            title: 'Text Field | Anglify',
          },
          {
            path: 'timeline',
            component: TemplateComponent,
            title: 'Timeline | Anglify',
          },
          {
            path: 'toolbar',
            component: TemplateComponent,
            title: 'Toolbar | Anglify',
          },
          {
            path: 'tooltip',
            component: TemplateComponent,
            title: 'Tooltip | Anglify',
          },
        ],
      },
    ],
  },
  {
    path: 'examples/layouts',
    // eslint-disable-next-line @typescript-eslint/promise-function-async, promise/prefer-await-to-then
    loadComponent: () => import('./layouts/blank/blank.component').then(mod => mod.BlankComponent),
    children: [
      {
        path: '',
        children: [
          {
            path: 'base',
            // eslint-disable-next-line @typescript-eslint/promise-function-async, promise/prefer-await-to-then
            loadComponent: () => import('./layout-examples/base/base.component').then(mod => mod.BaseComponent),
            title: 'Base Layout Example | Anglify',
          },
          {
            path: 'constrained',
            // eslint-disable-next-line @typescript-eslint/promise-function-async, promise/prefer-await-to-then
            loadComponent: () => import('./layout-examples/constrained/constrained.component').then(mod => mod.ConstrainedComponent),
            title: 'Constrained Layout Example | Anglify',
          },
          {
            path: 'tabs',
            // eslint-disable-next-line @typescript-eslint/promise-function-async, promise/prefer-await-to-then
            loadComponent: () => import('./layout-examples/tabs/tabs.component').then(mod => mod.TabsComponent),
            title: 'Tabs Layout Example | Anglify',
            children: [
              {
                path: '**',
                component: TemplateComponent,
              },
            ],
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
