import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LongTextComponent } from './long-text/long-text.component';
import { TooltipModule } from '../../../../../anglify/src/modules/tooltip/tooltip.module';
import { DifferentPositionsComponent } from './different-positions/different-positions.component';
import { ButtonModule } from '../../../../../anglify/src/modules/button/button.module';
import CustomContentComponent from './custom-content/custom-content.component';
import { IconModule } from '../../../../../anglify/src/modules/icon/icon.module';

@NgModule({
  imports: [CommonModule, TooltipModule, ButtonModule, IconModule],
  declarations: [LongTextComponent, DifferentPositionsComponent, CustomContentComponent],
})
export class TooltipExamplesModule {}
