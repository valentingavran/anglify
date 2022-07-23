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
import { ProgressCircularPageComponent } from './progress-circular-page/progress-circular-page.component';
import { ProgressLinearPageComponent } from './progress-linear-page/progress-linear-page.component';
import { RadioButtonPageComponent } from './radio-button-page/radio-button-page.component';
import { SelectPageComponent } from './select-page/select-page.component';
import { SnackbarPageComponent } from './snackbar-page/snackbar-page.component';
import { StepperPageComponent } from './stepper-page/stepper-page.component';
import { TabPageComponent } from './tab-page/tab-page.component';
import { TablePageComponent } from './table-page/table-page.component';
import { TextAreaPageComponent } from './text-area-page/text-area-page.component';
import { TextFieldPageComponent } from './text-field-page/text-field-page.component';
import { TimelinePageComponent } from './timeline-page/timeline-page.component';
import { ToolbarPageComponent } from './toolbar-page/toolbar-page.component';
import { TooltipPageComponent } from './tooltip-page/tooltip-page.component';

const routes: Routes = [
  {
    path: 'autocomplete',
    component: AutocompletePageComponent,
  },
  {
    path: 'badge',
    component: BadgePageComponent,
  },
  {
    path: 'bottom-navigation',
    component: BottomNavigationPageComponent,
  },
  {
    path: 'breadcrumbs',
    component: BreadcrumbsPageComponent,
  },
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
    path: 'combobox',
    component: ComboboxPageComponent,
  },
  {
    path: 'dialog',
    component: DialogPageComponent,
  },
  {
    path: 'expansion-panels',
    component: ExpansionPanelsPageComponent,
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
    path: 'navigation-drawer',
    component: NavigationDrawerPageComponent,
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
    path: 'select',
    component: SelectPageComponent,
  },
  {
    path: 'snackbar',
    component: SnackbarPageComponent,
  },
  {
    path: 'stepper',
    component: StepperPageComponent,
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
    path: 'text-area',
    component: TextAreaPageComponent,
  },
  {
    path: 'text-field',
    component: TextFieldPageComponent,
  },
  {
    path: 'timeline',
    component: TimelinePageComponent,
  },
  {
    path: 'toolbar',
    component: ToolbarPageComponent,
  },
  {
    path: 'tooltip',
    component: TooltipPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
