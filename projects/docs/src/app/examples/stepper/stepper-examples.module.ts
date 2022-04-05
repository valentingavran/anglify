import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HorizontalStepperComponent } from './horizontal-stepper/horizontal-stepper.component';
import { VerticalStepperComponent } from './vertical-stepper/vertical-stepper.component';
import { ButtonModule } from '../../../../../anglify/src/modules/button/button.module';
import { StepperModule } from '../../../../../anglify/src/modules/stepper/stepper.module';

@NgModule({
  declarations: [VerticalStepperComponent, HorizontalStepperComponent],
  imports: [CommonModule, StepperModule, ButtonModule],
})
export class StepperExamplesModule {}
