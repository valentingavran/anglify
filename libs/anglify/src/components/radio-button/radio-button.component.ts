import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Inject, Input, Output, Self } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms';
import { RippleOrigin } from '../../composables/ripple/ripple.interface';
import { InteractionStateDirective } from '../../directives/interaction-state/interaction-state.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { DEFAULT_RADIO_BUTTON_SETTINGS, RADIO_BUTTON_SETTINGS } from './radio-button-settings.token';
import { EntireRadioButtonSettings, RadioLabelPosition } from './radio-button.interface';

@Component({
  selector: 'anglify-radio-button',
  standalone: true,
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
  imports: [InteractionStateDirective, FormsModule],
})
export class RadioButtonComponent implements ControlValueAccessor {
  /**
   * The input’s value.
   */
  @Input() public value: any;

  /**
   * Sets the component’s name attribute.
   */
  @Input() public name = '';

  /**
   * Removes the ability to click or target the component.
   */
  @Input() public disabled = this.settings.disabled;

  /**
   * Turns the ripple effect on or off.
   */
  @Input() public ripple = this.settings.ripple;

  /**
   * Changes the position of the label.
   */
  @Input() public labelPosition: RadioLabelPosition = this.settings.labelPosition;

  /**
   * Defines whether the ripple starts in the middle of the component or where the mouse click occurs.
   */
  @Input() public rippleOrigin: RippleOrigin = this.settings.rippleOrigin;

  /**
   * Controls whether to display the focus and hover styles for this component.
   */
  @Input() public state = this.settings.state;

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public readonly onCheckedChange = new EventEmitter<boolean>();

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

  public onModelChange(checked: boolean) {
    this.checked = checked;
    this.onCheckedChange.next(checked);
    this.onChange(checked);
  }
}
