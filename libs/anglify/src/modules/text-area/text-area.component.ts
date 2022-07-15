import { AfterViewInit, Component, ContentChild, ContentChildren, Inject, Input, QueryList, Self, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DEFAULT_TEXT_AREA_SETTINGS, TEXT_AREA_SETTINGS } from './text-area-settings.token';
import { EntireTextAreaSettings } from './text-area.interface';
import { createSettingsProvider } from '../../factories/settings.factory';
import { SlotDirective } from '../common/directives/slot/slot.directive';
import { InputComponent } from '../input/input.component';
import { InputDirective } from '../input/input.directive';
import { InputAppearance } from '../input/input.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [createSettingsProvider<EntireTextAreaSettings>('anglifyTextAreaSettings', DEFAULT_TEXT_AREA_SETTINGS, TEXT_AREA_SETTINGS)],
})
export class TextAreaComponent implements AfterViewInit {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;
  @ContentChild(InputDirective) public readonly input?: InputDirective;
  @ViewChild('anglifyInput', { read: InputComponent }) public anglifyInput!: InputComponent;

  @Input() public label?: string;
  @Input() public appearance: InputAppearance = this.settings.appearance;
  @Input() public hint = '';
  @Input() public persistentHint = this.settings.persistentHint;
  @Input() public alwaysFloatingLabel = this.settings.alwaysFloatingLabel;
  @Input() public hideDetails = this.settings.hideDetails;
  @Input() public counter = this.settings.counter;
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
