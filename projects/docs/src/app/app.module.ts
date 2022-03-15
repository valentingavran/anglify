import { HttpClientModule } from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { MarkdownModule } from 'ngx-markdown';
import { IconModule } from '../../../anglify/src/modules/icon/icon.module';
import { FormFieldModule } from '../../../anglify/src/modules/form-field/form-field.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeExampleComponent } from './components/code-example/code-example.component';
import { StylingTableComponent } from './components/styling-table/styling-table.component';
import { IconExamplesModule } from './examples/icon/icon-examples.module';
import { OverlayExamplesModule } from './examples/overlay/overlay-examples.module';
import { StepperExamplesModule } from './examples/stepper/stepper-examples.module';
import { FormFieldExamplesModule } from './examples/form-field/form-field-examples.module';
import { TooltipExamplesModule } from './examples/tooltip/tooltip-examples.module';
import { IconPageComponent } from './pages/component-pages/icon-page/icon-page.component';
import { OverlayPageComponent } from './pages/component-pages/overlay-page/overlay-page.component';
import { StepperComponent } from './pages/component-pages/stepper/stepper.component';
import { FormFieldPageComponent } from './pages/component-pages/form-field-page/form-field-page.component';
import { TooltipPageComponent } from './pages/component-pages/tooltip-page/tooltip-page.component';
import { HomeComponent } from './pages/home/home.component';
import { OverlayModule } from '../../../anglify/src/modules/overlay/overlay.module';
import { ButtonPageComponent } from './pages/component-pages/button-page/button-page.component';
import { ButtonExamplesModule } from './examples/button/button-examples.module';
import { ButtonModule } from '../../../anglify/src/modules/button/button.module';
import { ListPageComponent } from './pages/component-pages/list-page/list-page.component';
import { ListModule } from '../../../anglify/src/modules/list/list.module';
import { MenuModule } from '../../../anglify/src/modules/menu/menu.module';
import { MenuPageComponent } from './pages/component-pages/menu-page/menu-page.component';

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
    OverlayPageComponent,
    ListPageComponent,
    MenuPageComponent,
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
    OverlayExamplesModule,
    StepperExamplesModule,
    FormFieldExamplesModule,
    TooltipExamplesModule,
    OverlayModule,
    ButtonModule,
    ListModule,
    MenuModule,
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
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
