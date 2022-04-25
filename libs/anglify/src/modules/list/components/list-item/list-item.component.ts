import { ChangeDetectionStrategy, Component, ContentChild, Input } from '@angular/core';
import { RIPPLE } from 'libs/anglify/src/composables/ripple/ripple.provider';
import { RippleService } from 'libs/anglify/src/composables/ripple/ripple.service';
import { toBoolean } from 'libs/anglify/src/utils/functions';
import type { BooleanLike } from '../../../../utils/interfaces';
import { AppendDirective } from '../../directives/append/append.directive';
import { PrependDirective } from '../../directives/prepend/prepend.directive';

@Component({
  selector: 'anglify-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RIPPLE],
})
export class ListItemComponent {
  @ContentChild(AppendDirective) public readonly appendDirective?: AppendDirective;
  @ContentChild(PrependDirective) public readonly prependDirective?: PrependDirective;

  @Input() public dense: BooleanLike = false;
  @Input() public disabled: BooleanLike = false;

  @Input() public set ripple(value: BooleanLike) {
    this.rippleService.active = toBoolean(value);
  }

  public constructor(private readonly rippleService: RippleService) {}
}
