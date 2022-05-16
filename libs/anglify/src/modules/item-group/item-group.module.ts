import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItemGroupComponent } from './item-group.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';

@NgModule({
  declarations: [ItemGroupComponent],
  imports: [AnglifyCommonModule, CommonModule],
  exports: [AnglifyCommonModule, ItemGroupComponent],
})
export class ItemGroupModule {}
