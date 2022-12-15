import { Directive, HostListener } from '@angular/core';
import { StepperService } from './stepper.service';

@Directive({
  selector: '[anglifyStepperPrevious]',
  standalone: true,
})
export class StepperPreviousDirective {
  public constructor(private readonly stepper: StepperService) {}

  @HostListener('click')
  public onClick() {
    this.stepper.previous();
  }
}
