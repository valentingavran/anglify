import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button.component';
import { OverlayModule } from '../overlay/overlay.module';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, OverlayModule],
  exports: [OverlayModule, ButtonComponent],
})
export class ButtonModule {}
