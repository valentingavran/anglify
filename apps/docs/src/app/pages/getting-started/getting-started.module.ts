import { CommonModule } from '@angular/common';
import { NgModule, SecurityContext } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { MarkdownModule } from 'ngx-markdown';
import { GettingStartedRoutingModule } from './getting-started-routing.module';
import { InstallationComponent } from './installation/installation.component';

@NgModule({
  declarations: [InstallationComponent],
  imports: [CommonModule, GettingStartedRoutingModule, HighlightModule, MarkdownModule.forRoot({ sanitize: SecurityContext.NONE })],
})
export class GettingStartedModule {}
