import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressLinearComponent } from './progress-linear.component';
import { PipeModule } from '../../pipes/pipe.module';

@NgModule({
  declarations: [ProgressLinearComponent],
  imports: [CommonModule, PipeModule],
  exports: [ProgressLinearComponent],
})
export class ProgressLinearModule {}
