import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BooleanLikeToBooleanPipe } from './boolean-like-to-boolean/boolean-like-to-boolean.pipe';
import { ClampPipe } from './clamp/clamp.pipe';
import { PercentPipe } from './percent/percent.pipe';

@NgModule({
  declarations: [BooleanLikeToBooleanPipe, PercentPipe, ClampPipe],
  imports: [CommonModule],
  exports: [BooleanLikeToBooleanPipe, PercentPipe, ClampPipe],
})
export class PipeModule {}
