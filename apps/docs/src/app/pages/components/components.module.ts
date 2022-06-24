import { CheckboxModule, IconModule, ProgressLinearModule, RadioButtonModule, TableModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgePageComponent } from './badge-page/badge-page.component';
import { BottomNavigationPageComponent } from './bottom-navigation-page/bottom-navigation-page.component';
import { BreadcrumbsPageComponent } from './breadcrumbs-page/breadcrumbs-page.component';
import { ButtonPageComponent } from './button-page/button-page.component';
import { CardPageComponent } from './card-page/card-page.component';
import { CheckBoxPageComponent } from './checkbox-page/checkbox-page.component';
import { ChipPageComponent } from './chip-page/chip-page.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { DialogPageComponent } from './dialog-page/dialog-page.component';
import { IconPageComponent } from './icon-page/icon-page.component';
import { ItemGroupPageComponent } from './item-group-page/item-group-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { NavigationDrawerPageComponent } from './navigation-drawer-page/navigation-drawer-page.component';
import { ProgressCircularPageComponent } from './progress-circular-page/progress-circular-page.component';
import { ProgressLinearPageComponent } from './progress-linear-page/progress-linear-page.component';
import { RadioButtonPageComponent } from './radio-button-page/radio-button-page.component';
import { SnackbarPageComponent } from './snackbar-page/snackbar-page.component';
import { StepperPageComponent } from './stepper-page/stepper-page.component';
import { TabPageComponent } from './tab-page/tab-page.component';
import { TablePageComponent } from './table-page/table-page.component';
import { ToolbarPageComponent } from './toolbar-page/toolbar-page.component';
import { TooltipPageComponent } from './tooltip-page/tooltip-page.component';
import { BadgeExampleModule } from '../../examples/badge/badge-example.module';
import { BottomNavigationExampleModule } from '../../examples/bottom-navigation/bottom-navigation-example.module';
import { BreadcrumbsExampleModule } from '../../examples/breadcrumbs/breadcrumbs-example.module';
import { ButtonExamplesModule } from '../../examples/button/button-examples.module';
import { CardExamplesModule } from '../../examples/card/card-examples.module';
import { CheckBoxExamplesModule } from '../../examples/checkbox/checkbox-examples.module';
import { ChipExamplesModule } from '../../examples/chip/chip-examples.module';
import { DialogExamplesModule } from '../../examples/dialog/dialog-examples.module';
import { IconExamplesModule } from '../../examples/icon/icon-examples.module';
import { ItemGroupExamplesModule } from '../../examples/item-group/item-group-examples.module';
import { ListExamplesModule } from '../../examples/list/list-examples.module';
import { MenuExamplesModule } from '../../examples/menu/menu-examples.module';
import { NavigationDrawerExamplesModule } from '../../examples/navigation-drawer/navigation-drawer-examples.module';
import { ProgressCircularExamplesModule } from '../../examples/progress-circular/progress-circular-examples.module';
import { ProgressLinearExamplesModule } from '../../examples/progress-linear/progress-linear-examples.module';
import { RadioButtonExamplesModule } from '../../examples/radio-button/radio-button-examples.module';
import { SnackbarExamplesModule } from '../../examples/snackbar/snackbar-examples.module';
import { StepperExamplesModule } from '../../examples/stepper/stepper-examples.module';
import { TabExamplesModule } from '../../examples/tab/tab-examples.module';
import { TableExamplesModule } from '../../examples/table/table-examples.module';
import { ToolbarExampleModule } from '../../examples/toolbar/toolbar-example.module';
import { TooltipExamplesModule } from '../../examples/tooltip/tooltip-examples.module';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  declarations: [
    ButtonPageComponent,
    IconPageComponent,
    TooltipPageComponent,
    StepperPageComponent,
    ListPageComponent,
    MenuPageComponent,
    CardPageComponent,
    ProgressCircularPageComponent,
    CheckBoxPageComponent,
    TablePageComponent,
    ProgressLinearPageComponent,
    RadioButtonPageComponent,
    DialogPageComponent,
    NavigationDrawerPageComponent,
    ToolbarPageComponent,
    BottomNavigationPageComponent,
    BadgePageComponent,
    SnackbarPageComponent,
    ItemGroupPageComponent,
    ChipPageComponent,
    TabPageComponent,
    BreadcrumbsPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsRoutingModule,
    NavigationDrawerExamplesModule,
    RadioButtonExamplesModule,
    ToolbarExampleModule,
    BadgeExampleModule,
    BottomNavigationExampleModule,
    SnackbarExamplesModule,
    ItemGroupExamplesModule,
    ChipExamplesModule,
    DialogExamplesModule,
    CheckBoxExamplesModule,
    TableExamplesModule,
    ProgressLinearExamplesModule,
    ButtonExamplesModule,
    IconExamplesModule,
    StepperExamplesModule,
    TooltipExamplesModule,
    ListExamplesModule,
    MenuExamplesModule,
    ProgressCircularExamplesModule,
    CardExamplesModule,
    TabExamplesModule,
    BreadcrumbsExampleModule,
    // Imports for Playground
    IconModule,
    ReactiveFormsModule,
    FormsModule,
    ProgressLinearModule,
    TableModule,
    CheckboxModule,
    RadioButtonModule,
  ],
})
export class ComponentsModule {}
