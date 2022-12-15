import { CommonModule } from '@angular/common';
import type { AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  Output,
  QueryList,
  Self,
  ViewChild,
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { MiddlewareArguments } from '@floating-ui/dom';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged, fromEvent, map, merge, NEVER, of, switchMap, tap } from 'rxjs';
import { SlotDirective } from '../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { FindSlotPipe } from '../../pipes/find-slot/find-slot.pipe';
import { SelectItemViewerPipe } from '../../pipes/select-item-viewer.pipe';
import { INTERNAL_ICONS } from '../../tokens/internal-icons.token';
import { rotate } from '../../utils/animations';
import { Machine } from '../../utils/machine';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { InternalIconSetDefinition } from '../icon/icon.interface';
import { InputComponent } from '../input/input.component';
import { InputDirective } from '../input/input.directive';
import { ListItemComponent } from '../list/components/list-item/list-item.component';
import { ListItemTitleComponent } from '../list/components/list-item-title/list-item-title.component';
import { MenuComponent } from '../menu/menu.component';
import { AUTOCOMPLETE_SETTINGS, DEFAULT_AUTOCOMPLETE_SETTINGS } from './autocomplete-settings.token';
import { EntireAutocompleteSettings } from './autocomplete.interface';
import { AutocompleteAction, createAutocompleteMachineConfig } from './autocomplete.machine';

@UntilDestroy()
@Component({
  selector: 'anglify-autocomplete',
  standalone: true,
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  animations: [rotate()],
  providers: [
    createSettingsProvider<EntireAutocompleteSettings>('anglifyAutocompleteSettings', DEFAULT_AUTOCOMPLETE_SETTINGS, AUTOCOMPLETE_SETTINGS),
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AutocompleteComponent), multi: true },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FindSlotPipe,
    InputComponent,
    IconComponent,
    ListItemComponent,
    ListItemTitleComponent,
    SlotOutletDirective,
    SlotDirective,
    InputDirective,
    MenuComponent,
    ButtonComponent,
    SelectItemViewerPipe,
  ],
})
export class AutocompleteComponent implements AfterViewInit, OnChanges, EntireAutocompleteSettings, ControlValueAccessor {
  @ContentChildren(SlotDirective) protected readonly slots?: QueryList<SlotDirective>;

  @ViewChild(InputDirective) protected readonly input?: InputDirective;

  @ViewChild('anglifyInput', { read: InputComponent }) private readonly anglifyInput?: InputComponent;

  @ViewChild('menu') private readonly menu?: MenuComponent;

  @Input() public label = this.settings.label;

  @Input() public dense = this.settings.dense;

  @Input() public placeholder = this.settings.placeholder;

  @Input() public hint = this.settings.hint;

  @Input() public alwaysFloatingLabel = this.settings.alwaysFloatingLabel;

  @Input() public persistentHint = this.settings.persistentHint;

  @Input() public appearance = this.settings.appearance;

  @Input() public dropdownPosition = this.settings.dropdownPosition;

  @Input() public hideDetails = this.settings.hideDetails;

  @Input() public multiple = this.settings.multiple;

  @Input() public noDataText = this.settings.noDataText;

  @Input() public error = this.settings.error;

  @Input() public disabled = this.settings.disabled;

  @Input() public items = this.settings.items;

  @Input() public itemTextKey = this.settings.itemTextKey;

  @Input() public itemValueKey = this.settings.itemValueKey;

  @Input() public clearable = this.settings.clearable;

  @Input() public value: any[] = [];

  @Input() public flip = this.settings.flip;

  @Output() public readonly valueChange = new EventEmitter<any[]>();

  protected machine = new Machine(createAutocompleteMachineConfig(this));

  public constructor(
    @Self() @Inject('anglifyAutocompleteSettings') private readonly settings: EntireAutocompleteSettings,
    @Inject(INTERNAL_ICONS) protected readonly internalIcons: InternalIconSetDefinition
  ) {}

  private onChange: (...args: any[]) => void = () => {};

  public writeValue(value: any) {
    this.machine.context$.next({ ...this.machine.context$.value, selectedItems: this.transformValuesToItems(value) });
  }

  public registerOnChange = (fn: any) => (this.onChange = fn);

  public registerOnTouched(_: any) {}

