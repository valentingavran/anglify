import { Directive, Input, QueryList, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[slot]',
})
export class SlotDirective {
  @Input() public slot: string | undefined;

  public constructor(public readonly template: TemplateRef<any>) {}

  public static getSlot(slots: QueryList<SlotDirective> | undefined, name: string): TemplateRef<any> | undefined {
    const slot = slots?.find(s => s.slot === name);
    return slot ? slot.template : undefined;
  }
}
