import { Directive, HostListener } from '@angular/core';
import { Stepper } from '../../services/stepper/stepper.service';

@Directive({
  selector: '[StepperNext]',
})
export class StepperNextDirective {
  public constructor(private readonly stepper: Stepper) {}

  @HostListener('click')
  public onClick(): void {
    this.stepper.next();
  }
}
