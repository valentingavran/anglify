import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Input,
  QueryList,
  Self,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, first, map, startWith, tap } from 'rxjs';
import { ELEVATION } from '../../../../composables/elevation/elevation.provider';
import { createSettingsProvider } from '../../../../factories/settings.factory';
import { bindClassToNativeElement, toBoolean } from '../../../../utils/functions';
import { BooleanLike } from '../../../../utils/interfaces';
import { DEFAULT_EXPANSION_PANELS_SETTINGS, EXPANSION_PANELS_SETTINGS } from '../../expansion-panels-settings.token';
import { EntireExpansionPanelsSettings } from '../../expansion-panels.interface';
import { ExpansionPanelComponent } from '../expansion-panel/expansion-panel.component';

@UntilDestroy()
@Component({
  selector: 'anglify-expansion-panels',
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

  @Input() public mandatory: BooleanLike = this.settings.mandatory;
  @Input() public multiple: BooleanLike = this.settings.multiple;
  @Input() public max: number | undefined = this.settings.max;
  @Input() public set accordion(value: BooleanLike) {
    this.accordion$.next(toBoolean(value));
  }

  public get accordion() {
    return this.accordion$.value;
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
    if ((!areOtherItemsSelected && !toBoolean(item.active)) || (toBoolean(this.multiple) && !toBoolean(item.active))) {
      if (this.max === undefined) {
        this.selectItem(item);
      } else if (activeCount < this.max) {
        this.selectItem(item);
      }
    } else if ((!toBoolean(this.mandatory) && toBoolean(item.active)) || (areOtherItemsSelected && toBoolean(item.active))) {
      this.deselectItem(item);
    } else if ((!toBoolean(this.multiple) && !areOtherItemsSelected) || !toBoolean(item.active)) {
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
      .filter(({ item }) => toBoolean(item.active))
      .map(({ index }) => index);
  }

  public ngAfterViewInit(): void {
    if (this.allSlots) {
      this.allSlots.changes
        .pipe(
          untilDestroyed(this),
          startWith(this.allSlots),
          map(slots => slots as ExpansionPanelComponent[]),
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
