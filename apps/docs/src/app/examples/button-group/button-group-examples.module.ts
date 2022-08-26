import { ButtonGroupModule, IconModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DisabledComponent } from './disabled/disabled.component';
import { MandatoryComponent } from './mandatory/mandatory.component';
import { MaxComponent } from './max/max.component';
import { MultipleMandatoryComponent } from './multiple-mandatory/multiple-mandatory.component';
import { MultipleComponent } from './multiple/multiple.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { StatelessComponent } from './stateless/stateless.component';

@NgModule({
  declarations: [
    DisabledComponent,
    MandatoryComponent,
    MaxComponent,
    MultipleComponent,
    MultipleMandatoryComponent,
    ReactiveFormsComponent,
    StatelessComponent,
  ],
  imports: [CommonModule, ButtonGroupModule, IconModule, ReactiveFormsModule],
})
export class ButtonGroupExamplesModule {}
