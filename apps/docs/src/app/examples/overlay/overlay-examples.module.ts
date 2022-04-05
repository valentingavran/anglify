import { OverlayModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DifferentStatesComponent } from './different-states/different-states.component';
import { NoRippleComponent } from './no-ripple/no-ripple.component';

@NgModule({
  declarations: [DifferentStatesComponent, NoRippleComponent],
  imports: [CommonModule, OverlayModule],
})
export class OverlayExamplesModule {}
