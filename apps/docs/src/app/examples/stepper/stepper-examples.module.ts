import { ButtonModule, IconModule, StepperModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomIconComponent } from './custom-icon/custom-icon.component';
import { HorizontalStepperComponent } from './horizontal-stepper/horizontal-stepper.component';
import { VerticalStepperComponent } from './vertical-stepper/vertical-stepper.component';

@NgModule({
  declarations: [VerticalStepperComponent, HorizontalStepperComponent, CustomIconComponent],
  imports: [CommonModule, StepperModule, ButtonModule, IconModule],
})
export class StepperExamplesModule {}
