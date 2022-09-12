import { Directive, Input, TemplateRef, type QueryList } from '@angular/core';

@Directive({
  selector: 'ng-template[slot]',
  standalone: true,
})
export class SlotDirective<T = any> {
  @Input() public slot: string | undefined;

  public data!: T;

  public constructor(public readonly template: TemplateRef<any>) {}

  public static getSlot(slots: QueryList<SlotDirective> | undefined, name: string) {
    return slots?.find(slot => slot.slot === name)?.template;
  }
}
