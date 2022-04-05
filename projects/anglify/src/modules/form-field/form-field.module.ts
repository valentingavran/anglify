import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputDirective } from './directives/input.directive';
import { LabelDirective } from './directives/label/label.directive';
import { FormFieldComponent } from './form-field.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [FormFieldComponent, InputDirective, LabelDirective],
  imports: [CommonModule, IconModule],
  exports: [FormFieldComponent, InputDirective, LabelDirective],
})
export class FormFieldModule {}
