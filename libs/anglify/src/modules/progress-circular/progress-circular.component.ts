import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input, Self } from '@angular/core';
import { DEFAULT_PROGRESS_CIRCULAR_SETTINGS, PROGRESS_CIRCULAR_SETTINGS } from './progress-circular-settings.token';
import { EntireProgressCircularSettings } from './progress-circular.interface';
import { createSettingsProvider } from '../../factories/settings.factory';

@Component({
  selector: 'anglify-progress-circular',
  templateUrl: './progress-circular.component.html',
  styleUrls: ['./progress-circular.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    createSettingsProvider<EntireProgressCircularSettings>(
      'anglifyProgressCircularSettings',
      DEFAULT_PROGRESS_CIRCULAR_SETTINGS,
      PROGRESS_CIRCULAR_SETTINGS
    ),
  ],
})
export class ProgressCircularComponent {
  @Input() public indeterminate = this.settings.indeterminate;
  @Input() public value: number = this.settings.value;
  @Input() public rotation: number = this.settings.rotation;

  public readonly radius = 20;

  public constructor(@Self() @Inject('anglifyProgressCircularSettings') private readonly settings: EntireProgressCircularSettings) {}

  private get circumference() {
    return 2 * Math.PI * this.radius;
  }

  private get normalizedValue() {
    if (this.value < 0) {
      return 0;
    }

    if (this.value > 100) {
      return 100;
    }

    return this.value;
  }

  public get strokeDashArray() {
    return Math.round(this.circumference * 1000) / 1000;
  }

  public get strokeDashOffset() {
    return `${((100 - this.normalizedValue) / 100) * this.circumference}px`;
  }

  @HostBinding('class')
  protected get classList() {
    const classNames = [];
    if (this.indeterminate) {
      classNames.push('indeterminate');
    }

    return classNames.join(' ');
  }

  public get style() {
    return `transform: rotate(${this.rotation}deg)`;
  }

  @HostBinding('attr.role') protected readonly role = 'progressbar';

  /** aria-valuenow should be provided and updated unless the value is indeterminate, in which case
   * don't include the attribute. */
  @HostBinding('attr.aria-valuenow')
  protected get ariaValueNow() {
    if (this.indeterminate) return undefined;
    return this.value;
  }
}
