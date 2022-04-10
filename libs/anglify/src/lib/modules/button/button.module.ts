import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayModule } from '../overlay/overlay.module';
import { ButtonComponent } from './button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, OverlayModule],
  exports: [OverlayModule, ButtonComponent],
})
export class ButtonModule {}
