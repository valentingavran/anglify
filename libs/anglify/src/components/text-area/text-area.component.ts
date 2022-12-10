import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Inject,
  Input,
  QueryList,
  Self,
  ViewChild,
} from '@angular/core';
import { SlotDirective } from '../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { FindSlotPipe } from '../../pipes/find-slot/find-slot.pipe';
import { InputComponent } from '../input/input.component';
import { InputDirective } from '../input/input.directive';
import { InputAppearance } from '../input/input.interface';
import { DEFAULT_TEXT_AREA_SETTINGS, TEXT_AREA_SETTINGS } from './text-area-settings.token';
import { EntireTextAreaSettings } from './text-area.interface';

@Component({
  selector: 'anglify-text-area',
  standalone: true,
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [createSettingsProvider<EntireTextAreaSettings>('anglifyTextAreaSettings', DEFAULT_TEXT_AREA_SETTINGS, TEXT_AREA_SETTINGS)],
  imports: [InputComponent, AsyncPipe, SlotDirective, SlotOutletDirective, FindSlotPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaComponent {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  @ContentChild(InputDirective) public readonly input?: InputDirective;

  @ViewChild('anglifyInput', { read: InputComponent }) public anglifyInput!: InputComponent;

  /**
   * Sets input label.
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
  @Input() public persistentHint: boolean = this.settings.persistentHint;

  /**
   * Forces label to always be in floating mode.
   */
  @Input() public alwaysFloatingLabel: boolean = this.settings.alwaysFloatingLabel;

  /**
   * Hides hint and validation errors.
   */
  @Input() public hideDetails: boolean = this.settings.hideDetails;

  /**
   * Creates counter for input length. The maximum length can be set using the `maxlength` property on the `anglfyInput` directive.
   */
  @Input() public counter: boolean = this.settings.counter;

  /**
   * Puts the input in a manual error state.
   */
  @Input() public error?: string;

  public constructor(@Self() @Inject('anglifyTextAreaSettings') public settings: EntireTextAreaSettings) {}
}
