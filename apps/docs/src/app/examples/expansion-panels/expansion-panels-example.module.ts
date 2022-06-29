import { ButtonModule, ExpansionPanelsModule, ItemGroupModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import AccordionComponent from './accordion/accordion.component';
import { BasicComponent } from './basic/basic.component';
import MandatoryComponent from './mandatory/mandatory.component';
import MultipleComponent from './multiple/multiple.component';

@NgModule({
  declarations: [BasicComponent, MandatoryComponent, MultipleComponent, AccordionComponent],
  imports: [CommonModule, ExpansionPanelsModule, ItemGroupModule, ButtonModule],
})
export class ExpansionPanelsExampleModule {}
