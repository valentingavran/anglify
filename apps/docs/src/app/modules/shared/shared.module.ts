import { ButtonModule, ChipModule, IconModule, ItemGroupModule, TableModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HighlightModule } from 'ngx-highlightjs';
import { MarkdownModule } from 'ngx-markdown';
import { CodeExampleComponent } from './code-example/code-example.component';
import { ComponentAPIComponent } from './component-api/component-api.component';
import { DirectiveAPIComponent } from './directive-api/directive-api.component';
import { ImportExampleComponent } from './import-example/import-example.component';
import { InputsTableComponent } from './inputs-table/inputs-table.component';
import { ReferencesComponent } from './references/references.component';
import { ServiceAPIComponent } from './service-api/service-api.component';
import { StylingTableComponent } from './styling-table/styling-table.component';

@NgModule({
  declarations: [
    StylingTableComponent,
    CodeExampleComponent,
    ReferencesComponent,
    ImportExampleComponent,
    InputsTableComponent,
    ComponentAPIComponent,
    DirectiveAPIComponent,
    ServiceAPIComponent,
  ],
  imports: [
    CommonModule,
    HighlightModule,
    MarkdownModule.forRoot({ sanitize: SecurityContext.NONE }),
    IconModule,
    ChipModule,
    ButtonModule,
    HttpClientModule,
    TableModule,
    ItemGroupModule,
    ReactiveFormsModule,
  ],
  exports: [StylingTableComponent, CodeExampleComponent, ReferencesComponent, ImportExampleComponent, InputsTableComponent],
})
export class SharedModule {}
