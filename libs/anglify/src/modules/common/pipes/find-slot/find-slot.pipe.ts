import { Pipe, PipeTransform, QueryList, TemplateRef } from '@angular/core';
import { SlotDirective } from '../../directives/slot/slot.directive';

@Pipe({
  name: 'findSlot',
})
export class FindSlotPipe implements PipeTransform {
  public transform(slots: QueryList<SlotDirective> | undefined, name: string): TemplateRef<any> | undefined {
    return SlotDirective.getSlot(slots, name);
  }
}
