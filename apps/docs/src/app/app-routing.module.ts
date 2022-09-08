import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({ template: '', styles: [], standalone: true })
export class TemplateComponent {}

const routes: Routes = [
  {
    path: '',
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
    loadComponent: () => import('./layouts/blank/blank.component').then(mod => mod.BlankComponent),
    children: [
      {
        path: '',
        children: [
          {
            path: 'base',
            loadComponent: () => import('./layout-examples/base/base.component').then(mod => mod.BaseComponent),
            title: 'Base Layout Example | Anglify',
          },
          {
            path: 'constrained',
            loadComponent: () => import('./layout-examples/constrained/constrained.component').then(mod => mod.ConstrainedComponent),
            title: 'Constrained Layout Example | Anglify',
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
