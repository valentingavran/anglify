import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[anglifyLabel]',
})
export class LabelDirective {
  public constructor(public template: TemplateRef<any>) {}
}
