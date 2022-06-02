import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BadgePageComponent } from './badge-page/badge-page.component';
import { BottomNavigationPageComponent } from './bottom-navigation-page/bottom-navigation-page.component';
import { ButtonPageComponent } from './button-page/button-page.component';
import { CardPageComponent } from './card-page/card-page.component';
import { CheckBoxPageComponent } from './checkbox-page/checkbox-page.component';
import { ChipPageComponent } from './chip-page/chip-page.component';
import { DialogPageComponent } from './dialog-page/dialog-page.component';
import { FormFieldPageComponent } from './form-field-page/form-field-page.component';
import { IconPageComponent } from './icon-page/icon-page.component';
import { ItemGroupPageComponent } from './item-group-page/item-group-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { NavDrawerPageComponent } from './nav-drawer-page/nav-drawer-page.component';
import { ProgressCircularPageComponent } from './progress-circular-page/progress-circular-page.component';
import { ProgressLinearPageComponent } from './progress-linear-page/progress-linear-page.component';
import { RadioButtonPageComponent } from './radio-button-page/radio-button-page.component';
import { SnackbarPageComponent } from './snackbar-page/snackbar-page.component';
import { StepperComponent } from './stepper/stepper.component';
import { TabPageComponent } from './tab-page/tab-page.component';
import { TablePageComponent } from './table-page/table-page.component';
import { ToolbarPageComponent } from './toolbar-page/toolbar-page.component';
import { TooltipPageComponent } from './tooltip-page/tooltip-page.component';

const routes: Routes = [
  {
    path: 'button',
    component: ButtonPageComponent,
  },
  {
    path: 'card',
    component: CardPageComponent,
  },
  {
    path: 'checkbox',
    component: CheckBoxPageComponent,
  },
  {
    path: 'chip',
    component: ChipPageComponent,
  },
  {
    path: 'dialog',
    component: DialogPageComponent,
  },
  {
    path: 'form-field',
    component: FormFieldPageComponent,
  },
  {
    path: 'icon',
    component: IconPageComponent,
  },
  {
    path: 'item-group',
    component: ItemGroupPageComponent,
  },
  {
    path: 'list',
    component: ListPageComponent,
  },
  {
    path: 'menu',
    component: MenuPageComponent,
  },
  {
    path: 'nav-drawer',
    component: NavDrawerPageComponent,
  },
  {
    path: 'progress-circular',
    component: ProgressCircularPageComponent,
  },
  {
    path: 'progress-linear',
    component: ProgressLinearPageComponent,
  },
  {
    path: 'radio-button',
    component: RadioButtonPageComponent,
  },
  {
    path: 'snackbar',
    component: SnackbarPageComponent,
  },
  {
    path: 'stepper',
    component: StepperComponent,
  },
  {
    path: 'table',
    component: TablePageComponent,
  },
  {
    path: 'tabs',
    component: TabPageComponent,
  },
  {
    path: 'tooltip',
    component: TooltipPageComponent,
  },
  {
    path: 'toolbar',
    component: ToolbarPageComponent,
  },
  {
    path: 'bottom-navigation',
    component: BottomNavigationPageComponent,
  },
  {
    path: 'badge',
    component: BadgePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
