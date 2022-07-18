import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from './slider.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { InteractionStateModule } from '../interaction-state/interaction-state.module';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  declarations: [SliderComponent],
  imports: [CommonModule, AnglifyCommonModule, FormsModule, InteractionStateModule, TooltipModule],
  exports: [AnglifyCommonModule, SliderComponent, InteractionStateModule, TooltipModule],
})
export class SliderModule {}
