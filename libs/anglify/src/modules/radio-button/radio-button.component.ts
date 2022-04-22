import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonSettings, RadioLabelPosition } from './radio-button.interface';
import { DEFAULT_RADIO_BUTTON_SETTINGS, RADIO_BUTTON_SETTINGS } from './radio-button.token';
import { createSettingsProvider, SETTINGS } from '../../factories/settings.factory';
import { toBoolean } from '../../utils/functions';
import { BooleanLike } from '../../utils/interfaces';
import { OverlayRippleOrigin } from '../overlay/overlay.interface';

@Component({
  selector: 'anglify-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true,
    },
    createSettingsProvider<RadioButtonSettings>(DEFAULT_RADIO_BUTTON_SETTINGS, RADIO_BUTTON_SETTINGS),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonComponent implements ControlValueAccessor, OnInit {
  @Input() public value: any;
  @Input() public name = '';
  @Input() public disabled: BooleanLike = toBoolean(this.settings.disabled);
  @Input() public checked: BooleanLike = toBoolean(this.settings.checked);
  @Input() public ripple: BooleanLike = toBoolean(this.settings.ripple);
  @Input() public labelPosition: RadioLabelPosition = this.settings.labelPosition;
  @Input() public rippleOrigin: OverlayRippleOrigin = this.settings.rippleOrigin;

  public onChange: (...args: any[]) => void = () => {};
  public onTouch: (...args: any[]) => void = () => {};

  public constructor(@Self() @Inject(SETTINGS) private readonly settings: Required<RadioButtonSettings>) {}

  public ngOnInit(): void {
    if (this.disabled) {
      this.ripple = false;
    }
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
    this.onChange(e);
  }
}
