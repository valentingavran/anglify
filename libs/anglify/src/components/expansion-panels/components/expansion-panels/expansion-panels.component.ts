import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Input,
  QueryList,
  Self,
  type AfterViewInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, map, startWith, take, tap } from 'rxjs';
import { ELEVATION } from '../../../../composables/elevation/elevation.provider';
import { createSettingsProvider } from '../../../../factories/settings.factory';
import { bindClassToNativeElement } from '../../../../utils/functions';
import { DEFAULT_EXPANSION_PANELS_SETTINGS, EXPANSION_PANELS_SETTINGS } from '../../expansion-panels-settings.token';
import { EntireExpansionPanelsSettings } from '../../expansion-panels.interface';
import { ExpansionPanelComponent } from '../expansion-panel/expansion-panel.component';

@UntilDestroy()
@Component({
  selector: 'anglify-expansion-panels',
  standalone: true,
  templateUrl: './expansion-panels.component.html',
  styleUrls: ['./expansion-panels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    createSettingsProvider<EntireExpansionPanelsSettings>(
      'anglifyExpansionPanelsSettings',
      DEFAULT_EXPANSION_PANELS_SETTINGS,
      EXPANSION_PANELS_SETTINGS
    ),
    ELEVATION,
  ],
})
export class ExpansionPanelsComponent implements AfterViewInit {
  @ContentChildren(ExpansionPanelComponent, { descendants: true }) private readonly allSlots?: QueryList<ExpansionPanelComponent>;

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
  @Input() public max: number | undefined = this.settings.max;

  public get accordion() {
    return this.accordion$.value;
  }

  /**
   * Removes the margin around open panels.
   */
  @Input() public set accordion(value: boolean) {
    this.accordion$.next(value);
  }

  public onChange: (...args: any[]) => void = () => {};

  public onTouch: (...args: any[]) => void = () => {};

  public readonly itemGroupItems$ = new BehaviorSubject<ExpansionPanelComponent[]>([]);

  private readonly accordion$ = new BehaviorSubject<boolean>(this.settings.accordion);

  public constructor(
    public readonly elementRef: ElementRef<HTMLElement>,
    @Self() @Inject('anglifyExpansionPanelsSettings') public settings: EntireExpansionPanelsSettings
  ) {
    bindClassToNativeElement(this, this.accordion$, this.elementRef.nativeElement, 'anglify-expansion-panels-accordion');
  }

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

  private createItemClickHandler(item: ExpansionPanelComponent) {
    item.onClick.pipe(untilDestroyed(this)).subscribe(() => this.handleItemClick(item));
  }

  public handleItemClick = (item: ExpansionPanelComponent) => {
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

  private selectItem(item: ExpansionPanelComponent) {
    item.active = true;
  }

  private deselectItem(item: ExpansionPanelComponent) {
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
          map(slots => slots.toArray() as ExpansionPanelComponent[]),
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
