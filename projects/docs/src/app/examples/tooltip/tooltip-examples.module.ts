import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LongTextComponent } from './long-text/long-text.component';
import { TooltipModule } from '../../../../../anglify/src/modules/tooltip/tooltip.module';
import { DifferentPositionsComponent } from './different-positions/different-positions.component';
import { ButtonModule } from '../../../../../anglify/src/modules/button/button.module';

@NgModule({
  imports: [CommonModule, TooltipModule, ButtonModule],
  declarations: [LongTextComponent, DifferentPositionsComponent],
})
export class TooltipExamplesModule {}
