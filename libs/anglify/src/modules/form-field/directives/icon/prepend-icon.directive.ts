import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[anglifyPrependIcon]',
})
export class PrependIconDirective {
  public constructor(public template: TemplateRef<any>) {}
}
