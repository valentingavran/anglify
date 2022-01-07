import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextFieldModule } from '../../../anglify/src/modules/text-field/text-field.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldPageComponent } from './pages/component-pages/text-field-page/text-field-page.component';
import { IconPageComponent } from './pages/component-pages/icon-page/icon-page.component';
import { IconModule } from '../../../anglify/src/modules/icon/icon.module';
import { StylingTableComponent } from './components/styling-table/styling-table.component';
import { HttpClientModule } from '@angular/common/http';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { CodeExampleComponent } from './components/code-example/code-example.component';
import { MarkdownModule } from 'ngx-markdown';
import { TextFieldExamplesModule } from './examples/text-field/text-field-examples.module';
import { IconExamplesModule } from './examples/icon/icon-examples.module';

@NgModule({
  declarations: [AppComponent, HomeComponent, TextFieldPageComponent, IconPageComponent, StylingTableComponent, CodeExampleComponent],
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
    TextFieldExamplesModule,
    IconExamplesModule,
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
