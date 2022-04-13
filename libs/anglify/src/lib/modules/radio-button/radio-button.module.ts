import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonComponent } from './radio-button.component';
import { OverlayModule } from '../overlay/overlay.module';

@NgModule({
  declarations: [RadioButtonComponent],
  imports: [CommonModule, FormsModule, OverlayModule],
  exports: [RadioButtonComponent, OverlayModule],
})
export class RadioButtonModule {}
