import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutocompletePageComponent } from './autocomplete-page/autocomplete-page.component';
import { BadgePageComponent } from './badge-page/badge-page.component';
import { BottomNavigationPageComponent } from './bottom-navigation-page/bottom-navigation-page.component';
import { BreadcrumbsPageComponent } from './breadcrumbs-page/breadcrumbs-page.component';
import { ButtonPageComponent } from './button-page/button-page.component';
import { CardPageComponent } from './card-page/card-page.component';
import { CheckBoxPageComponent } from './checkbox-page/checkbox-page.component';
import { ChipPageComponent } from './chip-page/chip-page.component';
import { ComboboxPageComponent } from './combobox-page/combobox-page.component';
import { DialogPageComponent } from './dialog-page/dialog-page.component';
import { ExpansionPanelsPageComponent } from './expansion-panels-page/expansion-panels-page.component';
import { IconPageComponent } from './icon-page/icon-page.component';
import { ItemGroupPageComponent } from './item-group-page/item-group-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { NavigationDrawerPageComponent } from './navigation-drawer-page/navigation-drawer-page.component';
import { OtpInputPageComponent } from './otp-input-page/otp-input-page.component';
import { ProgressCircularPageComponent } from './progress-circular-page/progress-circular-page.component';
import { ProgressLinearPageComponent } from './progress-linear-page/progress-linear-page.component';
import { RadioButtonPageComponent } from './radio-button-page/radio-button-page.component';
import { SelectPageComponent } from './select-page/select-page.component';
import { SimpleTablePageComponent } from './simple-table-page/simple-table-page.component';
import { SnackbarPageComponent } from './snackbar-page/snackbar-page.component';
import { StepperPageComponent } from './stepper-page/stepper-page.component';
import { TabPageComponent } from './tab-page/tab-page.component';
import { TextAreaPageComponent } from './text-area-page/text-area-page.component';
import { TextFieldPageComponent } from './text-field-page/text-field-page.component';
import { TimelinePageComponent } from './timeline-page/timeline-page.component';
import { ToolbarPageComponent } from './toolbar-page/toolbar-page.component';
import { TooltipPageComponent } from './tooltip-page/tooltip-page.component';

const routes: Routes = [
  {
    path: 'autocomplete',
    component: AutocompletePageComponent,
    title: 'Autocomplete | Anglify',
  },
  {
    path: 'badge',
    component: BadgePageComponent,
    title: 'Badge | Anglify',
  },
  {
    path: 'bottom-navigation',
    component: BottomNavigationPageComponent,
    title: 'Bottom Navigation | Anglify',
  },
  {
    path: 'breadcrumbs',
    component: BreadcrumbsPageComponent,
    title: 'Breadcrumbs | Anglify',
  },
  {
    path: 'button',
    component: ButtonPageComponent,
    title: 'Button | Anglify',
  },
  {
    path: 'card',
    component: CardPageComponent,
    title: 'Card | Anglify',
  },
  {
    path: 'checkbox',
    component: CheckBoxPageComponent,
    title: 'Checkbox | Anglify',
  },
  {
    path: 'chip',
    component: ChipPageComponent,
    title: 'Chip | Anglify',
  },
  {
    path: 'combobox',
    component: ComboboxPageComponent,
    title: 'Combobox | Anglify',
  },
  {
    path: 'dialog',
    component: DialogPageComponent,
    title: 'Dialog | Anglify',
  },
  {
    path: 'expansion-panels',
    component: ExpansionPanelsPageComponent,
    title: 'Expansion Panels | Anglify',
  },
  {
    path: 'icon',
    component: IconPageComponent,
    title: 'Icon | Anglify',
  },
  {
    path: 'item-group',
    component: ItemGroupPageComponent,
    title: 'Item Group | Anglify',
  },
  {
    path: 'list',
    component: ListPageComponent,
    title: 'List | Anglify',
  },
  {
    path: 'menu',
    component: MenuPageComponent,
    title: 'Menu | Anglify',
  },
  {
    path: 'navigation-drawer',
    component: NavigationDrawerPageComponent,
    title: 'Navigation Drawer | Anglify',
  },
  {
    path: 'otp-input',
    component: OtpInputPageComponent,
    title: 'OTP Input | Anglify',
  },
  {
    path: 'progress-circular',
    component: ProgressCircularPageComponent,
    title: 'Progress Circular | Anglify',
  },
  {
    path: 'progress-linear',
    component: ProgressLinearPageComponent,
    title: 'Progress Linear | Anglify',
  },
  {
    path: 'radio-button',
    component: RadioButtonPageComponent,
    title: 'Radio Button | Anglify',
  },
  {
    path: 'select',
    component: SelectPageComponent,
    title: 'Select | Anglify',
  },
  {
    path: 'snackbar',
    component: SnackbarPageComponent,
    title: 'Snackbar | Anglify',
  },
  {
    path: 'stepper',
    component: StepperPageComponent,
    title: 'Stepper | Anglify',
  },
  {
    path: 'simple-table',
    component: SimpleTablePageComponent,
    title: 'Simple Table | Anglify',
  },
  {
    path: 'tabs',
    component: TabPageComponent,
    title: 'Tabs | Anglify',
  },
  {
    path: 'text-area',
    component: TextAreaPageComponent,
    title: 'Text Area | Anglify',
  },
  {
    path: 'text-field',
    component: TextFieldPageComponent,
    title: 'Text Field | Anglify',
  },
  {
    path: 'timeline',
    component: TimelinePageComponent,
    title: 'Timeline | Anglify',
  },
  {
    path: 'toolbar',
    component: ToolbarPageComponent,
    title: 'Toolbar | Anglify',
  },
  {
    path: 'tooltip',
    component: TooltipPageComponent,
    title: 'Tooltip | Anglify',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
