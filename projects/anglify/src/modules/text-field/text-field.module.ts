import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from './text-field.component';
import { InputDirective } from './directives/input.directive';
import { LabelDirective } from './directives/label/label.directive';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [TextFieldComponent, InputDirective, LabelDirective],
  imports: [CommonModule, IconModule.forRoot({})],
  exports: [TextFieldComponent, InputDirective, LabelDirective],
})
export class TextFieldModule {}
