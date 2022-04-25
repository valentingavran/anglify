import {
  ButtonModule,
  CardModule,
  CheckboxModule,
  DialogModule,
  FormFieldModule,
  IconModule,
  ListModule,
  MenuModule,
  ProgressCircularModule,
  ProgressLinearModule,
  RadioButtonModule,
  TableModule,
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
import { StylingTableComponent } from './components/styling-table/styling-table.component';
import { ButtonExamplesModule } from './examples/button/button-examples.module';
import { CheckBoxExamplesModule } from './examples/checkbox/checkbox-examples.module';
import { FormFieldExamplesModule } from './examples/form-field/form-field-examples.module';
import { IconExamplesModule } from './examples/icon/icon-examples.module';
import { MenuExamplesModule } from './examples/menu/menu-examples.module';
import { ProgressCircularExamplesModule } from './examples/progress-circular/progress-circular-examples.module';
import { ProgressLinearExamplesModule } from './examples/progress-linear/progress-linear-examples.module';
import { RadioButtonExamplesModule } from './examples/radio-button/radio-button-examples.module';
import { StepperExamplesModule } from './examples/stepper/stepper-examples.module';
import { TableExamplesModule } from './examples/table/table-examples.module';
import { TooltipExamplesModule } from './examples/tooltip/tooltip-examples.module';
import { ButtonPageComponent } from './pages/component-pages/button-page/button-page.component';
import { CardPageComponent } from './pages/component-pages/card-page/card-page.component';
import { CheckBoxPageComponent } from './pages/component-pages/checkbox-page/checkbox-page.component';
import { DialogPageComponent } from './pages/component-pages/dialog-page/dialog-page.component';
import { FormFieldPageComponent } from './pages/component-pages/form-field-page/form-field-page.component';
import { IconPageComponent } from './pages/component-pages/icon-page/icon-page.component';
import { ListPageComponent } from './pages/component-pages/list-page/list-page.component';
import { MenuPageComponent } from './pages/component-pages/menu-page/menu-page.component';
import { ProgressCircularPageComponent } from './pages/component-pages/progress-circular-page/progress-circular-page.component';
import { ProgressLinearPageComponent } from './pages/component-pages/progress-linear-page/progress-linear-page.component';
import { RadioButtonPageComponent } from './pages/component-pages/radio-button-page/radio-button-page.component';
import { StepperComponent } from './pages/component-pages/stepper/stepper.component';
import { TablePageComponent } from './pages/component-pages/table-page/table-page.component';
import { TooltipPageComponent } from './pages/component-pages/tooltip-page/tooltip-page.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormFieldModule,
    FormsModule,
    IconModule,
    HttpClientModule,
    HighlightModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot({ sanitize: SecurityContext.NONE }),
    ButtonExamplesModule,
    IconExamplesModule,
    StepperExamplesModule,
    FormFieldExamplesModule,
    TooltipExamplesModule,
    CheckBoxExamplesModule,
    ButtonModule,
    ListModule,
    MenuModule,
    MenuExamplesModule,
    CardModule,
    ProgressCircularModule,
    ProgressCircularExamplesModule,
    CheckboxModule,
    TableModule,
    TableExamplesModule,
    ProgressLinearModule,
    ProgressLinearExamplesModule,
    RadioButtonModule,
    RadioButtonExamplesModule,
    DialogModule,
  ],
  providers: [
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
