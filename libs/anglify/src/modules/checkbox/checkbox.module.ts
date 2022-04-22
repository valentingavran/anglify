import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';
import { IconModule } from '../icon/icon.module';
import { OverlayModule } from '../overlay/overlay.module';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [CommonModule, FormsModule, OverlayModule, IconModule],
  exports: [CheckboxComponent, OverlayModule],
})
export class CheckboxModule {}
