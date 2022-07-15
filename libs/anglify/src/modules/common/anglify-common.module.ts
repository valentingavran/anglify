import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SlotOutletDirective } from './directives/slot-outlet/slot-outlet.directive';
import { SlotDirective } from './directives/slot/slot.directive';
import { ClampPipe } from './pipes/clamp/clamp.pipe';
import { FindSlotPipe } from './pipes/find-slot/find-slot.pipe';
import { PercentPipe } from './pipes/percent/percent.pipe';

@NgModule({
  declarations: [PercentPipe, ClampPipe, SlotDirective, SlotOutletDirective, FindSlotPipe],
  imports: [CommonModule],
  exports: [PercentPipe, ClampPipe, SlotDirective, SlotOutletDirective, FindSlotPipe],
})
export class AnglifyCommonModule {}
