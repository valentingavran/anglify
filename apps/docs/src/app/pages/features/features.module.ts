import { SimpleTableModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { BreakpointsComponent } from './breakpoints/brakpoints.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { IconFontsComponent } from './icon-fonts/icon-fonts.component';
import { ThemingComponent } from './theming/theming.component';

@NgModule({
  declarations: [IconFontsComponent, ThemingComponent, BreakpointsComponent],
  imports: [CommonModule, FeaturesRoutingModule, HighlightModule, SimpleTableModule],
})
export class FeaturesModule {}
