import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputDirective } from './directives/input.directive';
import { FormFieldComponent } from './form-field.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [FormFieldComponent, InputDirective],
  imports: [AnglifyCommonModule, CommonModule, IconModule],
  exports: [AnglifyCommonModule, FormFieldComponent, InputDirective],
})
export class FormFieldModule {}
