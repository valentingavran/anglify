import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  Renderer2,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxIconRef } from './functions/register-icons.function';
import type { CheckboxSettings, LabelPosition } from './interfaces/checkbox.interface';
import { CHECKBOX_ICONS_FACTORY } from './tokens/checkbox-icons.token';
import { CHECKBOX_SETTINGS, DEFAULT_CHECKBOX_SETTINGS } from './tokens/checkbox.token';
import { createSettingsProvider, SETTINGS } from '../../factories/settings.factory';
import { isBooleanLikeTrue } from '../../utils/functions';
import type { BooleanLike } from '../../utils/interfaces';
import { OverlayRippleOrigin } from '../overlay/overlay.interface';

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
    createSettingsProvider<CheckboxSettings>(DEFAULT_CHECKBOX_SETTINGS, CHECKBOX_SETTINGS),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  @ViewChild('offIcon', { read: ElementRef }) public offIcon!: ElementRef<HTMLElement>;
  @ViewChild('onIcon', { read: ElementRef }) public onIcon!: ElementRef<HTMLElement>;
  @ViewChild('defaultIcon') public defaultIcon!: ElementRef<HTMLElement>;
  @ViewChild('overlayContainer') public overlayContainer!: ElementRef<HTMLElement>;
  @ViewChild('reflectOffIcon') public reflectOffIcon!: ElementRef<HTMLElement>;
  @ViewChild('reflectOnIcon') public reflectOnIcon!: ElementRef<HTMLElement>;
  @Output() public checkedChange = new EventEmitter<boolean>();
  @Input() public labelPosition: LabelPosition = this.settings.labelPosition;
  @Input() public rippleOrigin: OverlayRippleOrigin = this.settings.rippleOrigin;

  @Input() public set disabled(value: BooleanLike) {
    this._disabled = isBooleanLikeTrue(value);
  }

  @Input() public set checked(value: BooleanLike) {
    this._checked = isBooleanLikeTrue(value);
  }

  @Input() public set ripple(value: BooleanLike) {
    this._ripple = isBooleanLikeTrue(value);
  }

  public iconProvider!: null | CheckboxIconRef;
  public _checked: boolean = isBooleanLikeTrue(this.settings.checked);
  public _disabled: boolean = isBooleanLikeTrue(this.settings.disabled);
  public _ripple: boolean = isBooleanLikeTrue(this.settings.ripple);

  public constructor(
    private readonly render: Renderer2,
    @Self() @Inject(SETTINGS) private readonly settings: Required<CheckboxSettings>,
    @Optional() @Inject(CHECKBOX_ICONS_FACTORY) public readonly iconProviderFactory: null | (() => CheckboxIconRef)
  ) {
    if (this.iconProviderFactory) {
      this.iconProvider = this.iconProviderFactory();
    }
  }

  public ngOnInit(): void {
    if (this.disabled) {
      this.ripple = false;
    }
  }

  public ngAfterViewInit(): void {
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
  public prepareIconDOM(): void {
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
        this.render.appendChild(this.onIcon.nativeElement, onIcon);
      } else {
        this.iconProvider.removeCompRef('ONICON');
        this.removeChildren([this.onIcon]);
      }

      if (reflectOffChildren === 0) {
        const offIcon = this.iconProvider.iconOffCompRef.location.nativeElement as HTMLElement;
        this.render.appendChild(this.offIcon.nativeElement, offIcon);
      } else {
        this.iconProvider.removeCompRef('OFFICON');
        this.removeChildren([this.offIcon]);
      }
    } else {
      this.removeChildren([this.onIcon, this.offIcon]);
    }
  }

  public removeChildren(children: ElementRef[]): void {
    children.forEach(child => this.render.removeChild(this.overlayContainer.nativeElement, child.nativeElement));
  }

  public registerOnChange(fn: (...args: any[]) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (...args: any[]) => void): void {
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
