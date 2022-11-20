import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  Output,
  QueryList,
  Self,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, map, merge, switchMap, tap } from 'rxjs';
import { RIPPLE } from '../../../../composables/ripple/ripple.provider';
import { RippleService } from '../../../../composables/ripple/ripple.service';
import { SlotDirective } from '../../../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../../../factories/settings.factory';
import { FindSlotPipe } from '../../../../pipes/find-slot/find-slot.pipe';
import { bindClassToNativeElement } from '../../../../utils/functions';
import { RouterLinkCommands } from '../../../../utils/interfaces';
import { DEFAULT_TAB_SETTINGS, TAB_SETTINGS } from '../../tab-settings.token';
import { EntireTabSettings } from '../../tab.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-tab',
  standalone: true,
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireTabSettings>('anglifyTabSettings', DEFAULT_TAB_SETTINGS, TAB_SETTINGS), RIPPLE],
  imports: [AsyncPipe, FindSlotPipe, NgIf, SlotOutletDirective],
})
export class TabComponent {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  /**
   * Sets the label of the Tab.
   */
  @Input() public label?: string;

  public get ripple(): boolean {
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
  @Input() public exact = true;

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public readonly onActiveChange = new EventEmitter<void>();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public readonly onSelectPrevious = new EventEmitter<void>();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public readonly onSelectNext = new EventEmitter<void>();

  public get active() {
    return this._active$.value;
  }

  /**
   * Sets this tab as the default active tab. Only one tab have this property per tab group.
   */
  @HostBinding('attr.aria-selected')
  public set active(value: boolean) {
    this._active$.next(value);
  }

  private readonly _active$ = new BehaviorSubject<boolean>(false);

  public active$ = this._active$.asObservable();

  public readonly routerLink$ = new BehaviorSubject<RouterLinkCommands>(null);

  // @ts-expect-error: Value is used
  @HostBinding('attr.role') private readonly role = 'tab';

  // @ts-expect-error: Value is used
  @HostBinding('tabindex') private get tabindex() {
    return this.active ? 0 : -1;
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

  @HostListener('click')
  protected click() {
    this._active$.next(true);
  }

  public constructor(
    @Self() @Inject('anglifyTabSettings') public settings: EntireTabSettings,
    public readonly elementRef: ElementRef<HTMLElement>,
    private readonly rippleService: RippleService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.ripple = this.settings.ripple;
    this.state = this.settings.state;

    this.routerLinkHandler$.pipe(untilDestroyed(this)).subscribe();
    bindClassToNativeElement(this, this.active$, this.elementRef.nativeElement, 'active');
  }

  private readonly routerLinkHandler$ = merge(
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)),
    this.routerLink$
  ).pipe(
    filter(() => !this.inactive),
    switchMap(() => this.routerLink$),
    map(routerLink => this.isRouteActive(routerLink)),
    tap(isActive => this._active$.next(isActive))
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
