import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BottomNavigationPageComponent } from './pages/component-pages/bottom-navigation-page/bottom-navigation-page.component';
import { ButtonPageComponent } from './pages/component-pages/button-page/button-page.component';
import { CardPageComponent } from './pages/component-pages/card-page/card-page.component';
import { CheckBoxPageComponent } from './pages/component-pages/checkbox-page/checkbox-page.component';
import { DialogPageComponent } from './pages/component-pages/dialog-page/dialog-page.component';
import { FormFieldPageComponent } from './pages/component-pages/form-field-page/form-field-page.component';
import { IconPageComponent } from './pages/component-pages/icon-page/icon-page.component';
import { ItemGroupPageComponent } from './pages/component-pages/item-group-page/item-group-page.component';
import { ListPageComponent } from './pages/component-pages/list-page/list-page.component';
import { MenuPageComponent } from './pages/component-pages/menu-page/menu-page.component';
import { NavDrawerPageComponent } from './pages/component-pages/nav-drawer-page/nav-drawer-page.component';
import { ProgressCircularPageComponent } from './pages/component-pages/progress-circular-page/progress-circular-page.component';
import { ProgressLinearPageComponent } from './pages/component-pages/progress-linear-page/progress-linear-page.component';
import { RadioButtonPageComponent } from './pages/component-pages/radio-button-page/radio-button-page.component';
import { SnackbarPageComponent } from './pages/component-pages/snackbar-page/snackbar-page.component';
import { StepperComponent } from './pages/component-pages/stepper/stepper.component';
import { TablePageComponent } from './pages/component-pages/table-page/table-page.component';
import { ToolbarPageComponent } from './pages/component-pages/toolbar-page/toolbar-page.component';
import { TooltipPageComponent } from './pages/component-pages/tooltip-page/tooltip-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'getting-started/installation',
    pathMatch: 'full',
  },
  {
    path: 'components/button',
    component: ButtonPageComponent,
  },
  {
    path: 'components/card',
    component: CardPageComponent,
  },
  {
    path: 'components/checkbox',
    component: CheckBoxPageComponent,
  },
  {
    path: 'components/dialog',
    component: DialogPageComponent,
  },
  {
    path: 'components/form-field',
    component: FormFieldPageComponent,
  },
  {
    path: 'components/icon',
    component: IconPageComponent,
  },
  {
    path: 'components/item-group',
    component: ItemGroupPageComponent,
  },
  {
    path: 'components/list',
    component: ListPageComponent,
  },
  {
    path: 'components/menu',
    component: MenuPageComponent,
  },
  {
    path: 'components/nav-drawer',
    component: NavDrawerPageComponent,
  },
  {
    path: 'components/progress-circular',
    component: ProgressCircularPageComponent,
  },
  {
    path: 'components/progress-linear',
    component: ProgressLinearPageComponent,
  },
  {
    path: 'components/radio-button',
    component: RadioButtonPageComponent,
  },
  {
    path: 'components/snackbar',
    component: SnackbarPageComponent,
  },
  {
    path: 'components/stepper',
    component: StepperComponent,
  },
  {
    path: 'components/table',
    component: TablePageComponent,
  },
  {
    path: 'components/tooltip',
    component: TooltipPageComponent,
  },
  {
    path: 'components/toolbar',
    component: ToolbarPageComponent,
  },
  {
    path: 'components/bottom-navigation',
    component: BottomNavigationPageComponent,
  },
  {
    path: 'getting-started',
    loadChildren: () => import('./pages/getting-started/getting-started.module').then(m => m.GettingStartedModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
