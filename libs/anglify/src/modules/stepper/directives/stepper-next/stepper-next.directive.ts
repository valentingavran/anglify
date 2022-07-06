import { Directive, HostListener } from '@angular/core';
import { StepperService } from '../../services/stepper/stepper.service';

@Directive({
  selector: '[anglifyStepperNext]',
})
export class StepperNextDirective {
  public constructor(private readonly stepper: StepperService) {}

  @HostListener('click')
  public onClick() {
    this.stepper.next();
  }
}
