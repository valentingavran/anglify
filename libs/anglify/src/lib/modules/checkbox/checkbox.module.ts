import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';
import { OverlayModule } from '../overlay/overlay.module';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [CommonModule, FormsModule, OverlayModule],
  exports: [CheckboxComponent],
})
export class CheckboxModule {}
