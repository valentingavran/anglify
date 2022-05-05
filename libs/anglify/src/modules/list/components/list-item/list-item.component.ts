import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, map, switchMap, tap } from 'rxjs';
import { RIPPLE } from '../../../../composables/ripple/ripple.provider';
import { RippleService } from '../../../../composables/ripple/ripple.service';
import { bindClassToNativeElement, toBoolean } from '../../../../utils/functions';
import type { BooleanLike } from '../../../../utils/interfaces';
import { filterEmpty } from '../../../../utils/operator-functions';
import { AppendDirective } from '../../directives/append/append.directive';
import { PrependDirective } from '../../directives/prepend/prepend.directive';

@UntilDestroy()
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

  @Input()
  public set active(value: BooleanLike) {
    this.active$.next(toBoolean(value));
  }

  public get active() {
    return this.active$.value;
  }

  @Input() public dense: BooleanLike = false;
  @Input() public disabled: BooleanLike = false;

  /**
   * Allow text selection inside anglify-list-item. This prop uses {@link https://developer.mozilla.org/en-US/docs/Web/CSS/user-select user-select}
   */
  @Input() public set selectable(value: BooleanLike) {
    this.selectable$.next(toBoolean(value));
  }

  public get selectable() {
    return this.selectable$.value;
  }

  @Input() public set ripple(value: BooleanLike) {
    this.rippleService.active = toBoolean(value);
  }

  public get ripple() {
    return this.rippleService.active;
  }

  @Input() public set state(value: BooleanLike) {
    this.rippleService.state = toBoolean(value);
  }

  public get state() {
    return this.rippleService.state;
  }

  @Input() public set routerLink(commands: any[] | string | null | undefined) {
    this.routerLink$.next(commands);
  }

  public get routerLink() {
    return this.routerLink$.value;
  }

  /**
   * If this option is set, the list item will not be displayed as a link even if the [routerLink]
   * property is set.
   */
  @Input() public inactive: BooleanLike = false;

  /**
   * Exactly match the link. Without this, `/user/profile/` will match for example every
   * user sub-route too (like `/user/profile/edit`).
   */
  @Input() public exact: BooleanLike = false;

  @Output() public readonly onClick = new EventEmitter<void>();

  public readonly active$ = new BehaviorSubject<boolean>(false);
  public readonly selectable$ = new BehaviorSubject<boolean>(false);
  public readonly routerLink$ = new BehaviorSubject<any[] | string | null | undefined>(null);

  public constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly rippleService: RippleService,
    private readonly router: Router
  ) {
    bindClassToNativeElement(this, this.active$, this.elementRef.nativeElement, 'active');
    bindClassToNativeElement(this, this.selectable$, this.elementRef.nativeElement, 'selectable');
    this.routerLinkHandler$.pipe(untilDestroyed(this)).subscribe();
  }

  private readonly routerLinkHandler$ = this.router.events.pipe(
    filter(() => !toBoolean(this.inactive)),
    filter(event => event instanceof NavigationEnd),
    switchMap(() => this.routerLink$),
    filterEmpty(),
    map(routerLink => this.isRouteActive(routerLink)),
    tap(isActive => this.active$.next(isActive))
  );

  private isRouteActive(route: any[] | string) {
    let url;
    if (route instanceof Array) {
      url = this.router.createUrlTree(route);
    } else {
      url = route;
    }
    return this.router.isActive(url, {
      paths: toBoolean(this.exact) ? 'exact' : 'subset',
      matrixParams: 'ignored',
      queryParams: 'ignored',
      fragment: 'ignored',
    });
  }

  @HostListener('click')
  // @ts-expect-error
  private click() {
    this.onClick.next();
  }
}
