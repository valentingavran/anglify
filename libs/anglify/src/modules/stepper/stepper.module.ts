import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StepperHeaderComponent } from './components/stepper-header/stepper-header.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { StepDirective } from './directives/step/step.directive';
import { StepperNextDirective } from './directives/stepper-next/stepper-next.directive';
import { StepperPreviousDirective } from './directives/stepper-previous/stepper-previous.directive';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
  imports: [AnglifyCommonModule, CommonModule, IconModule],
  declarations: [StepperComponent, StepperHeaderComponent, StepDirective, StepperNextDirective, StepperPreviousDirective],
  exports: [AnglifyCommonModule, StepperComponent, StepDirective, StepperNextDirective, StepperPreviousDirective],
})
export class StepperModule {}
