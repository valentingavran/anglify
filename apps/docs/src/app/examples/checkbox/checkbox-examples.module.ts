import { CheckboxModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import AppearancesComponent from './appearances/appearances.component';
import FormsComponent from './forms/forms.component';

@NgModule({
  imports: [CommonModule, CheckboxModule, FormsModule, ReactiveFormsModule],
  declarations: [AppearancesComponent, FormsComponent],
})
export class CheckBoxExamplesModule {}
