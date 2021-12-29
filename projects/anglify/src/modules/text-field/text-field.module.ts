import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from './text-field.component';
import { InputDirective } from './directives/input.directive';
import { LabelDirective } from './directives/label/label.directive';

@NgModule({
  declarations: [TextFieldComponent, InputDirective, LabelDirective],
  imports: [CommonModule],
  exports: [TextFieldComponent, InputDirective, LabelDirective],
})
export class TextFieldModule {}
