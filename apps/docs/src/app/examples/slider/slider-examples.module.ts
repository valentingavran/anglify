import { SliderModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BasicComponent } from './basic/basic.component';
import { TicksComponent } from './ticks/ticks.component';

@NgModule({
  declarations: [BasicComponent, TicksComponent],
  imports: [CommonModule, SliderModule],
})
export class SliderExamplesModule {}
