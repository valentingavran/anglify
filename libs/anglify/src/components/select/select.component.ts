import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  Inject,
  Self,
  ContentChildren,
  QueryList,
  HostBinding,
  HostListener,
  Optional,
  type AfterViewInit,
  type OnInit,
} from '@angular/core';
import { NgControl, type ControlValueAccessor } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, firstValueFrom, map, ReplaySubject, share } from 'rxjs';
import { SlotDirective } from '../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { FindSlotPipe } from '../../pipes/find-slot/find-slot.pipe';
import { INTERNAL_ICONS } from '../../tokens/internal-icons.token';
import { rotate } from '../../utils/animations';
import { IconComponent } from '../icon/icon.component';
import { InternalIconSetDefinition } from '../icon/icon.interface';
import { InputDirective } from '../input/input.directive';
import { InputAppearance } from '../input/input.interface';
import { ListComponent } from '../list/components/list/list.component';
import { ListItemComponent } from '../list/components/list-item/list-item.component';
import { ListItemGroupComponent } from '../list/components/list-item-group/list-item-group.component';
import { ListItemTitleComponent } from '../list/components/list-item-title/list-item-title.component';
import { MenuDirective } from '../menu/menu.directive';
import { TextFieldComponent } from '../text-field/text-field.component';
import { DEFAULT_SELECT_SETTINGS, SELECT_SETTINGS } from './select-settings.token';
import { EntireSelectSettings, type SelectItem } from './select.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-select',
  standalone: true,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [createSettingsProvider<EntireSelectSettings>('anglifySelectSettings', DEFAULT_SELECT_SETTINGS, SELECT_SETTINGS)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [rotate()],
  imports: [
    TextFieldComponent,
    MenuDirective,
    AsyncPipe,
    IconComponent,
    NgIf,
    ListComponent,
    ListItemComponent,
    ListItemTitleComponent,
    ListItemGroupComponent,
    FindSlotPipe,
    SlotOutletDirective,
    InputDirective,
    MenuDirective,
    SlotDirective,
    NgForOf,
  ],
})
export class SelectComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  @ViewChild(InputDirective, { static: true }) public readonly input!: InputDirective;

  @ViewChild(MenuDirective, { static: true }) public readonly menu!: MenuDirective;

  /**
   * Sets the input label.
   */
  @Input() public label?: string;

  /**
   * Reduces the input height.
   */
  @Input() public dense = false;

  /**
   * Sets the input’s placeholder text
   */
  @Input() public placeholder?: string;

  /**
   * Hint text.
   */
  @Input() public hint?: string;

  /**
   * Forces label to always be in floating mode.
   */
  @Input() public alwaysFloatingLabel: boolean = this.settings.alwaysFloatingLabel;

  /**
   * Forces hint to always be visible.
   */
  @Input() public persistentHint: boolean = this.settings.persistentHint;

  /**
   * Sets one of the two predefined input styles (`filled` or `outlined`).
   */
  @Input() public appearance: InputAppearance = this.settings.appearance;

  /**
   * Add input clear functionality (appends an clear icon).
   */
  @Input() public clearable: boolean = this.settings.clearable;

  /**
   * Sets the position of the menu.
   */
  @Input() public dropdownPosition = this.settings.dropdownPosition;

  /**
   * Automatically determines the best position for the menu. If possible the preset position is used.
   */
  @Input() public dropdownAutoPosition = this.settings.dropdownAutoPosition;

  /**
   *  Displaces the menu from the input element along the relevant axes.
   */
  @Input() public dropdownOffset = this.settings.dropdownOffset;

  /**
   * Hides hint and validation errors.
   */
  @Input() public hideDetails = false;

  /**
   * Puts input in readonly state.
   */
  @Input() public readonly = false;

  /**
   * Changes select to multiple. Accepts array for value.
   */
  @Input() public multiple = false;

  /**
   * Designates if menu should close when its content is clicked.
   */
  @Input() public closeOnSelect: boolean = this.settings.closeOnSelect;

  /**
   * Display text when there is no data.
   */
  @Input() public noDataText: string = this.settings.noDataText;

  public get error() {
    return this._error$.value;
  }

  /**
   * Puts the input in a manual error state.
   */
  @Input() public set error(error: string | undefined) {
    this._error$.next(error);
  }

  public get disabled() {
    return this._disabled$.value;
  }

  /**
   * Disables the input.
   */
  @Input() public set disabled(isDisabled: boolean) {
    this._disabled$.next(isDisabled);
  }

  /**
   * Can be an array of objects or array of strings/numbers.
   */
  @Input() public set items(items: number[] | SelectItem[] | string[]) {
    if (this.assumePrimitive(items)) {
      const primitiveItems = items as boolean[] | number[] | string[];
      this._items$.next(this.mapPrimitiveToSelectItem(primitiveItems));
    } else {
      this._items$.next(items as SelectItem[]);
    }
  }

  protected readonly _error$ = new BehaviorSubject<string | undefined>(undefined);

  public readonly error$ = this._error$.asObservable().pipe(share({ connector: () => new ReplaySubject(1) }));

  protected readonly _disabled$ = new BehaviorSubject(false);

  public readonly disabled$ = this._disabled$.asObservable().pipe(share({ connector: () => new ReplaySubject(1) }));

  protected readonly _isOpen$ = new BehaviorSubject(false);

  public readonly isOpen$ = this._isOpen$.asObservable().pipe(share({ connector: () => new ReplaySubject(1) }));

  protected readonly _items$ = new BehaviorSubject<SelectItem[]>([]);

  public readonly items$ = this._items$.asObservable();

  protected readonly _selectedItems$ = new BehaviorSubject<SelectItem[]>([]);

  public readonly selectedItems$ = this._selectedItems$.asObservable().pipe(share({ connector: () => new ReplaySubject(1) }));

  public readonly selectedItemsText$ = this.selectedItems$.pipe(
    map(items => items.map(item => item.text)),
    map(texts => texts.join(', ')),
    share({ connector: () => new ReplaySubject(1) })
  );

  public readonly isItemSelected$ = (item: SelectItem) =>
    this.selectedItems$.pipe(map(selectedItems => selectedItems.some(selected => selected.value === item.value)));

  public onChange: (...args: any[]) => void = () => {};

  public onTouch: (...args: any[]) => void = () => {};

  public constructor(
    @Self() @Inject('anglifySelectSettings') public settings: EntireSelectSettings,
    @Inject(INTERNAL_ICONS) public readonly internalIcons: InternalIconSetDefinition,
    @Optional() @Self() public readonly ngControl?: NgControl
  ) {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  public ngOnInit() {
    this.input.ngControl = this.ngControl;
  }

  public ngAfterViewInit() {
    this.menu.isOpen$.pipe(untilDestroyed(this)).subscribe(isOpen => {
      this._isOpen$.next(isOpen);
    });
  }

  public registerOnChange(fn: (...args: any[]) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (...args: any[]) => void) {
    this.onTouch = fn;
  }

  public writeValue(item: any) {
    if (item !== undefined && item !== null) {
      if (!this._selectedItems$.value.length) {
        if (Array.isArray(item)) {
          this._selectedItems$.next(item as SelectItem[]);
        } else {
          this._selectedItems$.next([item as SelectItem]);
        }
      }

      if (!Array.isArray(item) && !this.multiple) {
        this.input.elementRef.nativeElement.value = (item as SelectItem).text;
      } else {
        this.input.elementRef.nativeElement.value = '';
      }
    } else {
      this.input.elementRef.nativeElement.value = '';
    }

    this.onChange(item);
  }

  public setDisabledState(isDisabled: boolean) {
    this._disabled$.next(isDisabled);
  }

  @HostBinding('class.outlined')
  public get hasOutlinedAppearance() {
    return this.appearance === 'outlined';
  }

  @HostListener('document:keydown', ['$event', '$event.key'])
  public onEscapeDown(_: MouseEvent, key: string) {
    if (key === 'Escape' && this._isOpen$.value) {
      this.input.elementRef.nativeElement.blur();
      this.menu.close();
    }
  }

  public trackItem(_index: number, item: SelectItem) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return item.value;
  }

  public select = async (item: SelectItem) => {
    if (this.disabled || this.readonly || item.disabled) return;

    if (this.multiple) {
      try {
        if (await firstValueFrom(this.isItemSelected$(item), { defaultValue: false })) {
          this._selectedItems$.next(this._selectedItems$.value.filter(selected => selected.value !== item.value));
        } else {
          this._selectedItems$.next([...this._selectedItems$.value, item]);
        }

        if (this._selectedItems$.value.length) {
          this.writeValue(this._selectedItems$.value);
        } else {
          this.writeValue(null);
        }
      } catch {}
    } else {
      this._selectedItems$.next([item]);
      this.writeValue(item);
    }

    if (this.closeOnSelect) {
      this.menu.close();
    }
  };

  public clearSelection = () => {
    if (this.disabled || this.readonly) return;

    this._selectedItems$.next([]);
    if (this.multiple) {
      if (this._selectedItems$.value.length) {
        this.writeValue(this._selectedItems$.value);
      } else {
        this.writeValue(null);
      }
    } else {
      this.writeValue(null);
    }
  };

  public toggleMenu = () => {
    if (this.disabled || this.readonly) return;

    this.menu.toggle();
  };

  protected assumePrimitive(items: number[] | SelectItem[] | string[]) {
    return typeof items[0] === 'string' || typeof items[0] === 'number' || typeof items[0] === 'boolean';
  }

  protected mapPrimitiveToSelectItem(items: boolean[] | number[] | string[]): SelectItem[] {
    return items.map(item => ({ text: item.toLocaleString(), value: item }));
  }
}
