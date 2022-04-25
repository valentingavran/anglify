import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[anglifyAppendIcon]',
})
export class AppendIconDirective {
  public constructor(public template: TemplateRef<any>) {}
}
