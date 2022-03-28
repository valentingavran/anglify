import { ChangeDetectionStrategy, Component, ContentChild, Input } from '@angular/core';
import type { BooleanLike } from '../../../../utils/interfaces';
import { AppendDirective } from '../../directives/append/append.directive';
import { PrependDirective } from '../../directives/prepend/prepend.directive';

@Component({
  selector: 'anglify-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  @ContentChild(AppendDirective) public readonly appendDirective?: AppendDirective;
  @ContentChild(PrependDirective) public readonly prependDirective?: PrependDirective;

  @Input() public dense: BooleanLike = false;
  @Input() public disabled: BooleanLike = false;
}
