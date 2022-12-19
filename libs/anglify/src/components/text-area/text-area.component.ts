import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Inject, Input, QueryList, Self } from '@angular/core';
import { SlotDirective } from '../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { FindSlotPipe } from '../../pipes/find-slot/find-slot.pipe';
import { InputComponent } from '../input/input.component';
import { InputDirective } from '../input/input.directive';
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
export class TextAreaComponent implements EntireTextAreaSettings {
  @ContentChildren(SlotDirective) protected readonly slots?: QueryList<SlotDirective>;

  @ContentChild(InputDirective) protected readonly input?: InputDirective;

  @Input() public label = this.settings.label;

  @Input() public appearance = this.settings.appearance;

  @Input() public hint = this.settings.hint;

  @Input() public persistentHint: boolean = this.settings.persistentHint;

  @Input() public alwaysFloatingLabel: boolean = this.settings.alwaysFloatingLabel;

  @Input() public hideDetails: boolean = this.settings.hideDetails;

  @Input() public counter: boolean = this.settings.counter;

  @Input() public error = this.settings.error;

  public constructor(@Self() @Inject('anglifyTextAreaSettings') private readonly settings: EntireTextAreaSettings) {}
}
