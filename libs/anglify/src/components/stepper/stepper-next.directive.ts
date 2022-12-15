import { Directive, HostListener } from '@angular/core';
import { StepperService } from './stepper.service';

@Directive({
  selector: '[anglifyStepperNext]',
  standalone: true,
})
export class StepperNextDirective {
  public constructor(private readonly stepper: StepperService) {}

  @HostListener('click')
  public onClick() {
    this.stepper.next();
  }
}
