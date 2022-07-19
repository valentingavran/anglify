import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, forwardRef, Input, QueryList } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, first, map, startWith, tap } from 'rxjs';

import { SlotDirective } from '../common/directives/slot/slot.directive';

@UntilDestroy()
@Component({
  selector: 'anglify-item-group',
  templateUrl: './item-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemGroupComponent),
      multi: true,
    },
  ],
})
export class ItemGroupComponent implements ControlValueAccessor, AfterViewInit {
  @ContentChildren(SlotDirective, { descendants: true }) private readonly allSlots?: QueryList<SlotDirective<boolean>>;

  @Input() public mandatory = false;
  @Input() public multiple = false;
  @Input() public max?: number;

  public onChange: (...args: any[]) => void = () => {};
  public onTouch: (...args: any[]) => void = () => {};

  public readonly itemGroupItems$ = new BehaviorSubject<SlotDirective<boolean>[]>([]);

  public writeValue(value: number | number[] | null) {
    let indicesToBeActive: number[] = [];
    if (Array.isArray(value)) {
      indicesToBeActive = value;
    } else if (value === null) {
    } else {
      indicesToBeActive.push(value);
    }

    if (this.itemGroupItems$.value.length === 0) {
      /* It may happen that writeValue is called before the slots have been loaded or any are present at all.
      As soon as the slots change, this method is called. */
      this.itemGroupItems$
        .pipe(
          untilDestroyed(this),
          filter(items => items.length > 0),
          first()
        )
        .subscribe(() => this.activateAllIndices(indicesToBeActive));
    } else {
      this.activateAllIndices(indicesToBeActive);
    }
  }

  public registerOnChange(fn: (...args: any[]) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (...args: any[]) => void) {
    this.onTouch = fn;
  }

  // This needs to be a arrow function, otherwise the reference to the component instance is lost
  public handleItemClick = (item: SlotDirective<boolean>) => () => {
    const activeCount = this.itemGroupItems$.value.filter(item => item.data).length;
    let otherSelectedItemsCount = activeCount;
    if (item.data) {
      // don't count this item if it's selected, because only other items should be counted
      otherSelectedItemsCount -= 1;
    }

    const areOtherItemsSelected = otherSelectedItemsCount > 0;

    // See README.md for explanation of this logic
    if ((!areOtherItemsSelected && !item.data) || (this.multiple && !item.data)) {
      if (this.max === undefined) {
        this.selectItem(item);
      } else if (activeCount < this.max) {
        this.selectItem(item);
      }
    } else if ((!this.mandatory && item.data) || (areOtherItemsSelected && item.data)) {
      this.deselectItem(item);
    } else if ((!this.multiple && !areOtherItemsSelected) || !item.data) {
      this.deselectAll();
      this.selectItem(item);
    }
    this.onChange(this.getActiveIndices());
  };

  private selectItem(item: SlotDirective) {
    item.data = true;
  }

  private deselectItem(item: SlotDirective) {
    item.data = false;
  }

  private deselectAll() {
    this.itemGroupItems$.value.forEach(item => (item.data = false));
  }

  private activateAllIndices(indices: number[]) {
    this.itemGroupItems$.value.forEach((item, index) => {
      if (indices.includes(index)) {
        item.data = true;
      } else {
        item.data = false;
      }
    });
  }

  private getActiveIndices(): number[] {
    return this.itemGroupItems$.value
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.data)
      .map(({ index }) => index);
  }

  public ngAfterViewInit(): void {
    if (this.allSlots) {
      this.allSlots.changes
        .pipe(
          untilDestroyed(this),
          startWith(this.allSlots),
          map(slots => slots as SlotDirective<boolean>[]),
          map(slots => slots.filter(item => item.slot === 'item-group-item')),
          tap(items => {
            setTimeout(() => this.itemGroupItems$.next(items), 0);
          })
        )
        .subscribe();
    }
  }
}
