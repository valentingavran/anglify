import { QueryList, TemplateRef } from '@angular/core';
import { SlotDirective } from './slot.directive';
import { MockElementRef } from '../../../../mocks/element-ref.mock';
describe('SlotDirective', () => {
  const directive = SlotDirective;
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should return right slots', () => {
    const elementRef = new MockElementRef();
    const templateRef1 = { elementRef } as unknown as TemplateRef<any>;
    const templateRef2 = { elementRef } as unknown as TemplateRef<any>;
    const slot1 = new SlotDirective(templateRef1);
    slot1.slot = 'slot1Name';
    const slot2 = new SlotDirective(templateRef2);
    slot2.slot = 'slot2Name';

    const queryList = [slot1, slot2] as unknown as QueryList<SlotDirective>;

    expect(SlotDirective.getSlot(queryList, 'slot1Name')).toBe(templateRef1);
    expect(SlotDirective.getSlot(queryList, 'slot1Name')).not.toBe(templateRef2);
    expect(SlotDirective.getSlot(queryList, 'slot2Name')).toBe(templateRef2);
    expect(SlotDirective.getSlot(queryList, 'slot3Name')).toBe(undefined);
  });

  it('should return undefined, if no slots available', () => {
    const queryList = [] as unknown as QueryList<SlotDirective>;

    expect(SlotDirective.getSlot(undefined, 'slot1Name')).toBe(undefined);
    expect(SlotDirective.getSlot(queryList, 'slot1Name')).toBe(undefined);
  });
});
