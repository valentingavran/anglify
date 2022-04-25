import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StepperHeaderComponent } from './components/stepper-header/stepper-header.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { Step } from './directives/step/step.directive';
import { StepperNextDirective } from './directives/stepper-next/stepper-next.directive';
import { StepperPreviousDirective } from './directives/stepper-previous/stepper-previous.directive';
import { StepperVisitedIconDirective } from './directives/stepper-visited-icon/stepper-visited-icon.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    StepperComponent,
    StepperHeaderComponent,
    Step,
    StepperNextDirective,
    StepperPreviousDirective,
    StepperVisitedIconDirective,
  ],
  exports: [StepperComponent, Step, StepperNextDirective, StepperPreviousDirective, StepperVisitedIconDirective],
})
export class StepperModule {}
