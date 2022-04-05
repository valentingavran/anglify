import { CommonModule } from '@angular/common';
import { ButtonModule, StepperModule } from '@anglify/components';
import { NgModule } from '@angular/core';
import { HorizontalStepperComponent } from './horizontal-stepper/horizontal-stepper.component';
import { VerticalStepperComponent } from './vertical-stepper/vertical-stepper.component';

@NgModule({
  declarations: [VerticalStepperComponent, HorizontalStepperComponent],
  imports: [CommonModule, StepperModule, ButtonModule],
})
export class StepperExamplesModule {}
