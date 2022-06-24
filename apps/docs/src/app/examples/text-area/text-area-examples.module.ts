import { IconModule, TextAreaModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import BasicComponent from './basic/basic.component';

@NgModule({
  declarations: [BasicComponent],
  imports: [CommonModule, TextAreaModule, IconModule],
})
export class TextAreaExamplesModule {}
