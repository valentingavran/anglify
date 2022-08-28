import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, forwardRef, Input, QueryList } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, first, map, startWith, tap } from 'rxjs';
import { ListItemComponent } from '../list-item/list-item.component';

@UntilDestroy()
@Component({
  selector: 'anglify-list-item-group',
  standalone: true,
  templateUrl: './list-item-group.component.html',
  styleUrls: ['./list-item-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListItemGroupComponent),
      multi: true,
    },
  ],
})
export class ListItemGroupComponent implements AfterViewInit, ControlValueAccessor {
  @ContentChildren(ListItemComponent, { descendants: true }) private readonly allSlots?: QueryList<ListItemComponent>;

  /** Forces a value to always be selected (if available). */
  @Input() public mandatory = false;
  /** Allow multiple selections. */
  @Input() public multiple = false;
  /** Sets a maximum number of selections that can be made. */
  @Input() public max?: number;

  public onChange: (...args: any[]) => void = () => {};
  public onTouch: (...args: any[]) => void = () => {};

  public readonly itemGroupItems$ = new BehaviorSubject<ListItemComponent[]>([]);

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

  private createItemClickHandler(item: ListItemComponent) {
    item.onClick.pipe(untilDestroyed(this)).subscribe(() => this.handleItemClick(item));
  }

  public handleItemClick = (item: ListItemComponent) => {
    const activeCount = this.itemGroupItems$.value.filter(item => item.active).length;
    let otherSelectedItemsCount = activeCount;
    if (item.active) {
      // don't count this item if it's selected, because only other items should be counted
      otherSelectedItemsCount -= 1;
    }

    const areOtherItemsSelected = otherSelectedItemsCount > 0;

    // See README.md for explanation of this logic
    if ((!areOtherItemsSelected && !item.active) || (this.multiple && !item.active)) {
      if (this.max === undefined) {
        this.selectItem(item);
      } else if (activeCount < this.max) {
        this.selectItem(item);
      }
    } else if ((!this.mandatory && item.active) || (areOtherItemsSelected && item.active)) {
      this.deselectItem(item);
    } else if ((!this.multiple && !areOtherItemsSelected) || !item.active) {
      this.deselectAll();
      this.selectItem(item);
    }
    this.onChange(this.getActiveIndices());
  };

  private selectItem(item: ListItemComponent) {
    item.active = true;
  }

  private deselectItem(item: ListItemComponent) {
    item.active = false;
  }

  private deselectAll() {
    this.itemGroupItems$.value.forEach(item => (item.active = false));
  }

  private activateAllIndices(indices: number[]) {
    this.itemGroupItems$.value.forEach((item, index) => {
      if (indices.includes(index)) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
  }

  private getActiveIndices(): number[] {
    return this.itemGroupItems$.value
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.active)
      .map(({ index }) => index);
  }

  public ngAfterViewInit() {
    if (this.allSlots) {
      this.allSlots.changes
        .pipe(
          untilDestroyed(this),
          startWith(this.allSlots),
          map(slots => slots as ListItemComponent[]),
          tap(items => {
            items.forEach(item => {
              this.createItemClickHandler(item);
            });
            setTimeout(() => this.itemGroupItems$.next(items), 0);
          })
        )
        .subscribe();
    }
  }
}
