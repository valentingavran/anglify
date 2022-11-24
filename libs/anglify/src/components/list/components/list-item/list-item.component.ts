import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, filter, map, merge, switchMap, tap } from 'rxjs';
import { RIPPLE } from '../../../../composables/ripple/ripple.provider';
import { RippleService } from '../../../../composables/ripple/ripple.service';
import { SlotDirective } from '../../../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../../../directives/slot-outlet/slot-outlet.directive';
import { FindSlotPipe } from '../../../../pipes/find-slot/find-slot.pipe';
import { bindAttrToNativeElement, bindClassToNativeElement } from '../../../../utils/functions';
import { RouterLinkCommands } from '../../../../utils/interfaces';

@UntilDestroy()
@Component({
  selector: 'anglify-list-item',
  standalone: true,
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RIPPLE],
  imports: [FindSlotPipe, NgIf, SlotOutletDirective, FindSlotPipe, AsyncPipe],
})
export class ListItemComponent {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  public get active() {
    return this.active$.value;
  }

  /**
   * Marks this item as active, which changes the style.
   */
  @Input() public set active(value: boolean) {
    this.active$.next(value);
  }

  public get highlight() {
    return this.highlight$.value;
  }

  /**
   * Sets the same styling as if the item was focused.
   */
  @Input() public set highlight(value: boolean) {
    this.highlight$.next(value);
  }

  /**
   * Lowers max height of this list item.
   */
  @Input() public dense = false;

  public get disabled() {
    return this.disabled$.value;
  }

  /**
   * Disables the component.
   */
  @Input() public set disabled(value: boolean) {
    this.disabled$.next(value);
  }

  public get selectable() {
    return this.selectable$.value;
  }

  /**
   * Allow text selection inside anglify-list-item. This prop uses {@link https://developer.mozilla.org/en-US/docs/Web/CSS/user-select user-select}
   */
  @Input() public set selectable(value: boolean) {
    this.selectable$.next(value);
  }

  public get ripple() {
    return this.rippleService.active;
  }

  /**
   * Turns the ripple effect on or off.
   */
  @Input() public set ripple(value: boolean) {
    this.rippleService.active = value;
  }

  public get state() {
    return this.rippleService.state;
  }

  /**
   * Controls whether to display the focus and hover styles for this component.
   */
  @Input() public set state(value: boolean) {
    this.rippleService.state = value;
  }

  public get routerLink() {
    return this.routerLink$.value;
  }

  /**
   * Denotes the target route of the link. You can find more information about the to prop on the
   * [Angular RouterLink documentation](https://angular.io/api/router/RouterLink) page.
   */
  @Input() public set routerLink(commands: RouterLinkCommands) {
    this.routerLink$.next(commands);
  }

  /**
   * If this option is set, the list item will not be displayed as a link even if the [routerLink]
   * property is set.
   */
  @Input() public inactive = false;

  /**
   * Exactly match the link. Without this, `/user/profile/` will match for example every
   * user sub-route too (like `/user/profile/edit`).
   */
  @Input() public exact = false;

  public get focusable() {
    return this.focusable$.value;
  }

  /**
   * Enables or disables keyboard navigation.
   */
  @Input() public set focusable(value: boolean) {
    this.focusable$.next(value);
  }

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public readonly onClick = new EventEmitter<void>();

  public readonly active$ = new BehaviorSubject<boolean>(false);

  public readonly selectable$ = new BehaviorSubject<boolean>(false);

  public readonly routerLink$ = new BehaviorSubject<RouterLinkCommands>(null);

  protected readonly disabled$ = new BehaviorSubject<boolean>(false);

  protected readonly focusable$ = new BehaviorSubject<boolean>(true);

  protected readonly highlight$ = new BehaviorSubject<boolean>(false);

  public constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly rippleService: RippleService,
    private readonly router: Router
  ) {
    bindClassToNativeElement(this, this.active$, this.elementRef.nativeElement, 'active');
    bindClassToNativeElement(this, this.selectable$, this.elementRef.nativeElement, 'selectable');
    bindAttrToNativeElement(
      this,
      combineLatest([this.disabled$, this.focusable$]).pipe(map(([disabled, focusable]) => !disabled && focusable)),
      this.elementRef.nativeElement,
      'tabindex',
      '0'
    );
    bindClassToNativeElement(this, this.highlight$, this.elementRef.nativeElement, 'highlight');
    this.routerLinkHandler$.pipe(untilDestroyed(this)).subscribe();
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
      url = route;
    }

    return this.router.isActive(url, {
      paths: this.exact ? 'exact' : 'subset',
      matrixParams: 'ignored',
      queryParams: 'ignored',
      fragment: 'ignored',
    });
  }

  @HostListener('click')
  protected click() {
    this.onClick.next();
  }
}
