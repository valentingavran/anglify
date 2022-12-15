import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Inject, Input, QueryList, Self } from '@angular/core';
import { SlotDirective } from '../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { FindSlotPipe } from '../../pipes/find-slot/find-slot.pipe';
import { InputComponent } from '../input/input.component';
import { InputDirective } from '../input/input.directive';
import { InputAppearance } from '../input/input.interface';
import { DEFAULT_TEXT_FIELD_SETTINGS, TEXT_FIELD_SETTINGS } from './text-field-settings.token';
import { EntireTextFieldSettings } from './text-field.interface';

@Component({
  selector: 'anglify-text-field',
  standalone: true,
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    createSettingsProvider<EntireTextFieldSettings>('anglifyTextFieldSettings', DEFAULT_TEXT_FIELD_SETTINGS, TEXT_FIELD_SETTINGS),
  ],
  imports: [InputComponent, AsyncPipe, SlotOutletDirective, FindSlotPipe, SlotDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldComponent {
  @ContentChildren(SlotDirective) protected readonly slots?: QueryList<SlotDirective>;

  @ContentChild(InputDirective) protected readonly input?: InputDirective;

  /**
   * Sets the input label.
   */
  @Input() public label?: string;

  /**
   * Sets one of the two predefined input styles (`filled` or `outlined`).
   */
  @Input() public appearance: InputAppearance = this.settings.appearance;

  /**
   * Hint text.
   */
  @Input() public hint?: string;

  /**
   * Forces hint to always be visible.
   */
  @Input() public persistentHint = this.settings.persistentHint;

  /**
   * Forces label to always be in floating mode.
   */
  @Input() public alwaysFloatingLabel = this.settings.alwaysFloatingLabel;

  /**
   * Hides hint and validation errors.
   */
  @Input() public hideDetails = this.settings.hideDetails;

  /**
   * Creates counter for input length. The maximum length can be set using the `maxlength` property on the `anglfyInput` directive.
   */
  @Input() public counter = this.settings.counter;

  /**
   * Puts the input in a manual error state.
   */
  @Input() public error?: string;

  /**
   * Reduces the input height.
   */
  @Input() public dense = this.settings.dense;

  public constructor(@Self() @Inject('anglifyTextFieldSettings') private readonly settings: EntireTextFieldSettings) {}
}
