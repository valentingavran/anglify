import { CommonModule } from '@angular/common';
import { NgModule, SecurityContext } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { MarkdownModule } from 'ngx-markdown';

import { GettingStartedRoutingModule } from './getting-started-routing.module';
import { IconFontsComponent } from './icon-fonts/icon-fonts.component';
import { InstallationComponent } from './installation/installation.component';
import { ThemingComponent } from './theming/theming.component';

@NgModule({
  declarations: [ThemingComponent, InstallationComponent, IconFontsComponent],
  imports: [CommonModule, GettingStartedRoutingModule, HighlightModule, MarkdownModule.forRoot({ sanitize: SecurityContext.NONE })],
})
export class GettingStartedModule {}
