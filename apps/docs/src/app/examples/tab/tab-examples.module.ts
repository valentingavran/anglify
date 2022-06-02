import { ButtonModule, IconModule, TabModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicComponent } from './basic/basic.component';
import { IconLeftComponent } from './icon-left/icon-left.component';
import { IconOnlyComponent } from './icon-only/icon-only.component';
import { IconTopComponent } from './icon-top/icon-top.component';

@NgModule({
  declarations: [BasicComponent, IconLeftComponent, IconTopComponent, IconOnlyComponent],
  imports: [CommonModule, TabModule, IconModule, FormsModule, ReactiveFormsModule, ButtonModule],
})
export class TabExamplesModule {}
