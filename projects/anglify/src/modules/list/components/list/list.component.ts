import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { BooleanLike } from '../../../../utils/interfaces';
import { isBooleanLikeTrue } from '../../../../utils/functions';

@Component({
  selector: 'anglify-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() public dense: BooleanLike = false;

  @HostBinding('class')
  private get classList(): string {
    const classNames = [];

    if (isBooleanLikeTrue(this.dense)) {
      classNames.push('dense');
    }

    return classNames.join(' ');
  }
}
