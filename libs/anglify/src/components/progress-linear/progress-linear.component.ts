import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input, Self } from '@angular/core';
import { createSettingsProvider } from '../../factories/settings.factory';
import { ClampPipe } from '../../pipes/clamp/clamp.pipe';
import { PercentPipe } from '../../pipes/percent/percent.pipe';
import { clamp } from '../../utils/functions';
import { DEFAULT_PROGRESS_LINEAR_SETTINGS, PROGRESS_LINEAR_SETTINGS } from './progress-linear-settings.token';
import { EntireProgressLinearSettings } from './progress-linear.interface';

@Component({
  selector: 'anglify-progress-linear',
  standalone: true,
  templateUrl: './progress-linear.component.html',
  styleUrls: ['./progress-linear.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    createSettingsProvider<EntireProgressLinearSettings>(
      'anglifyProgressLinearSettings',
      DEFAULT_PROGRESS_LINEAR_SETTINGS,
      PROGRESS_LINEAR_SETTINGS
    ),
  ],
  imports: [ClampPipe, PercentPipe, NgIf],
})
export class ProgressLinearComponent implements EntireProgressLinearSettings {
  @Input() public active = this.settings.active;

  @Input() public bufferValue = this.settings.bufferValue;

  @Input() public indeterminate = this.settings.indeterminate;

  @Input() public stream = this.settings.stream;

  @Input() public value = this.settings.value;

  public constructor(@Self() @Inject('anglifyProgressLinearSettings') private readonly settings: EntireProgressLinearSettings) {}

  private get normalizedValue() {
    return clamp(this.value, 0, 100);
  }

  @HostBinding('class')
  protected get classList() {
    const classNames = [];

    if (this.active) {
      classNames.push('anglify-progress-linear-active');
    }

    return classNames.join(' ');
  }

  @HostBinding('attr.role') protected readonly role = 'progressbar';

  /**
   * aria-valuenow should be provided and updated unless the value is indeterminate, in which case
   * don't include the attribute.
   */
  @HostBinding('attr.aria-valuenow')
  protected get ariaValueNow() {
    if (this.indeterminate) return undefined;
    return this.normalizedValue;
  }
}
