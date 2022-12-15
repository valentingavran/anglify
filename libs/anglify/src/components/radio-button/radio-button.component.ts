import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Inject, Input, Output, Self } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms';
import { InteractionStateDirective } from '../../directives/interaction-state/interaction-state.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { DEFAULT_RADIO_BUTTON_SETTINGS, RADIO_BUTTON_SETTINGS } from './radio-button-settings.token';
import { EntireRadioButtonSettings } from './radio-button.interface';

@Component({
  selector: 'anglify-radio-button',
  standalone: true,
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioButtonComponent), multi: true },
    createSettingsProvider<EntireRadioButtonSettings>('anglifyRadioButtonSettings', DEFAULT_RADIO_BUTTON_SETTINGS, RADIO_BUTTON_SETTINGS),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InteractionStateDirective, FormsModule],
})
export class RadioButtonComponent implements EntireRadioButtonSettings, ControlValueAccessor {
  @Input() public value = this.settings.value;

  @Input() public name = this.settings.name;

  @Input() public disabled = this.settings.disabled;

  @Input() public ripple = this.settings.ripple;

  @Input() public labelPosition = this.settings.labelPosition;

  @Input() public rippleOrigin = this.settings.rippleOrigin;

  @Input() public state = this.settings.state;

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public readonly onCheckedChange = new EventEmitter<boolean>();

  protected checked: any;

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

  protected onModelChange(checked: boolean) {
    this.checked = checked;
    this.onCheckedChange.next(checked);
    this.onChange(checked);
  }
}
