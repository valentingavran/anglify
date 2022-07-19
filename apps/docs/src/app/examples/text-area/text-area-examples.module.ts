import { IconModule, TextAreaModule } from '@anglify/components';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import AutoresizeComponent from './autoresize/autoresize.component';
import BasicComponent from './basic/basic.component';

@NgModule({
  declarations: [BasicComponent, AutoresizeComponent],
  imports: [CommonModule, TextAreaModule, IconModule, TextFieldModule],
})
export class TextAreaExamplesModule {}
