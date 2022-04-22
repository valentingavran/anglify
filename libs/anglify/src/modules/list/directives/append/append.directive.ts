import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[anglifyAppend]',
})
export class AppendDirective {
  public constructor(public template: TemplateRef<any>) {}
}
