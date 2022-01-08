import { HttpClientModule } from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { MarkdownModule } from 'ngx-markdown';
import { IconModule } from '../../../anglify/src/modules/icon/icon.module';
import { TextFieldModule } from '../../../anglify/src/modules/text-field/text-field.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeExampleComponent } from './components/code-example/code-example.component';
import { StylingTableComponent } from './components/styling-table/styling-table.component';
import { IconExamplesModule } from './examples/icon/icon-examples.module';
import { OverlayExamplesModule } from './examples/overlay/overlay-examples.module';
import { StepperExamplesModule } from './examples/stepper/stepper-examples.module';
import { TextFieldExamplesModule } from './examples/text-field/text-field-examples.module';
import { TooltipExamplesModule } from './examples/tooltip/tooltip-examples.module';
import { IconPageComponent } from './pages/component-pages/icon-page/icon-page.component';
import { OverlayPageComponent } from './pages/component-pages/overlay-page/overlay-page.component';
import { StepperComponent } from './pages/component-pages/stepper/stepper.component';
import { TextFieldPageComponent } from './pages/component-pages/text-field-page/text-field-page.component';
import { TooltipPageComponent } from './pages/component-pages/tooltip-page/tooltip-page.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TextFieldPageComponent,
    IconPageComponent,
    StylingTableComponent,
    CodeExampleComponent,
    TooltipPageComponent,
    StepperComponent,
    OverlayPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TextFieldModule,
    FormsModule,
    IconModule,
    HttpClientModule,
    HighlightModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot({ sanitize: SecurityContext.NONE }),
    IconExamplesModule,
    OverlayExamplesModule,
    StepperExamplesModule,
    TextFieldExamplesModule,
    TooltipExamplesModule,
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
