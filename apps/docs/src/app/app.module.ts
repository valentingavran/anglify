import {
  BottomNavigationModule,
  ButtonModule,
  CardModule,
  CheckboxModule,
  ChipModule,
  FormFieldModule,
  IconModule,
  IconSettings,
  ICON_SETTINGS,
  ListModule,
  MenuModule,
  NavDrawerModule,
  ProgressCircularModule,
  ProgressLinearModule,
  RadioButtonModule,
  SnackbarModule,
  TableModule,
  ToolbarModule,
  TooltipModule,
} from '@anglify/components';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeExampleComponent } from './components/code-example/code-example.component';
import { ReferencesComponent } from './components/references/references.component';
import { StylingTableComponent } from './components/styling-table/styling-table.component';
import { BadgeExampleModule } from './examples/badge/badge-example.module';
import { BottomNavigationExampleModule } from './examples/bottom-navigation/bottom-navigation-example.module';
import { ButtonExamplesModule } from './examples/button/button-examples.module';
import { CardExamplesModule } from './examples/card/card-examples.module';
import { CheckBoxExamplesModule } from './examples/checkbox/checkbox-examples.module';
import { ChipExamplesModule } from './examples/chip/chip-examples.module';
import { FormFieldExamplesModule } from './examples/form-field/form-field-examples.module';
import { IconExamplesModule } from './examples/icon/icon-examples.module';
import { ItemGroupExamplesModule } from './examples/item-group/item-group-examples.module';
import { ListExamplesModule } from './examples/list/list-examples.module';
import { MenuExamplesModule } from './examples/menu/menu-examples.module';
import { NavDrawerExamplesModule } from './examples/nav-drawer/nav-drawer-examples.module';
import { ProgressCircularExamplesModule } from './examples/progress-circular/progress-circular-examples.module';
import { ProgressLinearExamplesModule } from './examples/progress-linear/progress-linear-examples.module';
import { RadioButtonExamplesModule } from './examples/radio-button/radio-button-examples.module';
import { SnackbarExamplesModule } from './examples/snackbar/snackbar-examples.module';
import { StepperExamplesModule } from './examples/stepper/stepper-examples.module';
import { TableExamplesModule } from './examples/table/table-examples.module';
import { ToolbarExampleModule } from './examples/toolbar/toolbar-example.module';
import { TooltipExamplesModule } from './examples/tooltip/tooltip-examples.module';
import { BadgePageComponent } from './pages/component-pages/badge-page/badge-page.component';
import { BottomNavigationPageComponent } from './pages/component-pages/bottom-navigation-page/bottom-navigation-page.component';
import { ButtonPageComponent } from './pages/component-pages/button-page/button-page.component';
import { CardPageComponent } from './pages/component-pages/card-page/card-page.component';
import { CheckBoxPageComponent } from './pages/component-pages/checkbox-page/checkbox-page.component';
import { ChipPageComponent } from './pages/component-pages/chip-page/chip-page.component';
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

@NgModule({
  declarations: [
    AppComponent,
    StylingTableComponent,
    CodeExampleComponent,
    ButtonPageComponent,
    FormFieldPageComponent,
    IconPageComponent,
    TooltipPageComponent,
    StepperComponent,
    ListPageComponent,
    MenuPageComponent,
    CardPageComponent,
    ProgressCircularPageComponent,
    CheckBoxPageComponent,
    TablePageComponent,
    ProgressLinearPageComponent,
    RadioButtonPageComponent,
    DialogPageComponent,
    NavDrawerPageComponent,
    ToolbarPageComponent,
    BottomNavigationPageComponent,
    BadgePageComponent,
    SnackbarPageComponent,
    ItemGroupPageComponent,
    ChipPageComponent,
    ReferencesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HighlightModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot({ sanitize: SecurityContext.NONE }),
    ButtonModule,
    ButtonExamplesModule,
    FormFieldModule,
    FormFieldExamplesModule,
    IconModule,
    IconExamplesModule,
    StepperExamplesModule,
    TooltipExamplesModule,
    TooltipModule,
    ListModule,
    ListExamplesModule,
    MenuModule,
    MenuExamplesModule,
    CardModule,
    CardExamplesModule,
    ProgressCircularModule,
    ProgressCircularExamplesModule,
    CheckboxModule,
    CheckBoxExamplesModule,
    TableModule,
    TableExamplesModule,
    ProgressLinearModule,
    ProgressLinearExamplesModule,
    RadioButtonModule,
    RadioButtonExamplesModule,
    NavDrawerModule,
    NavDrawerExamplesModule,
    ToolbarModule,
    ToolbarExampleModule,
    BottomNavigationModule,
    BottomNavigationExampleModule,
    BadgeExampleModule,
    SnackbarModule,
    SnackbarExamplesModule,
    ItemGroupExamplesModule,
    ChipModule,
    ChipExamplesModule,
  ],
  providers: [
    {
      provide: ICON_SETTINGS,
      useFactory: (): IconSettings => ({
        svgIconSets: {
          custom: {
            w3c: 'M23.642 5.602l-.931 1.858s-.4-.738-.795-1.076c-.377-.322-.864-.62-1.48-.556-.597.062-1.27.587-1.722 1.46-.513.994-.688 2.001-.692 3.112-.005 1.556.57 2.618.57 2.618s-.132-.494-.11-1.33c.014-.52.017-1.089.41-2.261.33-.98 1.084-1.775 1.75-1.912.517-.107.847-.03 1.356.329.603.425.966 1.193.966 1.193l.946-1.81zM0 5.674l3.77 12.723h.156l2.356-7.886 2.357 7.886h.157l3.228-10.895.152-.258h2.655l-2.2 3.802v.754h.629c.806 0 1.398.246 1.775.738.324.42.487 1.011.487 1.776 0 .691-.152 1.283-.455 1.775-.304.492-.676.738-1.116.738-.419 0-.783-.138-1.092-.416-.308-.277-.557-.657-.746-1.139l-1.288.534c.261.796.665 1.427 1.21 1.893.544.466 1.183.699 1.916.699.974 0 1.767-.393 2.38-1.178.613-.785.919-1.754.919-2.906 0-.932-.21-1.743-.628-2.435-.42-.69-1.037-1.167-1.854-1.43l2.326-4.006v-.77h-6.177L8.64 13.419 6.362 5.674h-1.65l.754 2.529-1.54 5.215L1.65 5.674zm17.44 8.88s.233.755.379 1.076c.084.185.342.75.708 1.24.341.46 1.004 1.248 2.011 1.426 1.008.178 1.7-.274 1.871-.384.172-.11.533-.412.761-.657.239-.255.465-.58.59-.775.091-.143.24-.432.24-.432l-.241-1.255s-.418.748-.678 1.036c-.261.288-.727.794-1.302 1.048-.576.253-.877.302-1.446.247-.569-.054-1.097-.383-1.282-.52-.185-.138-.658-.542-.925-.92-.268-.376-.686-1.13-.686-1.13z',
          },
        },
      }),
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
          xml: () => import('highlight.js/lib/languages/xml'),
          shell: () => import('highlight.js/lib/languages/shell'),
          bash: () => import('highlight.js/lib/languages/bash'),
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
