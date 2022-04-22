import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[anglifyStepperVisitedIcon]',
})
export class StepperVisitedIconDirective {
  public constructor(public template: TemplateRef<any>) {}
}
