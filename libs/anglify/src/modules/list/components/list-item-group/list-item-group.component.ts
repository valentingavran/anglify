import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, forwardRef, Input, QueryList } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { diff, pull, toBoolean } from 'libs/anglify/src/utils/functions';
import { BooleanLike } from 'libs/anglify/src/utils/interfaces';
import { BehaviorSubject, map, pairwise, startWith, tap } from 'rxjs';
import { ListItemComponent } from '../list-item/list-item.component';

@UntilDestroy()
@Component({
  selector: 'anglify-list-item-group',
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
  @ContentChildren(ListItemComponent) private readonly items?: QueryList<ListItemComponent>;

  @Input() public mandatory: BooleanLike = false;
  @Input() public multiple: BooleanLike = false;

  public onChange: (...args: any[]) => void = () => {};
  public onTouch: (...args: any[]) => void = () => {};

  private readonly selectedIndices$ = new BehaviorSubject<number[]>([]);
  private readonly selectedIndicesHandler = this.selectedIndices$.pipe(
    startWith([]),
    pairwise(),
    map(([oldIndices, newIndices]) => diff(oldIndices, newIndices)),
    tap(diff => {
      const itemsToDeselect = this.items?.filter((_, index) => diff.removed.includes(index));
      const itemsToSelect = this.items?.filter((_, index) => diff.added.includes(index));

      itemsToDeselect?.forEach(item => (item.active = false));
      itemsToSelect?.forEach(item => (item.active = true));
    })
  );

  public constructor() {
    this.selectedIndicesHandler.pipe(untilDestroyed(this)).subscribe();
  }

  public ngAfterViewInit(): void {
    this.items?.forEach((item, index) => this.createItemClickHandler(item, index));
  }

  public writeValue(value: number | number[] | null): void {
    let valueToBeSet: number[] = [];
    if (Array.isArray(value)) {
      valueToBeSet = value;
    } else if (value === null) {
    } else {
      valueToBeSet.push(value);
    }
    this.selectedIndices$.next(valueToBeSet);
  }

  public registerOnChange(fn: (...args: any[]) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (...args: any[]) => void): void {
    this.onTouch = fn;
  }

  private createItemClickHandler(item: ListItemComponent, index: number) {
    item.onClick.pipe(untilDestroyed(this)).subscribe(() => this.handleItemClick(item, index));
  }

  private handleItemClick(item: ListItemComponent, index: number) {
    const otherItemsSelected = pull(this.selectedIndices$.value, index).length > 0;
    if ((!otherItemsSelected && !toBoolean(item.active)) || (toBoolean(this.multiple) && !toBoolean(item.active))) {
      this.addIndexToIndices(index);
    } else if ((!toBoolean(this.mandatory) && toBoolean(item.active)) || (otherItemsSelected && toBoolean(item.active))) {
      this.removeIndexFromIndices(index);
    } else if ((!toBoolean(this.multiple) && !otherItemsSelected) || !toBoolean(item.active)) {
      this.selectedIndices$.next([index]);
    }
  }

  public addIndexToIndices(index: number) {
    this.selectedIndices$.next([...this.selectedIndices$.value, index]);
  }

  public removeIndexFromIndices(index: number) {
    this.selectedIndices$.next(pull(this.selectedIndices$.value, index));
  }
}
