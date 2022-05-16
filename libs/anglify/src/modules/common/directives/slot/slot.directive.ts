import { Directive, Input, QueryList, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[slot]',
})
export class SlotDirective<T = any> {
  @Input() public slot: string | undefined;

  public data!: T;

  public constructor(public readonly template: TemplateRef<any>) {}

  public static getSlot(slots: QueryList<SlotDirective> | undefined, name: string) {
    return slots?.find(s => s.slot === name)?.template;
  }
}
