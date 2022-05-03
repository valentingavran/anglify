import { Directive, Input } from '@angular/core';
import { RippleOrigin } from '../../composables/ripple/ripple.interface';
import { RIPPLE } from '../../composables/ripple/ripple.provider';
import { RippleService } from '../../composables/ripple/ripple.service';
import { toBoolean } from '../../utils/functions';
import { BooleanLike } from '../../utils/interfaces';

@Directive({
  selector: '[anglifyInteractionState]',
  providers: [RIPPLE],
})
export class InteractionStateDirective {
  @Input() public set active(value: BooleanLike) {
    this.rippleService.active = toBoolean(value);
  }

  @Input() public set rippleOrigin(value: RippleOrigin) {
    this.rippleService.rippleOrigin = value;
  }

  @Input() public set state(value: BooleanLike) {
    this.rippleService.state = toBoolean(value);
  }

  public constructor(private readonly rippleService: RippleService) {
    this.rippleService.active = true;
  }
}
