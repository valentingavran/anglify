import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RIPPLE } from '../../../../composables/ripple/ripple.provider';
import { RippleService } from '../../../../composables/ripple/ripple.service';
import { toBoolean } from '../../../../utils/functions';
import { BooleanLike } from '../../../../utils/interfaces';
import { SlotDirective } from '../../../common/directives/slot/slot.directive';

@Component({
  selector: 'anglify-bottom-navigation-item',
  templateUrl: './bottom-navigation-item.component.html',
  styleUrls: ['./bottom-navigation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RIPPLE],
})
export class BottomNavigationItemComponent {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;
  @Output() public readonly onClick = new EventEmitter<void>();

  public readonly shift$ = new BehaviorSubject(false);
  public readonly active$ = new BehaviorSubject(false);

  public constructor(private readonly rippleService: RippleService) {}

  @HostBinding('class')
  protected get classList() {
    const classNames = [];
    if (this.active) {
      classNames.push('active');
    }
    if (!this.active && this.shift) {
      classNames.push('shift');
    }

    return classNames.join(' ');
  }

  @Input()
  public set shift(value: BooleanLike) {
    this.shift$.next(toBoolean(value));
  }

  public get shift() {
    return this.shift$.value;
  }

  @Input()
  public set ripple(value: BooleanLike) {
    this.rippleService.active = toBoolean(value);
  }

  public get ripple() {
    return this.rippleService.active;
  }

  @Input()
  public set state(value: BooleanLike) {
    this.rippleService.state = toBoolean(value);
  }

  public get state() {
    return this.rippleService.state;
  }

  @Input()
  public set active(value: BooleanLike) {
    this.active$.next(toBoolean(value));
  }

  public get active() {
    return this.active$.value;
  }

  @HostListener('click')
  // @ts-expect-error
  private click() {
    this.onClick.next();
  }
}
