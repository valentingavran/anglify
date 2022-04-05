import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-horizontal-stepper',
  templateUrl: './horizontal-stepper.component.html',
  styleUrls: ['./horizontal-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalStepperComponent {}

export default HorizontalStepperComponent;
