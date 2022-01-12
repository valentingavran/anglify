import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-vertical-stepper',
  templateUrl: './vertical-stepper.component.html',
  styleUrls: ['./vertical-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalStepperComponent {}

export default VerticalStepperComponent;
