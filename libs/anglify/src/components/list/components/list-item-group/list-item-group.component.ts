import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  type AfterViewInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, map, startWith, take, tap } from 'rxjs';
import { ListItemComponent } from '../list-item/list-item.component';

@UntilDestroy()
@Component({
  selector: 'anglify-list-item-group',
  standalone: true,
  templateUrl: './list-item-group.component.html',
  styleUrls: ['./list-item-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemGroupComponent implements AfterViewInit {
  @ContentChildren(ListItemComponent, { descendants: true }) private readonly allSlots?: QueryList<ListItemComponent>;

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

  public readonly itemGroupItems$ = new BehaviorSubject<ListItemComponent[]>([]);

  @Input() public set value(value: number[]) {
    if (this.itemGroupItems$.value.length === 0) {
      /* It may happen that this setter is called before the slots have been loaded or any are present at all.
      As soon as the slots change, this method is called. */
      this.itemGroupItems$
        .pipe(
          untilDestroyed(this),
          filter(items => items.length > 0),
          take(1)
        )
        .subscribe(() => this.activateAllIndices(value));
    } else {
      this.activateAllIndices(value);
    }
  }

  @Output() public readonly valueChange = new EventEmitter<number[]>();

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
        // eslint-disable-next-line sonarjs/no-duplicated-branches
      } else if (activeCount < this.max) {
        this.selectItem(item);
      }
    } else if ((!this.mandatory && item.active) || (areOtherItemsSelected && item.active)) {
      this.deselectItem(item);
    } else if ((!this.multiple && !areOtherItemsSelected) || !item.active) {
      this.deselectAll();
      this.selectItem(item);
    }

    this.valueChange.emit(this.getActiveIndices());
  };

  private selectItem(item: ListItemComponent) {
    item.active = true;
  }

  private deselectItem(item: ListItemComponent) {
    item.active = false;
  }

  private deselectAll() {
    for (const item of this.itemGroupItems$.value) item.active = false;
  }

  private activateAllIndices(indices: number[]) {
    for (const [index, item] of this.itemGroupItems$.value.entries()) {
      if (indices.includes(index)) {
        item.active = true;
      } else {
        item.active = false;
      }
    }
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
          map(slots => slots.toArray() as ListItemComponent[]),
          tap(items => {
            for (const item of items) {
              this.createItemClickHandler(item);
            }

            setTimeout(() => this.itemGroupItems$.next(items), 0);
          })
        )
        .subscribe();
    }
  }
}
