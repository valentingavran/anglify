import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from './data-table.component';
import { ButtonModule } from '../button/button.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { IconModule } from '../icon/icon.module';
import { SelectModule } from '../select/select.module';

@NgModule({
  declarations: [DataTableComponent],
  imports: [AnglifyCommonModule, CommonModule, IconModule, ButtonModule, SelectModule, FormsModule, CheckboxModule],
  exports: [AnglifyCommonModule, DataTableComponent],
})
export class DataTableModule {}
