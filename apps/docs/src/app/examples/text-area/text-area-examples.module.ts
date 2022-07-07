import { IconModule, TextAreaModule } from '@anglify/components';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import AutoResizeComponent from './autoresize/autoresize.component';
import BasicComponent from './basic/basic.component';

@NgModule({
  declarations: [BasicComponent, AutoResizeComponent],
  imports: [CommonModule, TextAreaModule, IconModule, TextFieldModule],
})
export class TextAreaExamplesModule {}
