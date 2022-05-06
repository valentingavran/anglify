import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { IconModule } from '../icon/icon.module';
import { InteractionStateModule } from '../interaction-state/interaction-state.module';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [AnglifyCommonModule, CommonModule, FormsModule, IconModule, InteractionStateModule],
  exports: [AnglifyCommonModule, CheckboxComponent, InteractionStateModule],
})
export class CheckboxModule {}
