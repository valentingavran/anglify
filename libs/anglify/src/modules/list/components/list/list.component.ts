import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { toBoolean } from '../../../../utils/functions';
import type { BooleanLike } from '../../../../utils/interfaces';

@Component({
  selector: 'anglify-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() public dense: BooleanLike = false;

  @HostBinding('class')
  protected get classList() {
    const classNames = [];

    if (toBoolean(this.dense)) {
      classNames.push('dense');
    }

    return classNames.join(' ');
  }
}
