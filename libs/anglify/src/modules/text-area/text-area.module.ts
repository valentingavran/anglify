import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextAreaComponent } from './text-area.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { InputDirective } from '../input/input.directive';
import { InputModule } from '../input/input.module';

@NgModule({
  declarations: [TextAreaComponent],
  imports: [CommonModule, AnglifyCommonModule, InputModule],
  exports: [TextAreaComponent, AnglifyCommonModule, InputDirective],
})
export class TextAreaModule {}
