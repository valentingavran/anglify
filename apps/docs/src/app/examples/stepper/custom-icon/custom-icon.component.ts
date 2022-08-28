import {
  ButtonComponent,
  IconComponent,
  SlotDirective,
  StepDirective,
  StepperComponent,
  StepperNextDirective,
  StepperPreviousDirective,
} from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './custom-icon.component.html',
  styleUrls: ['./custom-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StepperComponent, IconComponent, SlotDirective, StepDirective, ButtonComponent, StepperNextDirective, StepperPreviousDirective],
})
export default class CustomIconComponent {}
