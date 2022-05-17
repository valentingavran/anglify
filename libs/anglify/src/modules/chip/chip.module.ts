import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChipComponent } from './chip.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [ChipComponent],
  imports: [AnglifyCommonModule, CommonModule, IconModule],
  exports: [AnglifyCommonModule, ChipComponent],
})
export class ChipModule {}
