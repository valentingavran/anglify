import { AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, forwardRef, Input, QueryList, type AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, map, startWith, take, tap } from 'rxjs';
import { SlotDirective } from '../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../directives/slot-outlet/slot-outlet.directive';
import { FindSlotPipe } from '../../pipes/find-slot/find-slot.pipe';

@UntilDestroy()
@Component({
  selector: 'anglify-item-group',
  standalone: true,
  templateUrl: './item-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemGroupComponent),
      multi: true,
    },
  ],
  imports: [NgForOf, AsyncPipe, SlotOutletDirective, FindSlotPipe],
})
export class ItemGroupComponent implements ControlValueAccessor, AfterViewInit {
  @ContentChildren(SlotDirective, { descendants: true }) private readonly allSlots?: QueryList<SlotDirective<boolean>>;

  /**
   * Forces a value to always be selected (if available).
   */
  @Input() public mandatory = false;

  /**
   * Allow multiple selections.
   */
  @Input() public multiple = false;

  /**
   * Sets a maximum number of selections that can be made.
   */
  @Input() public max?: number;

  public onChange: (...args: any[]) => void = () => {};

  public onTouch: (...args: any[]) => void = () => {};

  public readonly itemGroupItems$ = new BehaviorSubject<SlotDirective<boolean>[]>([]);

  public writeValue(value: number[] | number | null) {
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
          take(1)
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
        // eslint-disable-next-line sonarjs/no-duplicated-branches
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
    for (const item of this.itemGroupItems$.value) item.data = false;
  }

  private activateAllIndices(indices: number[]) {
    for (const [index, item] of this.itemGroupItems$.value.entries()) {
      if (indices.includes(index)) {
        item.data = true;
      } else {
        item.data = false;
      }
    }
  }

  private getActiveIndices(): number[] {
    return this.itemGroupItems$.value
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.data)
      .map(({ index }) => index);
  }

  public ngAfterViewInit() {
    if (this.allSlots) {
      this.allSlots.changes
        .pipe(
          untilDestroyed(this),
          startWith(this.allSlots),
          map(slots => slots.toArray() as SlotDirective<boolean>[]),
          map(slots => slots.filter(item => item.slot === 'item-group-item')),
          tap(items => {
            // eslint-disable-next-line no-restricted-globals
            setTimeout(() => this.itemGroupItems$.next(items), 0);
          })
        )
        .subscribe();
    }
  }
}
