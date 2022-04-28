import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[anglifyPrependOuterIcon]',
})
export class PrependOuterIconDirective {
  public constructor(public template: TemplateRef<any>) {}
}
