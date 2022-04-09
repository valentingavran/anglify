import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { isBooleanLikeTrue } from '../../utils/functions';
import { BooleanLike } from '../../utils/interfaces';

@Component({
  selector: 'anglify-progress-linear',
  templateUrl: './progress-linear.component.html',
  styleUrls: ['./progress-linear.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressLinearComponent {
  @Input() public active: BooleanLike = true;
  @Input() public bufferValue: number = 100;
  @Input() public indeterminate: BooleanLike = false;
  @Input() public stream: BooleanLike = false;
  @Input() public value: number = 0;

  @HostBinding('class')
  protected get classList() {
    const classNames = [];

    if (isBooleanLikeTrue(this.active)) {
      classNames.push('anglify-progress-linear--active');
    }

    return classNames.join(' ');
  }
}
