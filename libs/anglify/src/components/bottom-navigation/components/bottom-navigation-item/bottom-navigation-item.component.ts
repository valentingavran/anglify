import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, filter, map, merge, switchMap, tap } from 'rxjs';
import { RIPPLE } from '../../../../composables/ripple/ripple.provider';
import { RippleService } from '../../../../composables/ripple/ripple.service';
import { SlotDirective } from '../../../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../../../directives/slot-outlet/slot-outlet.directive';
import { FindSlotPipe } from '../../../../pipes/find-slot/find-slot.pipe';
import { bindClassToNativeElement } from '../../../../utils/functions';
import { RouterLinkCommands } from '../../../../utils/interfaces';

@UntilDestroy()
@Component({
  selector: 'anglify-bottom-navigation-item',
  standalone: true,
  templateUrl: './bottom-navigation-item.component.html',
  styleUrls: ['./bottom-navigation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RIPPLE],
  imports: [NgIf, FindSlotPipe, AsyncPipe, SlotOutletDirective],
})
export class BottomNavigationItemComponent {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  public get shift() {
    return this.shift$.value;
  }

  /**
   * Hides text of `BottomNavigationItem's` when they are not active.
   */
  @Input()
  public set shift(value: boolean) {
    this.shift$.next(value);
  }

  public get ripple() {
    return this.rippleService.active;
  }

  /**
   * Turns the ripple effect on or off.
   */
  @Input()
  public set ripple(value: boolean) {
    this.rippleService.active = value;
  }

  public get state() {
    return this.rippleService.state;
  }

  /**
   * Controls whether to display the focus and hover styles for this component.
   */
  @Input()
  public set state(value: boolean) {
    this.rippleService.state = value;
  }

  public get routerLink() {
    return this.routerLink$.value;
  }

  /**
   * Denotes the target route of the link. You can find more information about the to prop on the [Angular RouterLink documentation](https://angular.io/api/router/RouterLink) page.
   */
  @Input() public set routerLink(commands: RouterLinkCommands) {
    this.routerLink$.next(commands);
  }

  /**
   * If this option is set, the bottom navigation item will not be displayed as a link even if the [routerLink]
   * property is set.
   */
  @Input() public inactive = false;

  /**
   * Exactly match the link. Without this, `/user/profile/` will match for example every
   * user sub-route too (like `/user/profile/edit`).
   */
  @Input() public exact = false;

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public readonly onActiveChange = new EventEmitter<void>();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public readonly onSelectPrevious = new EventEmitter<void>();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public readonly onSelectNext = new EventEmitter<void>();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public readonly onClick = new EventEmitter<void>();

  public get active() {
    return this.active$.value;
  }

  /**
   * Sets this items as the default active item. Only one item inside each `BottomNavigation` can have this property.
   */
  @HostBinding('attr.aria-selected')
  public set active(value: boolean) {
    this.active$.next(value);
  }

  public readonly shift$ = new BehaviorSubject(false);

  public readonly active$ = new BehaviorSubject(false);

  private readonly routerLink$ = new BehaviorSubject<RouterLinkCommands>(null);

  public constructor(
    private readonly rippleService: RippleService,
    public readonly elementRef: ElementRef<HTMLElement>,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    bindClassToNativeElement(this, this.active$, this.elementRef.nativeElement, 'active');
    bindClassToNativeElement(
      this,
      combineLatest([this.active$, this.shift$]).pipe(map(([active, shift]) => !active && shift)),
      this.elementRef.nativeElement,
      'shift'
    );

    this.routerLinkHandler$.pipe(untilDestroyed(this)).subscribe();
  }

  // @ts-expect-error: Value is used
  @HostBinding('attr.role') private readonly role = 'tab';

  // @ts-expect-error: Value is used
  @HostBinding('tabindex') private get tabindex() {
    return this.active ? 0 : -1;
  }

  @HostListener('click')
  // @ts-expect-error: Value is used
  private click() {
    this.onClick.next();
  }

  @HostListener('keydown.arrowleft', ['$event'])
  @HostListener('keydown.arrowright', ['$event'])
  // @ts-expect-error: Value is used
  private onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.onSelectPrevious.next();
    } else if (event.key === 'ArrowRight') {
      this.onSelectNext.next();
    }
  }

  private readonly routerLinkHandler$ = merge(
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)),
    this.routerLink$
  ).pipe(
    filter(() => !this.inactive),
    switchMap(() => this.routerLink$),
    map(routerLink => this.isRouteActive(routerLink)),
    tap(isActive => this.active$.next(isActive))
  );

  private isRouteActive(route: RouterLinkCommands) {
    if (!route) return false;

    let url;
    if (Array.isArray(route)) {
      url = this.router.createUrlTree(route);
    } else {
      url = this.router.createUrlTree([route], { relativeTo: this.route });
    }

    return this.router.isActive(url, {
      paths: this.exact ? 'exact' : 'subset',
      matrixParams: 'ignored',
      queryParams: 'ignored',
      fragment: 'ignored',
    });
  }
}
