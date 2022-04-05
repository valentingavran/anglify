import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[anglifyPrepend]',
})
export class PrependDirective {
  public constructor(public template: TemplateRef<any>) {}
}
