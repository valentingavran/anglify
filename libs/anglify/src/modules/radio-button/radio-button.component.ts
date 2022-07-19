import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Inject, Input, Output, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DEFAULT_RADIO_BUTTON_SETTINGS, RADIO_BUTTON_SETTINGS } from './radio-button-settings.token';
import { EntireRadioButtonSettings, RadioLabelPosition } from './radio-button.interface';
import { RippleOrigin } from '../../composables/ripple/ripple.interface';
import { createSettingsProvider } from '../../factories/settings.factory';

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
    createSettingsProvider<EntireRadioButtonSettings>('anglifyRadioButtonSettings', DEFAULT_RADIO_BUTTON_SETTINGS, RADIO_BUTTON_SETTINGS),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonComponent implements ControlValueAccessor {
  @Input() public value: any;
  @Input() public name = '';
  @Input() public disabled = this.settings.disabled;
  @Input() public ripple = this.settings.ripple;
  @Input() public labelPosition: RadioLabelPosition = this.settings.labelPosition;
  @Input() public rippleOrigin: RippleOrigin = this.settings.rippleOrigin;
  @Input() public state = this.settings.state;

  @Output() public checkedChange = new EventEmitter<boolean>();
  public checked: any;

  public onChange: (...args: any[]) => void = () => {};
  public onTouch: (...args: any[]) => void = () => {};

  public constructor(@Self() @Inject('anglifyRadioButtonSettings') private readonly settings: EntireRadioButtonSettings) {}

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
