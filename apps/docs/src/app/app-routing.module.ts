import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonPageComponent } from './pages/component-pages/button-page/button-page.component';
import { CardPageComponent } from './pages/component-pages/card-page/card-page.component';
import { CheckBoxPageComponent } from './pages/component-pages/checkbox-page/checkbox-page.component';
import { FormFieldPageComponent } from './pages/component-pages/form-field-page/form-field-page.component';
import { IconPageComponent } from './pages/component-pages/icon-page/icon-page.component';
import { ListPageComponent } from './pages/component-pages/list-page/list-page.component';
import { MenuPageComponent } from './pages/component-pages/menu-page/menu-page.component';
import { OverlayPageComponent } from './pages/component-pages/overlay-page/overlay-page.component';
import { ProgressCircularPageComponent } from './pages/component-pages/progress-circular-page/progress-circular-page.component';
import { ProgressLinearPageComponent } from './pages/component-pages/progress-linear-page/progress-linear-page.component';
import { StepperComponent } from './pages/component-pages/stepper/stepper.component';
import { TablePageComponent } from './pages/component-pages/table-page/table-page.component';
import { TooltipPageComponent } from './pages/component-pages/tooltip-page/tooltip-page.component';
import { HomeComponent } from './pages/home/home.component';
import { InstallationComponent } from './pages/installation/installation.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'getting-started/installation',
    component: InstallationComponent,
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
    path: 'components/form-field',
    component: FormFieldPageComponent,
  },
  {
    path: 'components/icon',
    component: IconPageComponent,
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
    path: 'components/overlay',
    component: OverlayPageComponent,
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
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
