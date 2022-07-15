import { Directive, Input } from '@angular/core';
import { RippleOrigin } from '../../composables/ripple/ripple.interface';
import { RIPPLE } from '../../composables/ripple/ripple.provider';
import { RippleService } from '../../composables/ripple/ripple.service';

@Directive({
  selector: '[anglifyInteractionState]',
  providers: [RIPPLE],
})
export class InteractionStateDirective {
  @Input() public set active(value: boolean) {
    this.rippleService.active = value;
  }

  @Input() public set rippleOrigin(value: RippleOrigin) {
    this.rippleService.rippleOrigin = value;
  }

  @Input() public set state(value: boolean) {
    this.rippleService.state = value;
  }

  public constructor(private readonly rippleService: RippleService) {
    this.rippleService.active = true;
  }
}
