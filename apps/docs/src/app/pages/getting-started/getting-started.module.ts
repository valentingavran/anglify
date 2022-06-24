import { CardModule, ChipModule, IconModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { MarkdownModule } from 'ngx-markdown';
import { ReleaseNotesComponent } from './changelog/release-notes.component';
import { GettingStartedRoutingModule } from './getting-started-routing.module';
import { InstallationComponent } from './installation/installation.component';
import { LayoutsComponent } from './layouts/layouts.component';

@NgModule({
  declarations: [InstallationComponent, LayoutsComponent, ReleaseNotesComponent],
  imports: [
    CommonModule,
    GettingStartedRoutingModule,
    HighlightModule,
    MarkdownModule.forRoot({ sanitize: SecurityContext.NONE }),
    CardModule,
    IconModule,
    HttpClientModule,
    ChipModule,
  ],
})
export class GettingStartedModule {}
