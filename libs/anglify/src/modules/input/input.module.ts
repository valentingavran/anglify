import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputComponent } from './input.component';
import { InputDirective } from './input.directive';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { InteractionStateModule } from '../interaction-state/interaction-state.module';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  declarations: [InputComponent, InputDirective],
  imports: [CommonModule, AnglifyCommonModule, InteractionStateModule, TooltipModule],
  exports: [InputComponent, AnglifyCommonModule, InputDirective],
})
export class InputModule {}
