import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalStepperComponent } from './vertical-stepper/vertical-stepper.component';
import { StepperModule } from '../../../../../anglify/src/modules/stepper/stepper.module';

@NgModule({
  declarations: [VerticalStepperComponent],
  imports: [CommonModule, StepperModule],
})
export class StepperExamplesModule {}
