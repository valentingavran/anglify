import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooleanLikeToBooleanPipe } from './boolean-like-to-boolean/boolean-like-to-boolean.pipe';
import { PercentPipe } from './percent/percent.pipe';
import { ClampPipe } from './clamp/clamp.pipe';

@NgModule({
  declarations: [BooleanLikeToBooleanPipe, PercentPipe, ClampPipe],
  imports: [CommonModule],
  exports: [BooleanLikeToBooleanPipe, PercentPipe, ClampPipe],
})
export class PipeModule {}
