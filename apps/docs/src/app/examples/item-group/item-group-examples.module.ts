import { ButtonModule, CardModule, IconModule, ItemGroupModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultComponent } from './default/default.component';
import { FormControlComponent } from './form-control/form-control.component';
import { MandatoryComponent } from './mandatory/mandatory.component';
import { MaxComponent } from './max/max.component';
import { MultipleMandatoryComponent } from './multiple-mandatory/multiple-mandatory.component';
import { MultipleComponent } from './multiple/multiple.component';

@NgModule({
  declarations: [MultipleComponent, MultipleMandatoryComponent, MandatoryComponent, DefaultComponent, MaxComponent, FormControlComponent],
  imports: [CommonModule, CardModule, ButtonModule, ItemGroupModule, ReactiveFormsModule, FormsModule, IconModule],
  exports: [MultipleComponent, MultipleMandatoryComponent, MandatoryComponent, DefaultComponent],
})
export class ItemGroupExamplesModule {}