  public ngOnChanges(changes: SimpleChanges) {
    const context = this.machine.context$.value as any;
    for (const key of Object.keys(changes)) {
      if (context[key] !== changes[key].currentValue) {
        if (key === 'value' && context[key] !== changes[key].currentValue) {
          context.selectedItems = this.transformValuesToItems(changes[key].currentValue);
        } else context[key] = changes[key].currentValue;
      }
    }

    this.machine.context$.next(context);
  }

  public ngAfterViewInit() {
    this.bindMachineEvents();
    this.setInputValue();
    this.handleMenuScroll();
    this.notifyValueChange();
  }

  protected onItemClick = (item: any) => this.machine.next(AutocompleteAction.ITEM_CLICK, item);

  protected clear = () => this.machine.next(AutocompleteAction.CLEAR);

  protected offset = ({ placement }: MiddlewareArguments) => {
    if ((placement === 'bottom' || placement === 'bottom-start' || placement === 'bottom-end') && !this.hideDetails) return -24;
    return 0;
  };

  private handleMenuScroll() {
    merge(
      this.machine.context$.pipe(
        map(context => context.highlightedIndex),
        distinctUntilChanged()
      ),
      this.machine.context$.pipe(map(context => context.menuOpened))
    )
      .pipe(untilDestroyed(this))
      .subscribe(() => setTimeout(() => this.menu!.scrollToHighlightedItem(), 0));
  }

  private notifyValueChange() {
    this.machine.context$
      .pipe(
        untilDestroyed(this),
        map(context => context.selectedItems),
        distinctUntilChanged(),
        tap(selectedItems => {
          this.valueChange.emit(this.transformSelectedItemsToValues(selectedItems));
          this.onChange(this.transformSelectedItemsToValues(selectedItems));
        })
      )
      .subscribe();
  }

  private setInputValue() {
    const input = this.input!.elementRef.nativeElement;
    merge(
      fromEvent(input, 'blur'),
      this.machine.context$.pipe(
        map(context => context.selectedItems),
        distinctUntilChanged()
      )
    )
      .pipe(
        untilDestroyed(this),
        tap(() => {
          const context = this.machine.context$.value;
          if (context.multiple) input.value = '';
          else if (context.selectedItems.length > 0)
            input.value = context.selectedItems.map(item => SelectItemViewerPipe.transform(item, context.itemTextKey)).join(', ');
          else input.value = '';
        })
      )
      .subscribe();
  }

  private bindMachineEvents() {
    const input = this.input!.elementRef.nativeElement;
    merge(
      this.anglifyInput!.onInputClick.pipe(
        map(() => ({ action: AutocompleteAction.CLICK })),
        tap(() => input.focus())
      ),
      fromEvent(this.menu!.menuContent.location.nativeElement as HTMLElement, 'mousedown').pipe(tap(event => event.preventDefault())),
      fromEvent(input, 'focusin').pipe(map(() => ({ action: AutocompleteAction.FOCUS }))),
      fromEvent(input, 'focusout').pipe(map(() => ({ action: AutocompleteAction.BLUR }))),
      fromEvent(input, 'keydown').pipe(
        map(event => event as KeyboardEvent),
        switchMap(event => {
          if (event.key === 'Enter') return of({ action: AutocompleteAction.ENTER });
          if (event.key === 'ArrowDown') return of({ action: AutocompleteAction.ARROW_DOWN });
          if (event.key === 'ArrowUp') return of({ action: AutocompleteAction.ARROW_UP });
          if (event.key === 'Escape') return of({ action: AutocompleteAction.ESCAPE });
          return NEVER;
        })
      ),
      fromEvent(input, 'input').pipe(
        map(event => ({ action: AutocompleteAction.INPUT, payload: (event.target as HTMLInputElement).value }))
      )
    )
      .pipe(
        untilDestroyed(this),
        map(data => data as { action: AutocompleteAction; payload?: any }),
        tap(({ action, payload }) => this.machine.next(action, payload))
      )
      .subscribe();
  }

  private transformSelectedItemsToValues(selectedItems: any[]) {
    const itemValueKey = this.itemValueKey;
    if (itemValueKey) return selectedItems.map(item => item[itemValueKey]);
    else return selectedItems;
  }

  private transformValuesToItems(values: any[]) {
    const itemValueKey = this.itemValueKey;
    if (itemValueKey) return this.items.filter(item => values.includes(item[itemValueKey]));
    else return values;
  }
}
