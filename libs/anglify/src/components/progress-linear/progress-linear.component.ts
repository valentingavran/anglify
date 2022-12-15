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
export class ProgressLinearComponent {
  /**
   * Defines whether the component is currently being animated.
   */
  @Input() public active = this.settings.active;

  /**
   * The percentage value for the buffer.
   */
  @Input() public bufferValue = this.settings.bufferValue;

  /**
   * Constantly animates, use when loading progress is unknown.
   */
  @Input() public indeterminate = this.settings.indeterminate;

  /**
   * An alternative style for portraying loading that works in tandem with buffer-value.
   */
  @Input() public stream = this.settings.stream;

  /**
   * The percentage value for current progress.
   */
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
