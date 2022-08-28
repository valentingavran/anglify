import { ButtonComponent, StepDirective, StepperComponent, StepperNextDirective, StepperPreviousDirective } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './vertical-stepper.component.html',
  styleUrls: ['./vertical-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StepperComponent, StepDirective, StepperPreviousDirective, StepperNextDirective, ButtonComponent],
})
export default class VerticalStepperComponent {}
