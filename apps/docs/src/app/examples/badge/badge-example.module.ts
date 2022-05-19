import { BadgeModule, ButtonModule, IconModule, ToolbarModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BasicComponent } from './basic/basic.component';
import { ComplexComponent } from './complex/complex.component';
import { PositionComponent } from './position/position.component';

@NgModule({
  declarations: [BasicComponent, PositionComponent, ComplexComponent],
  imports: [CommonModule, BadgeModule, ButtonModule, ToolbarModule, IconModule],
})
export class BadgeExampleModule {}
