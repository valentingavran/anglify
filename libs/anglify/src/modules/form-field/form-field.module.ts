import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppendIconDirective } from './directives/icon/append-icon.directive';
import { AppendOuterIconDirective } from './directives/icon/append-outer-icon.directive';
import { PrependIconDirective } from './directives/icon/prepend-icon.directive';
import { PrependOuterIconDirective } from './directives/icon/prepend-outer-icon.directive';
import { InputDirective } from './directives/input.directive';
import { LabelDirective } from './directives/label/label.directive';
import { FormFieldComponent } from './form-field.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [
    FormFieldComponent,
    InputDirective,
    LabelDirective,
    PrependIconDirective,
    PrependOuterIconDirective,
    AppendIconDirective,
    AppendOuterIconDirective,
  ],
  imports: [CommonModule, IconModule],
  exports: [
    FormFieldComponent,
    InputDirective,
    LabelDirective,
    PrependIconDirective,
    PrependOuterIconDirective,
    AppendIconDirective,
    AppendOuterIconDirective,
  ],
})
export class FormFieldModule {}
