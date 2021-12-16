import { Directive, HostListener } from '@angular/core';
import { Stepper } from '../../services/stepper/stepper.service';

@Directive({
  selector: '[anglifyStepperPrevious]',
})
export class StepperPreviousDirective {
  public constructor(private readonly stepper: Stepper) {}

  @HostListener('click')
  public onClick(): void {
    this.stepper.previous();
  }
}
