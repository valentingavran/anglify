import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Inject, Input, QueryList, Self } from '@angular/core';
import { SlotDirective } from '../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { FindSlotPipe } from '../../pipes/find-slot/find-slot.pipe';
import { InputComponent } from '../input/input.component';
import { InputDirective } from '../input/input.directive';
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
export class TextFieldComponent implements EntireTextFieldSettings {
  @ContentChildren(SlotDirective) protected readonly slots?: QueryList<SlotDirective>;

  @ContentChild(InputDirective) protected readonly input?: InputDirective;

  @Input() public label = this.settings.label;

  @Input() public appearance = this.settings.appearance;

  @Input() public hint = this.settings.hint;

  @Input() public persistentHint = this.settings.persistentHint;

  @Input() public alwaysFloatingLabel = this.settings.alwaysFloatingLabel;

  @Input() public hideDetails = this.settings.hideDetails;

  @Input() public counter = this.settings.counter;

  @Input() public error = this.settings.error;

  @Input() public dense = this.settings.dense;

  public constructor(@Self() @Inject('anglifyTextFieldSettings') private readonly settings: EntireTextFieldSettings) {}
}
