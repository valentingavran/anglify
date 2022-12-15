import { AsyncPipe } from '@angular/common';
import {
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
  type AfterViewInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { RippleOrigin } from '../../composables/ripple/ripple.interface';
import { InteractionStateDirective } from '../../directives/interaction-state/interaction-state.directive';
import { SlotDirective } from '../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { FindSlotPipe } from '../../pipes/find-slot/find-slot.pipe';
import { bindClassToNativeElement } from '../../utils/functions';
import { CHECKBOX_SETTINGS, DEFAULT_CHECKBOX_SETTINGS } from './checkbox-settings.token';
import { EntireCheckboxSettings, LabelPosition } from './checkbox.interface';
import type { CheckboxIconRef } from './functions/register-icons.function';
import { CHECKBOX_ICONS_FACTORY } from './tokens/checkbox-icons.token';

@UntilDestroy()
@Component({
  selector: 'anglify-checkbox',
  standalone: true,
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
  imports: [InteractionStateDirective, AsyncPipe, FindSlotPipe, SlotOutletDirective],
})
export class CheckboxComponent implements ControlValueAccessor, AfterViewInit {
  @ContentChildren(SlotDirective) protected readonly slots?: QueryList<SlotDirective>;

  @ViewChild('offIcon', { read: ElementRef }) private readonly offIcon!: ElementRef<HTMLElement>;

  @ViewChild('onIcon', { read: ElementRef }) private readonly onIcon!: ElementRef<HTMLElement>;

  @ViewChild('defaultIcon') private readonly defaultIcon!: ElementRef<HTMLElement>;

  @ViewChild('overlayContainer') private readonly overlayContainer!: ElementRef<HTMLElement>;

  @ViewChild('reflectOffIcon') private readonly reflectOffIcon!: ElementRef<HTMLElement>;

  @ViewChild('reflectOnIcon') private readonly reflectOnIcon!: ElementRef<HTMLElement>;

  /**
   * Turns the ripple effect on or off.
   */
  @Input() public ripple = this.settings.ripple;

  /**
   * Controls whether to display the focus and hover styles for this component.
   */
  @Input() public state = this.settings.state;

  /**
   * Changes the position of the label.
   */
  @Input() public labelPosition: LabelPosition = this.settings.labelPosition;

  /**
   * Defines whether the ripple starts in the middle of the component or where the mouse click occurs.
   */
  @Input() public rippleOrigin: RippleOrigin = this.settings.rippleOrigin;

  public get checked(): boolean | undefined {
    return this.checked$.value;
  }

  /**
   * The input’s value.
   */
  @HostBinding('attr.aria-checked')
  @Input()
  public set checked(value: boolean | undefined) {
    this.checked$.next(value);
  }

  public get disabled() {
    return this.disabled$.value;
  }

  /**
   * Disable the input.
   */
  @HostBinding('attr.aria-disabled')
  @Input()
  public set disabled(value: boolean) {
    this.disabled$.next(value);
  }

  public get isReadonly() {
    return this.readonly$.value;
  }

  /**
   * Puts input in readonly state.
   */
  @HostBinding('attr.aria-readonly')
  @Input('readonly')
  public set isReadonly(value: boolean) {
    this.readonly$.next(value);
  }

  @Input() public set focusable(value: boolean) {
    this.focusable$.next(value);
  }

  @Output() public readonly checkedChange = new EventEmitter<boolean | undefined>();

  private readonly iconProvider!: CheckboxIconRef | null;

  protected checked$ = new BehaviorSubject(this.settings.checked);

  protected disabled$ = new BehaviorSubject(this.settings.disabled);

  protected readonly$ = new BehaviorSubject(this.settings.readonly);

  protected focusable$ = new BehaviorSubject(this.settings.focusable);

  protected tabindex$ = combineLatest([this.disabled$, this.focusable$]).pipe(
    map(([disabled, focusable]) => (disabled ? -1 : focusable ? 0 : -1))
  );

  @HostBinding('attr.role') protected readonly role = 'checkbox';

  public constructor(
    @Self() @Inject('anglifyCheckboxSettings') private readonly settings: EntireCheckboxSettings,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    @Optional() @Inject(CHECKBOX_ICONS_FACTORY) public readonly iconProviderFactory: (() => CheckboxIconRef) | null
  ) {
    bindClassToNativeElement(
      this,
      this.checked$.pipe(map(val => val === undefined)),
      this.elementRef.nativeElement,
      'anglify-checkbox-indeterminate'
    );
    bindClassToNativeElement(this, this.checked$.pipe(map(Boolean)), this.elementRef.nativeElement, 'anglify-checkbox-checked');
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
  private prepareIconDOM() {
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

  private removeChildren(children: ElementRef[]) {
    for (const child of children) this.renderer.removeChild(this.overlayContainer.nativeElement, child.nativeElement);
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
  protected onCheckedChangeHandler(_event: Event) {
    if (this.disabled$.value || this.readonly$.value) return;
    this.checked$.next(!this.checked$.value);
    this.checkedChange.emit(this.checked$.value);
    this.onChange(this.checked$.value);
  }
}
