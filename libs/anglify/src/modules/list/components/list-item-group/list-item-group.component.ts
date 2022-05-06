import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, forwardRef, Input, QueryList } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { toBoolean } from 'libs/anglify/src/utils/functions';
import { BooleanLike } from 'libs/anglify/src/utils/interfaces';
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
  @ContentChildren(ListItemComponent, { descendants: true }) private readonly items?: QueryList<ListItemComponent>;

  @Input() public mandatory: BooleanLike = false;
  @Input() public multiple: BooleanLike = false;

  public onChange: (...args: any[]) => void = () => {};
  public onTouch: (...args: any[]) => void = () => {};

  private activeCount = 0;

  public ngAfterViewInit(): void {
    this.items?.forEach(item => this.createItemClickHandler(item));
  }

  public writeValue(value: number | number[] | null): void {
    let indicesToBeActive: number[] = [];
    if (Array.isArray(value)) {
      indicesToBeActive = value;
    } else if (value === null) {
    } else {
      indicesToBeActive.push(value);
    }
    this.items?.forEach((item, index) => {
      if (indicesToBeActive.includes(index)) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
  }

  public registerOnChange(fn: (...args: any[]) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (...args: any[]) => void): void {
    this.onTouch = fn;
  }

  private createItemClickHandler(item: ListItemComponent) {
    item.onClick.pipe(untilDestroyed(this)).subscribe(() => this.handleItemClick(item));
  }

  private handleItemClick(item: ListItemComponent) {
    let activeCount = this.activeCount;
    if (item.active) activeCount -= 1;

    const otherItemsSelected = activeCount > 0;
    if ((!otherItemsSelected && !toBoolean(item.active)) || (toBoolean(this.multiple) && !toBoolean(item.active))) {
      this.selectItem(item);
    } else if ((!toBoolean(this.mandatory) && toBoolean(item.active)) || (otherItemsSelected && toBoolean(item.active))) {
      this.deselectItem(item);
    } else if ((!toBoolean(this.multiple) && !otherItemsSelected) || !toBoolean(item.active)) {
      this.deselectAll();
      this.selectItem(item);
    }
  }

  public selectItem(item: ListItemComponent) {
    item.active = true;
    this.activeCount += 1;
  }

  public deselectItem(item: ListItemComponent) {
    item.active = false;
    this.activeCount -= 1;
  }

  public deselectAll() {
    this.items?.forEach(item => (item.active = false));
    this.activeCount = 0;
  }
}
