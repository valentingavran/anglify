import { AfterViewInit, Component, ContentChild, ContentChildren, Inject, Input, QueryList, Self, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DEFAULT_TEXT_FIELD_SETTINGS, TEXT_FIELD_SETTINGS } from './text-field-settings.token';
import { EntireTextFieldSettings } from './text-field.interface';
import { createSettingsProvider } from '../../factories/settings.factory';
import { BooleanLike } from '../../utils/interfaces';
import { SlotDirective } from '../common/directives/slot/slot.directive';
import { InputComponent } from '../input/input.component';
import { InputDirective } from '../input/input.directive';
import { InputAppearance } from '../input/input.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    createSettingsProvider<EntireTextFieldSettings>('anglifyTextFieldSettings', DEFAULT_TEXT_FIELD_SETTINGS, TEXT_FIELD_SETTINGS),
  ],
})
export class TextFieldComponent implements AfterViewInit {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;
  @ContentChild(InputDirective) public readonly input?: InputDirective;
  @ViewChild('anglifyInput', { read: InputComponent }) public anglifyInput!: InputComponent;

  @Input() public label?: string;
  @Input() public appearance: InputAppearance = this.settings.appearance;
  @Input() public hint = '';
  @Input() public persistentHint: BooleanLike = this.settings.persistentHint;
  @Input() public alwaysFloatingLabel: BooleanLike = this.settings.alwaysFloatingLabel;
  @Input() public hideDetails: BooleanLike = this.settings.hideDetails;
  @Input() public counter: BooleanLike = this.settings.counter;
  @Input() public error?: string;
  @Input() public dense: BooleanLike = this.settings.dense;

  public constructor(@Self() @Inject('anglifyTextFieldSettings') public settings: EntireTextFieldSettings) {}

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
      console.warn('An input field that has an anglifyInput directive must be added to the anglify-text-field component for it to work');
    }
  }
}
