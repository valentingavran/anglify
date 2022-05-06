import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressLinearComponent } from './progress-linear.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';

@NgModule({
  declarations: [ProgressLinearComponent],
  imports: [CommonModule, AnglifyCommonModule],
  exports: [ProgressLinearComponent],
})
export class ProgressLinearModule {}
