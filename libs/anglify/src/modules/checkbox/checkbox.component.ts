import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  Optional,
  Output,
  QueryList,
  Renderer2,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { CheckboxIconRef } from './functions/register-icons.function';
import { EntireCheckboxSettings, LabelPosition } from './interfaces/checkbox.interface';
import { CHECKBOX_ICONS_FACTORY } from './tokens/checkbox-icons.token';
import { CHECKBOX_SETTINGS, DEFAULT_CHECKBOX_SETTINGS } from './tokens/checkbox-settings.token';
import { RippleOrigin } from '../../composables/ripple/ripple.interface';
import { createSettingsProvider } from '../../factories/settings.factory';
import { bindClassToNativeElement } from '../../utils/functions';
import { SlotDirective } from '../common/directives/slot/slot.directive';

@UntilDestroy()
@Component({
  selector: 'anglify-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
    createSettingsProvider<EntireCheckboxSettings>('anglifyCheckboxSettings', DEFAULT_CHECKBOX_SETTINGS, CHECKBOX_SETTINGS),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements ControlValueAccessor, AfterViewInit {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  @ViewChild('offIcon', { read: ElementRef }) public offIcon!: ElementRef<HTMLElement>;
  @ViewChild('onIcon', { read: ElementRef }) public onIcon!: ElementRef<HTMLElement>;
  @ViewChild('defaultIcon') public defaultIcon!: ElementRef<HTMLElement>;
  @ViewChild('overlayContainer') public overlayContainer!: ElementRef<HTMLElement>;
  @ViewChild('reflectOffIcon') public reflectOffIcon!: ElementRef<HTMLElement>;
  @ViewChild('reflectOnIcon') public reflectOnIcon!: ElementRef<HTMLElement>;

  /** Turns the ripple effect on or off. */
  @Input() public ripple = this.settings.ripple;

  /** Controls whether to display the focus and hover styles for this component. */
  @Input() public state = this.settings.state;

  /** Changes the position of the label. */
  @Input() public labelPosition: LabelPosition = this.settings.labelPosition;

  /** Defines whether the ripple starts in the middle of the component or where the mouse click occurs. */
  @Input() public rippleOrigin: RippleOrigin = this.settings.rippleOrigin;

  /** The input’s value. */
  @HostBinding('attr.aria-checked')
  @Input()
  public set checked(value: boolean) {
    this.checked$.next(value);
  }

  public get checked() {
    return this.checked$.value;
  }

  /** Disable the input. */
  @HostBinding('attr.aria-disabled')
  @Input()
  public set disabled(value: boolean) {
    this.disabled$.next(value);
  }

  public get disabled() {
    return this.disabled$.value;
  }

  /** Puts input in readonly state. */
  @HostBinding('attr.aria-readonly')
  @Input('readonly')
  public set isReadonly(value: boolean) {
    this.readonly$.next(value);
  }

  public get isReadonly() {
    return this.readonly$.value;
  }

  @Output() public checkedChange = new EventEmitter<boolean>();

  public iconProvider!: null | CheckboxIconRef;
  public checked$ = new BehaviorSubject(this.settings.checked);
  public disabled$ = new BehaviorSubject(this.settings.disabled);
  public readonly$ = new BehaviorSubject(this.settings.readonly);

  @HostBinding('attr.role') protected readonly role = 'checkbox';

  public constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    @Self() @Inject('anglifyCheckboxSettings') private readonly settings: EntireCheckboxSettings,
    @Optional() @Inject(CHECKBOX_ICONS_FACTORY) public readonly iconProviderFactory: null | (() => CheckboxIconRef)
  ) {
    bindClassToNativeElement(this, this.checked$, this.elementRef.nativeElement, 'anglify-checkbox-checked');
    bindClassToNativeElement(this, this.disabled$, this.elementRef.nativeElement, 'anglify-checkbox-disabled');
    bindClassToNativeElement(this, this.readonly$, this.elementRef.nativeElement, 'anglify-checkbox-readonly');
    if (this.iconProviderFactory) {
      this.iconProvider = this.iconProviderFactory();
    }
  }

  public ngAfterViewInit() {
    this.prepareIconDOM();
  }

  public onChange: (...args: any[]) => void = () => {};
  public onTouch: (...args: any[]) => void = () => {};

  /* This function is needed to keep ICON-DOM clean for many different cases
   * case 1: Icons are delivered per content reflection (can be only 1 icon as well)
   * case 2: Icons are delivered per global setting & provider
   * case 3: No Icons are delivered so default checkbox should be used
   * case 4: Combination of case 1 and case 2, in this case ViewContainerRef of iconProvider needs to remove overridden Icons from DOM
   */
  public prepareIconDOM() {
    const reflectOnChildren = this.reflectOnIcon.nativeElement.children.length;
    const reflectOffChildren = this.reflectOffIcon.nativeElement.children.length;

    if (reflectOnChildren === 0) {
      this.removeChildren([this.reflectOnIcon]);
    } else {
      this.removeChildren([this.defaultIcon]);
    }

    if (reflectOffChildren === 0) {
      this.removeChildren([this.reflectOffIcon]);
    } else {
      this.removeChildren([this.defaultIcon]);
    }

    if (this.iconProvider) {
      this.removeChildren([this.defaultIcon]);

      if (reflectOnChildren === 0) {
        const onIcon = this.iconProvider.iconOnCompRef.location.nativeElement as HTMLElement;
        this.renderer.appendChild(this.onIcon.nativeElement, onIcon);
      } else {
        this.iconProvider.removeCompRef('ONICON');
        this.removeChildren([this.onIcon]);
      }

      if (reflectOffChildren === 0) {
        const offIcon = this.iconProvider.iconOffCompRef.location.nativeElement as HTMLElement;
        this.renderer.appendChild(this.offIcon.nativeElement, offIcon);
      } else {
        this.iconProvider.removeCompRef('OFFICON');
        this.removeChildren([this.offIcon]);
      }
    } else {
      this.removeChildren([this.onIcon, this.offIcon]);
    }
  }

  public removeChildren(children: ElementRef[]) {
    children.forEach(child => this.renderer.removeChild(this.overlayContainer.nativeElement, child.nativeElement));
  }

  public registerOnChange(fn: (...args: any[]) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (...args: any[]) => void) {
    this.onTouch = fn;
  }

  public writeValue(checked: boolean) {
    this.checked$.next(checked);
  }

  @HostListener('click', ['$event'])
  public onCheckedChange(event: Event) {
    event.preventDefault();
    if (this.disabled$.value || this.readonly$.value) return;
    this.checked$.next(!this.checked$.value);
    this.checkedChange.emit(this.checked$.value);
    this.onChange(this.checked$.value);
  }
}
