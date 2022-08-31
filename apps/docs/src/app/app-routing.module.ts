import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
            loadComponent: () =>
              import('./pages/getting-started/installation/installation.component').then(mod => mod.InstallationComponent),
            title: 'Installation | Anglify',
          },
          {
            path: 'application-layouts',
            loadComponent: () => import('./pages/getting-started/layouts/layouts.component').then(mod => mod.LayoutsComponent),
            title: 'Application Layouts | Anglify',
          },
          {
            path: 'release-notes',
            loadComponent: () => import('./pages/getting-started/changelog/release-notes.component').then(mod => mod.ReleaseNotesComponent),
            title: 'Release Notes | Anglify',
          },
        ],
      },
      {
        path: 'features',
        children: [
          {
            path: 'theming',
            loadComponent: () => import('./pages/features/theming/theming.component').then(mod => mod.ThemingComponent),
            title: 'Theming | Anglify',
          },
          {
            path: 'icon-fonts',
            loadComponent: () => import('./pages/features/icon-fonts/icon-fonts.component').then(mod => mod.IconFontsComponent),
            title: 'Icon Fonts | Anglify',
          },
          {
            path: 'breakpoints',
            loadComponent: () => import('./pages/features/breakpoints/breakpoints.component').then(mod => mod.BreakpointsComponent),
            title: 'Breakpoints | Anglify',
          },
        ],
      },
      {
        path: 'components',
        children: [
          {
            path: 'autocomplete',
            loadComponent: () =>
              import('./pages/components/autocomplete-page/autocomplete-page.component').then(mod => mod.AutocompletePageComponent),
            title: 'Autocomplete | Anglify',
          },
          {
            path: 'badge',
            loadComponent: () => import('./pages/components/badge-page/badge-page.component').then(mod => mod.BadgePageComponent),
            title: 'Badge | Anglify',
          },
          {
            path: 'bottom-navigation',
            loadComponent: () =>
              import('./pages/components/bottom-navigation-page/bottom-navigation-page.component').then(
                mod => mod.BottomNavigationPageComponent
              ),
            title: 'Bottom Navigation | Anglify',
          },
          {
            path: 'breadcrumbs',
            loadComponent: () =>
              import('./pages/components/breadcrumbs-page/breadcrumbs-page.component').then(mod => mod.BreadcrumbsPageComponent),
            title: 'Breadcrumbs | Anglify',
          },
          {
            path: 'button',
            loadComponent: () => import('./pages/components/button-page/button-page.component').then(mod => mod.ButtonPageComponent),
            title: 'Button | Anglify',
          },
          {
            path: 'button-group',
            loadComponent: () =>
              import('./pages/components/button-group-page/button-group-page.component').then(mod => mod.ButtonGroupPageComponent),
            title: 'Button Group | Anglify',
          },
          {
            path: 'card',
            loadComponent: () => import('./pages/components/card-page/card-page.component').then(mod => mod.CardPageComponent),
            title: 'Card | Anglify',
          },
          {
            path: 'checkbox',
            loadComponent: () => import('./pages/components/checkbox-page/checkbox-page.component').then(mod => mod.CheckBoxPageComponent),
            title: 'Checkbox | Anglify',
          },
          {
            path: 'chip',
            loadComponent: () => import('./pages/components/chip-page/chip-page.component').then(mod => mod.ChipPageComponent),
            title: 'Chip | Anglify',
          },
          {
            path: 'combobox',
            loadComponent: () => import('./pages/components/combobox-page/combobox-page.component').then(mod => mod.ComboboxPageComponent),
            title: 'Combobox | Anglify',
          },
          {
            path: 'data-table',
            loadComponent: () =>
              import('./pages/components/data-table-page/data-table-page.component').then(mod => mod.DataTablePageComponent),
            title: 'Data Table | Anglify',
          },
          {
            path: 'dialog',
            loadComponent: () => import('./pages/components/dialog-page/dialog-page.component').then(mod => mod.DialogPageComponent),
            title: 'Dialog | Anglify',
          },
          {
            path: 'expansion-panels',
            loadComponent: () =>
              import('./pages/components/expansion-panels-page/expansion-panels-page.component').then(
                mod => mod.ExpansionPanelsPageComponent
              ),
            title: 'Expansion Panels | Anglify',
          },
          {
            path: 'icon',
            loadComponent: () => import('./pages/components/icon-page/icon-page.component').then(mod => mod.IconPageComponent),
            title: 'Icon | Anglify',
          },
          {
            path: 'item-group',
            loadComponent: () =>
              import('./pages/components/item-group-page/item-group-page.component').then(mod => mod.ItemGroupPageComponent),
            title: 'Item Group | Anglify',
          },
          {
            path: 'list',
            loadComponent: () => import('./pages/components/list-page/list-page.component').then(mod => mod.ListPageComponent),
            title: 'List | Anglify',
          },
          {
            path: 'menu',
            loadComponent: () => import('./pages/components/menu-page/menu-page.component').then(mod => mod.MenuPageComponent),
            title: 'Menu | Anglify',
          },
          {
            path: 'navigation-drawer',
            loadComponent: () =>
              import('./pages/components/navigation-drawer-page/navigation-drawer-page.component').then(
                mod => mod.NavigationDrawerPageComponent
              ),
            title: 'Navigation Drawer | Anglify',
          },
          {
            path: 'otp-input',
            loadComponent: () =>
              import('./pages/components/otp-input-page/otp-input-page.component').then(mod => mod.OtpInputPageComponent),
            title: 'OTP Input | Anglify',
          },
          {
            path: 'progress-circular',
            loadComponent: () =>
              import('./pages/components/progress-circular-page/progress-circular-page.component').then(
                mod => mod.ProgressCircularPageComponent
              ),
            title: 'Progress Circular | Anglify',
          },
          {
            path: 'progress-linear',
            loadComponent: () =>
              import('./pages/components/progress-linear-page/progress-linear-page.component').then(mod => mod.ProgressLinearPageComponent),
            title: 'Progress Linear | Anglify',
          },
          {
            path: 'radio-button',
            loadComponent: () =>
              import('./pages/components/radio-button-page/radio-button-page.component').then(mod => mod.RadioButtonPageComponent),
            title: 'Radio Button | Anglify',
          },
          {
            path: 'select',
            loadComponent: () => import('./pages/components/select-page/select-page.component').then(mod => mod.SelectPageComponent),
            title: 'Select | Anglify',
          },
          {
            path: 'snackbar',
            loadComponent: () => import('./pages/components/snackbar-page/snackbar-page.component').then(mod => mod.SnackbarPageComponent),
            title: 'Snackbar | Anglify',
          },
          {
            path: 'stepper',
            loadComponent: () => import('./pages/components/stepper-page/stepper-page.component').then(mod => mod.StepperPageComponent),
            title: 'Stepper | Anglify',
          },
          {
            path: 'simple-table',
            loadComponent: () =>
              import('./pages/components/simple-table-page/simple-table-page.component').then(mod => mod.SimpleTablePageComponent),
            title: 'Simple Table | Anglify',
          },
          {
            path: 'tabs',
            loadComponent: () => import('./pages/components/tab-page/tab-page.component').then(mod => mod.TabPageComponent),
            title: 'Tabs | Anglify',
          },
          {
            path: 'text-area',
            loadComponent: () =>
              import('./pages/components/text-area-page/text-area-page.component').then(mod => mod.TextAreaPageComponent),
            title: 'Text Area | Anglify',
          },
          {
            path: 'text-field',
            loadComponent: () =>
              import('./pages/components/text-field-page/text-field-page.component').then(mod => mod.TextFieldPageComponent),
            title: 'Text Field | Anglify',
          },
          {
            path: 'timeline',
            loadComponent: () => import('./pages/components/timeline-page/timeline-page.component').then(mod => mod.TimelinePageComponent),
            title: 'Timeline | Anglify',
          },
          {
            path: 'toolbar',
            loadComponent: () => import('./pages/components/toolbar-page/toolbar-page.component').then(mod => mod.ToolbarPageComponent),
            title: 'Toolbar | Anglify',
          },
          {
            path: 'tooltip',
            loadComponent: () => import('./pages/components/tooltip-page/tooltip-page.component').then(mod => mod.TooltipPageComponent),
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
            loadComponent: () => import('./pages/layout-examples/base/base.component').then(mod => mod.BaseComponent),
            title: 'Base Layout Example | Anglify',
          },
          {
            path: 'constrained',
            loadComponent: () => import('./pages/layout-examples/constrained/constrained.component').then(mod => mod.ConstrainedComponent),
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
