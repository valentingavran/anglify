import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonComponent } from './radio-button.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { InteractionStateModule } from '../interaction-state/interaction-state.module';

@NgModule({
  declarations: [RadioButtonComponent],
  imports: [AnglifyCommonModule, CommonModule, FormsModule, InteractionStateModule],
  exports: [AnglifyCommonModule, RadioButtonComponent, InteractionStateModule],
})
export class RadioButtonModule {}
