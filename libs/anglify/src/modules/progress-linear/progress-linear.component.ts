import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input, Self } from '@angular/core';
import { DEFAULT_PROGRESS_LINEAR_SETTINGS, PROGRESS_LINEAR_SETTINGS } from './progress-linear-settings.token';
import { EntireProgressLinearSettings } from './progress-linear.interface';
import { createSettingsProvider } from '../../factories/settings.factory';
import { toBoolean } from '../../utils/functions';
import { BooleanLike } from '../../utils/interfaces';

@Component({
  selector: 'anglify-progress-linear',
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
})
export class ProgressLinearComponent {
  @Input() public active: BooleanLike = this.settings.active;
  @Input() public bufferValue = this.settings.bufferValue;
  @Input() public indeterminate: BooleanLike = this.settings.indeterminate;
  @Input() public stream: BooleanLike = this.settings.stream;
  @Input() public value = this.settings.value;

  public constructor(@Self() @Inject('anglifyProgressLinearSettings') private readonly settings: EntireProgressLinearSettings) {}

  @HostBinding('class')
  protected get classList() {
    const classNames = [];

    if (toBoolean(this.active)) {
      classNames.push('anglify-progress-linear-active');
    }

    return classNames.join(' ');
  }
}
