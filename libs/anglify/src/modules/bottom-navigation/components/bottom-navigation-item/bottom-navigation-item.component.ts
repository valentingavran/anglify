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
  public set shift(value: boolean) {
    this.shift$.next(value);
  }

  public get shift() {
    return this.shift$.value;
  }

  @Input()
  public set ripple(value: boolean) {
    this.rippleService.active = value;
  }

  public get ripple() {
    return this.rippleService.active;
  }

  @Input()
  public set state(value: boolean) {
    this.rippleService.state = value;
  }

  public get state() {
    return this.rippleService.state;
  }

  @Input()
  public set active(value: boolean) {
    this.active$.next(value);
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
