import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextFieldComponent } from './text-field.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { InputDirective } from '../input/input.directive';
import { InputModule } from '../input/input.module';

@NgModule({
  declarations: [TextFieldComponent],
  imports: [CommonModule, InputModule, AnglifyCommonModule],
  exports: [TextFieldComponent, AnglifyCommonModule, InputDirective],
})
export class TextFieldModule {}
