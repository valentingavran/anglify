import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
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
import { CheckboxIconRef } from './functions/register-icons.function';
import { EntireCheckboxSettings, LabelPosition } from './interfaces/checkbox.interface';
import { CHECKBOX_ICONS_FACTORY } from './tokens/checkbox-icons.token';
import { CHECKBOX_SETTINGS, DEFAULT_CHECKBOX_SETTINGS } from './tokens/checkbox.token';
import { RippleOrigin } from '../../composables/ripple/ripple.interface';
import { createSettingsProvider } from '../../factories/settings.factory';
import { toBoolean } from '../../utils/functions';
import type { BooleanLike } from '../../utils/interfaces';
import { SlotDirective } from '../common/directives/slot/slot.directive';

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

  @Input() public labelPosition: LabelPosition = this.settings.labelPosition;
  @Input() public rippleOrigin: RippleOrigin = this.settings.rippleOrigin;
  @Input() public checked: BooleanLike = this.settings.checked;
  @Input() public disabled: BooleanLike = this.settings.disabled;
  @Input() public ripple: BooleanLike = this.settings.ripple;
  @Input() public state: BooleanLike = this.settings.state;

  @Input('readonly')
  public set isReadonly(value: BooleanLike) {
    if (toBoolean(value)) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'pointer-events', 'none');
    } else {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'pointer-events');
    }
  }

  @Output() public checkedChange = new EventEmitter<boolean>();

  public iconProvider!: null | CheckboxIconRef;

  public constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    @Self() @Inject('anglifyCheckboxSettings') private readonly settings: EntireCheckboxSettings,
    @Optional() @Inject(CHECKBOX_ICONS_FACTORY) public readonly iconProviderFactory: null | (() => CheckboxIconRef)
  ) {
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
    this.checked = checked;
  }

  public onModelChange(e: boolean) {
    this.checked = e;
    this.checkedChange.next(e);
    this.onChange(e);
  }
}
