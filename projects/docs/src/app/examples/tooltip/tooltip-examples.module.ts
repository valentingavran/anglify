import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import CustomContentComponent from './custom-content/custom-content.component';
import { CustomMountingPointComponent } from './custom-mounting-point/custom-mounting-point.component';
import { DifferentPositionsComponent } from './different-positions/different-positions.component';
import { LongTextComponent } from './long-text/long-text.component';
import { ShowHideManuallyComponent } from './show-hide-manually/show-hide-manually.component';
import { ButtonModule } from '../../../../../anglify/src/modules/button/button.module';
import { IconModule } from '../../../../../anglify/src/modules/icon/icon.module';
import { TooltipModule } from '../../../../../anglify/src/modules/tooltip/tooltip.module';

@NgModule({
  imports: [CommonModule, TooltipModule, ButtonModule, IconModule, ButtonModule],
  declarations: [
    LongTextComponent,
    DifferentPositionsComponent,
    CustomContentComponent,
    ShowHideManuallyComponent,
    CustomMountingPointComponent,
  ],
})
export class TooltipExamplesModule {}
