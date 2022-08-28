import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, ContentChild, ContentChildren, Inject, Input, QueryList, Self, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DEFAULT_TEXT_AREA_SETTINGS, TEXT_AREA_SETTINGS } from './text-area-settings.token';
import { EntireTextAreaSettings } from './text-area.interface';
import { createSettingsProvider } from '../../factories/settings.factory';
import { SlotOutletDirective } from '../common/directives/slot-outlet/slot-outlet.directive';
import { SlotDirective } from '../common/directives/slot/slot.directive';
import { FindSlotPipe } from '../common/pipes/find-slot/find-slot.pipe';
import { InputComponent } from '../input/input.component';
import { InputDirective } from '../input/input.directive';
import { InputAppearance } from '../input/input.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-text-area',
  standalone: true,
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [createSettingsProvider<EntireTextAreaSettings>('anglifyTextAreaSettings', DEFAULT_TEXT_AREA_SETTINGS, TEXT_AREA_SETTINGS)],
  imports: [InputComponent, AsyncPipe, SlotDirective, SlotOutletDirective, FindSlotPipe],
})
export class TextAreaComponent implements AfterViewInit {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;
  @ContentChild(InputDirective) public readonly input?: InputDirective;
  @ViewChild('anglifyInput', { read: InputComponent }) public anglifyInput!: InputComponent;

  /** Sets input label. */
  @Input() public label?: string;

  /** Sets one of the two predefined input styles (`filled` or `outlined`). */
  @Input() public appearance: InputAppearance = this.settings.appearance;

  /** Hint text. */
  @Input() public hint?: string;

  /** Forces hint to always be visible. */
  @Input() public persistentHint: boolean = this.settings.persistentHint;

  /** Forces label to always be in floating mode. */
  @Input() public alwaysFloatingLabel: boolean = this.settings.alwaysFloatingLabel;

  /** Hides hint and validation errors. */
  @Input() public hideDetails: boolean = this.settings.hideDetails;

  /** Creates counter for input length. The maximum length can be set using the `maxlength` property on the `anglfyInput` directive. **/
  @Input() public counter: boolean = this.settings.counter;

  /** Puts the input in a manual error state. */
  @Input() public error?: string;

  public constructor(@Self() @Inject('anglifyTextAreaSettings') public settings: EntireTextAreaSettings) {}

  public ngAfterViewInit() {
    this.anglifyInput.onInputClick.pipe(untilDestroyed(this)).subscribe(() => this.input?.elementRef.nativeElement.focus());

    if (this.input) {
      this.input.disabled$.pipe(untilDestroyed(this)).subscribe(disabled =>
        setTimeout(() => {
          this.anglifyInput.disabled = disabled;
        }, 0)
      );

      this.input.focused$.pipe(untilDestroyed(this)).subscribe(focused =>
        setTimeout(() => {
          this.anglifyInput.focused = focused;
        }, 0)
      );

      this.input.floating$.pipe(untilDestroyed(this)).subscribe(floating =>
        setTimeout(() => {
          this.anglifyInput.floating = floating;
        }, 0)
      );

      this.input.invalid$.pipe(untilDestroyed(this)).subscribe(invalid =>
        setTimeout(() => {
          this.anglifyInput.error = invalid;
        }, 0)
      );
    } else {
      console.warn('An textarea that has an anglifyInput directive must be added to the anglify-textarea component for it to work');
    }
  }
}
