import { Directive, HostListener } from '@angular/core';
import { Stepper } from '../../services/stepper/stepper.service';

@Directive({
  selector: '[anglifyStepperNext]',
})
export class StepperNextDirective {
  public constructor(private readonly stepper: Stepper) {}

  @HostListener('click')
  public onClick(): void {
    this.stepper.next();
  }
}
