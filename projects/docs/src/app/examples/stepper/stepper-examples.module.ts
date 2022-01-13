import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalStepperComponent } from './vertical-stepper/vertical-stepper.component';
import { StepperModule } from '../../../../../anglify/src/modules/stepper/stepper.module';
import { HorizontalStepperComponent } from './horizontal-stepper/horizontal-stepper.component';

@NgModule({
  declarations: [VerticalStepperComponent, HorizontalStepperComponent],
  imports: [CommonModule, StepperModule],
})
export class StepperExamplesModule {}
