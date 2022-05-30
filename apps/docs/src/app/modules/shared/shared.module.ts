import { ButtonModule, ChipModule, IconModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { MarkdownModule } from 'ngx-markdown';
import { CodeExampleComponent } from './code-example/code-example.component';
import { ReferencesComponent } from './references/references.component';
import { StylingTableComponent } from './styling-table/styling-table.component';

@NgModule({
  declarations: [StylingTableComponent, CodeExampleComponent, ReferencesComponent],
  imports: [
    CommonModule,
    HighlightModule,
    MarkdownModule.forRoot({ sanitize: SecurityContext.NONE }),
    IconModule,
    ChipModule,
    ButtonModule,
    HttpClientModule,
  ],
  exports: [StylingTableComponent, CodeExampleComponent, ReferencesComponent],
})
export class SharedModule {}
