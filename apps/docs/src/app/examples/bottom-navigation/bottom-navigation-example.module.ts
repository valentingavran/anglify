import { BottomNavigationModule, IconModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicComponent } from './basic/basic.component';
import { FormControlComponent } from './form-control/form-control.component';
import { GrowComponent } from './grow/grow.component';
import { ShiftComponent } from './shift/shift.component';

@NgModule({
  declarations: [ShiftComponent, GrowComponent, BasicComponent, FormControlComponent],
  imports: [CommonModule, BottomNavigationModule, IconModule, ReactiveFormsModule, FormsModule],
})
export class BottomNavigationExampleModule {}
