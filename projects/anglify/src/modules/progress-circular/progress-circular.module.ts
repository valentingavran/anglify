import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressCircularComponent } from './progress-circular.component';

@NgModule({
  declarations: [ProgressCircularComponent],
  exports: [ProgressCircularComponent],
  imports: [CommonModule],
})
export class ProgressCircularModule {}
