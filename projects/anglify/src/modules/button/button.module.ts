import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from './button.directive';
import { OverlayModule } from '../overlay/overlay.module';

@NgModule({
  declarations: [ButtonDirective],
  imports: [CommonModule, OverlayModule],
  exports: [ButtonDirective, OverlayModule],
})
export class ButtonModule {}
