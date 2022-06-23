import { BreadcrumbsModule, IconModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BasicComponent } from './basic/basic.component';
import { IconComponent } from './icon/icon.component';

@NgModule({
  declarations: [BasicComponent, IconComponent],
  imports: [CommonModule, BreadcrumbsModule, IconModule],
})
export class BreadcrumbsExampleModule {}
