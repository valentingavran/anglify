import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-stepper-page',
  templateUrl: './stepper-page.component.html',
  styleUrls: ['./stepper-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperPageComponent {}
