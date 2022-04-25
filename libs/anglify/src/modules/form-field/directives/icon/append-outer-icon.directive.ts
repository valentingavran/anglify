import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[anglifyAppendOuterIcon]',
})
export class AppendOuterIconDirective {
  public constructor(public template: TemplateRef<any>) {}
}
