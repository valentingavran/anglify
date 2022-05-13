import { BottomNavigationModule, IconModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BasicComponent } from './basic/basic.component';
import { GrowComponent } from './grow/grow.component';
import { ShiftComponent } from './shift/shift.component';

@NgModule({
  declarations: [ShiftComponent, GrowComponent, BasicComponent],
  imports: [CommonModule, BottomNavigationModule, IconModule],
})
export class BottomNavigationExampleModule {}
