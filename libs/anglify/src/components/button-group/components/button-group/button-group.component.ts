import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  forwardRef,
  Inject,
  Input,
  QueryList,
  Self,
  type AfterViewInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, map, startWith, take, tap } from 'rxjs';
import { createSettingsProvider } from '../../../../factories/settings.factory';
import { BUTTON_GROUP_SETTINGS, DEFAULT_BUTTON_GROUP_SETTINGS } from '../../button-group-settings.token';
import { EntireButtonGroupSettings } from '../../button-group.interface';
import { ButtonGroupItemComponent } from '../button-group-item/button-group-item.component';

@UntilDestroy()
@Component({
  selector: 'anglify-button-group',
  standalone: true,
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonGroupComponent),
      multi: true,
    },
    createSettingsProvider<EntireButtonGroupSettings>('anglifyButtonGroupSettings', DEFAULT_BUTTON_GROUP_SETTINGS, BUTTON_GROUP_SETTINGS),
  ],
})
export class ButtonGroupComponent implements AfterViewInit, ControlValueAccessor {
  @ContentChildren(ButtonGroupItemComponent, { descendants: true }) private readonly items?: QueryList<ButtonGroupItemComponent>;

  /**
   * Forces a value to always be selected (if available).
   */
  @Input() public mandatory = this.settings.mandatory;

  /**
   * Allow multiple selections.
   */
  @Input() public multiple = this.settings.multiple;

  /**
   * Sets a maximum number of selections that can be made.
   */
  @Input() public max = this.settings.max;

  /**
   * With this property the toggle function can be deactivated. This means that the items no longer save a state.
   */
  @Input() public stateless = this.settings.stateless;

  public onChange: (...args: any[]) => void = () => {};

  public onTouch: (...args: any[]) => void = () => {};

  public readonly itemGroupItems$ = new BehaviorSubject<ButtonGroupItemComponent[]>([]);

  public constructor(@Self() @Inject('anglifyButtonGroupSettings') public settings: EntireButtonGroupSettings) {}

  public writeValue(value: number[] | number | null) {
    if (this.stateless) return;
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

  private createItemClickHandler(item: ButtonGroupItemComponent) {
    item.onClick.pipe(untilDestroyed(this)).subscribe(() => this.handleItemClick(item));
  }

  public handleItemClick = (item: ButtonGroupItemComponent) => {
    if (this.stateless) return;
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

    this.onChange(this.getActiveIndices());
  };

  private selectItem(item: ButtonGroupItemComponent) {
    item.active = true;
  }

  private deselectItem(item: ButtonGroupItemComponent) {
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
    if (this.items) {
      this.items.changes
        .pipe(
          untilDestroyed(this),
          startWith(this.items),
          map(slots => slots.toArray() as ButtonGroupItemComponent[]),
          tap(items => {
            for (const item of items) {
              this.createItemClickHandler(item);
            }

            // eslint-disable-next-line no-restricted-globals
            setTimeout(() => this.itemGroupItems$.next(items), 0);
          })
        )
        .subscribe();
    }
  }
}
