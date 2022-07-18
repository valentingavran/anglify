import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  AfterViewInit,
  Inject,
  Self,
  ContentChildren,
  QueryList,
  HostBinding,
  HostListener,
  Optional,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, firstValueFrom, map, ReplaySubject, share } from 'rxjs';
import { DEFAULT_SELECT_SETTINGS, SELECT_SETTINGS } from './select-settings.token';
import { EntireSelectSettings, SelectOption } from './select.interface';
import { createSettingsProvider } from '../../factories/settings.factory';
import { INTERNAL_ICONS } from '../../tokens/internal-icons.token';
import { rotate } from '../../utils/animations';
import { SlotDirective } from '../common/directives/slot/slot.directive';
import { InternalIconSetDefinition } from '../icon/icon.interface';
import { InputDirective } from '../input/input.directive';
import { InputAppearance } from '../input/input.interface';
import { MenuDirective } from '../menu/menu.directive';

@UntilDestroy()
@Component({
  selector: 'anglify-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [createSettingsProvider<EntireSelectSettings>('anglifySelectSettings', DEFAULT_SELECT_SETTINGS, SELECT_SETTINGS)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [rotate()],
})
export class SelectComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;
  @ViewChild(InputDirective, { static: true }) public readonly input!: InputDirective;
  @ViewChild(MenuDirective, { static: true }) public readonly menu!: MenuDirective;

  @Input() public label?: string;
  @Input() public placeholder?: string;
  @Input() public hint?: string;
  @Input() public alwaysFloatingLabel: boolean = this.settings.alwaysFloatingLabel;
  @Input() public persistentHint: boolean = this.settings.persistentHint;
  @Input() public appearance: InputAppearance = this.settings.appearance;
  @Input() public clearable = this.settings.clearable;
  @Input() public dropdownPosition = this.settings.dropdownPosition;
  @Input() public dropdownAutoPosition = this.settings.dropdownAutoPosition;
  @Input() public dropdownOffset = this.settings.dropdownOffset;
  @Input() public hideDetails = false;
  @Input() public readonly = false;
  @Input() public required = false;
  @Input() public multiple = false;
  @Input() public closeOnSelect = this.settings.closeOnSelect;
  @Input() public noOptions = this.settings.noOptions;

  @Input() public set error(error: string | undefined) {
    this._error$.next(error);
  }

  public get error() {
    return this._error$.value;
  }

  @Input() public set disabled(isDisabled: boolean) {
    this._disabled$.next(isDisabled);
  }

  public get disabled() {
    return this._disabled$.value;
  }

  @Input() public set options(options: SelectOption[] | string[] | number[]) {
    if (this.assumePrimitive(options)) {
      const primitiveOptions = options as string[] | number[] | boolean[];
      this._options$.next(this.mapPrimitiveToSelectOption(primitiveOptions));
    } else {
      this._options$.next(options as SelectOption[]);
    }
  }

  protected readonly _error$ = new BehaviorSubject<string | undefined>(undefined);
  public readonly error$ = this._error$.asObservable().pipe(share({ connector: () => new ReplaySubject(1) }));

  protected readonly _disabled$ = new BehaviorSubject(false);
  public readonly disabled$ = this._disabled$.asObservable().pipe(share({ connector: () => new ReplaySubject(1) }));

  protected readonly _isOpen$ = new BehaviorSubject(false);
  public readonly isOpen$ = this._isOpen$.asObservable().pipe(share({ connector: () => new ReplaySubject(1) }));

  protected readonly _options$ = new BehaviorSubject<SelectOption[]>([]);
  public readonly options$ = this._options$.asObservable();

  protected readonly _selectedOptions$ = new BehaviorSubject<SelectOption[]>([]);
  public readonly selectedOptions$ = this._selectedOptions$.asObservable().pipe(share({ connector: () => new ReplaySubject(1) }));

  public readonly selectedOptionsText$ = this.selectedOptions$.pipe(
    map(options => options.map(option => option.text)),
    share({ connector: () => new ReplaySubject(1) })
  );

  public readonly isOptionSelected$ = (option: SelectOption) =>
    this.selectedOptions$.pipe(map(selectedItems => selectedItems.some(selected => selected.value === option.value)));

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

  public writeValue(option: any) {
    if (option !== undefined && option !== null) {
      if (!this._selectedOptions$.value.length) {
        if (Array.isArray(option)) {
          this._selectedOptions$.next(option as SelectOption[]);
        } else {
          this._selectedOptions$.next([option as SelectOption]);
        }
      }

      if (!Array.isArray(option) && !this.multiple) {
        this.input.elementRef.nativeElement.value = (option as SelectOption).text;
      } else {
        this.input.elementRef.nativeElement.value = '';
      }
    } else {
      this.input.elementRef.nativeElement.value = '';
    }
    this.onChange(option);
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

  public trackOption(_index: number, option: SelectOption) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return option.value;
  }

  public async select(option: SelectOption) {
    if (this.disabled || this.readonly || option.disabled) return;

    if (this.multiple) {
      try {
        if (await firstValueFrom(this.isOptionSelected$(option), { defaultValue: false })) {
          this._selectedOptions$.next(this._selectedOptions$.value.filter(selected => selected.value !== option.value));
        } else {
          this._selectedOptions$.next([...this._selectedOptions$.value, option]);
        }

        if (this._selectedOptions$.value.length) {
          this.writeValue(this._selectedOptions$.value);
        } else {
          this.writeValue(null);
        }
      } catch {}
    } else {
      this._selectedOptions$.next([option]);
      this.writeValue(option);
    }

    if (this.closeOnSelect) {
      this.menu.close();
    }
  }

  public clearSelection() {
    if (this.disabled || this.readonly) return;

    this._selectedOptions$.next([]);
    if (this.multiple) {
      if (this._selectedOptions$.value.length) {
        this.writeValue(this._selectedOptions$.value);
      } else {
        this.writeValue(null);
      }
    } else {
      this.writeValue(null);
    }
  }

  public toggleMenu() {
    if (this.disabled || this.readonly) return;

    this.menu.toggle();
  }

  protected assumePrimitive(items: SelectOption[] | string[] | number[]) {
    return typeof items[0] === 'string' || typeof items[0] === 'number' || typeof items[0] === 'boolean';
  }

  protected mapPrimitiveToSelectOption(options: string[] | number[] | boolean[]): SelectOption[] {
    return options.map(option => ({ text: option.toLocaleString(), value: option }));
  }
}
