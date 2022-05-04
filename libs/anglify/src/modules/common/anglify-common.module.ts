import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BooleanLikeToBooleanPipe } from './pipes/boolean-like-to-boolean/boolean-like-to-boolean.pipe';
import { ClampPipe } from './pipes/clamp/clamp.pipe';
import { PercentPipe } from './pipes/percent/percent.pipe';

@NgModule({
  declarations: [BooleanLikeToBooleanPipe, PercentPipe, ClampPipe],
  imports: [CommonModule],
  exports: [BooleanLikeToBooleanPipe, PercentPipe, ClampPipe],
})
export class AnglifyCommonModule {}
