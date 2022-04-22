import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayDirective } from './overlay.directive';

@NgModule({
  declarations: [OverlayDirective],
  imports: [CommonModule],
  exports: [OverlayDirective],
})
export class OverlayModule {}
