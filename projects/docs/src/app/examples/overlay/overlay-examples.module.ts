import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayModule } from 'projects/anglify/src/modules/overlay/overlay.module';
import { NoRipple } from './no-ripple/no-ripple.component';
import { DifferentStates } from './different-states/different-states.component';

@NgModule({
  declarations: [NoRipple, DifferentStates],
  imports: [CommonModule, OverlayModule],
})
export class OverlayExamplesModule {}
