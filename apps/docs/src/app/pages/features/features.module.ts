import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { FeaturesRoutingModule } from './features-routing.module';
import { IconFontsComponent } from './icon-fonts/icon-fonts.component';
import { ThemingComponent } from './theming/theming.component';

@NgModule({
  declarations: [IconFontsComponent, ThemingComponent],
  imports: [CommonModule, FeaturesRoutingModule, HighlightModule],
})
export class FeaturesModule {}
