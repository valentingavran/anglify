import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SlotOutletDirective } from './directives/slot-outlet/slot-outlet.directive';
import { SlotDirective } from './directives/slot/slot.directive';
import { BooleanLikeToBooleanPipe } from './pipes/boolean-like-to-boolean/boolean-like-to-boolean.pipe';
import { ClampPipe } from './pipes/clamp/clamp.pipe';
import { FindSlotPipe } from './pipes/find-slot/find-slot.pipe';
import { PercentPipe } from './pipes/percent/percent.pipe';

@NgModule({
  declarations: [BooleanLikeToBooleanPipe, PercentPipe, ClampPipe, SlotDirective, SlotOutletDirective, FindSlotPipe],
  imports: [CommonModule],
  exports: [BooleanLikeToBooleanPipe, PercentPipe, ClampPipe, SlotDirective, SlotOutletDirective, FindSlotPipe],
})
export class AnglifyCommonModule {}
