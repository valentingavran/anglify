import { CheckboxModule, IconModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import AppearancesComponent from './appearances/appearances.component';
import CustomIconsComponent from './custom-icons/custom-icons.component';
import FormsComponent from './forms/forms.component';
import SizesComponent from './sizes/sizes.component';

@NgModule({
  imports: [CommonModule, CheckboxModule, FormsModule, ReactiveFormsModule, IconModule],
  declarations: [AppearancesComponent, FormsComponent, CustomIconsComponent, SizesComponent],
})
export class CheckBoxExamplesModule {}
