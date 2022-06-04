import { CardModule, IconModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule, SecurityContext } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { MarkdownModule } from 'ngx-markdown';
import { GettingStartedRoutingModule } from './getting-started-routing.module';
import { InstallationComponent } from './installation/installation.component';
import { LayoutsComponent } from './layouts/layouts.component';

@NgModule({
  declarations: [InstallationComponent, LayoutsComponent],
  imports: [
    CommonModule,
    GettingStartedRoutingModule,
    HighlightModule,
    MarkdownModule.forRoot({ sanitize: SecurityContext.NONE }),
    CardModule,
    IconModule,
  ],
})
export class GettingStartedModule {}
