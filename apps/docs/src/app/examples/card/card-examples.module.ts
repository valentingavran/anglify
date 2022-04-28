import { CardModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ElevationsComponent } from './elevations/elevations.component';
import { RippleComponent } from './ripple/ripple.component';

@NgModule({
  declarations: [ElevationsComponent, RippleComponent],
  imports: [CommonModule, CardModule],
  exports: [ElevationsComponent, RippleComponent],
})
export class CardExamplesModule {}
