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
import { BehaviorSubject, combineLatest, filter, map, merge, switchMap, tap } from 'rxjs';
import { RIPPLE } from '../../../composables/ripple/ripple.provider';
import { RippleService } from '../../../composables/ripple/ripple.service';
import { SlotDirective } from '../../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../../factories/settings.factory';
import { FindSlotPipe } from '../../../pipes/find-slot/find-slot.pipe';
import { bindClassToNativeElement } from '../../../utils/functions';
import { RouterLinkCommands } from '../../../utils/interfaces';
import { BOTTOM_NAVIGATION_ITEM_SETTINGS, DEFAULT_BOTTOM_NAVIGATION_ITEM_SETTINGS } from './bottom-navigation-item-settings.token';
import { EntireBottomNavigationItemSettings } from './bottom-navigation-item.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-bottom-navigation-item',
  standalone: true,
  templateUrl: './bottom-navigation-item.component.html',
  styleUrls: ['./bottom-navigation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    createSettingsProvider<EntireBottomNavigationItemSettings>(
      'anglifyBottomNavigationItemSettings',
      DEFAULT_BOTTOM_NAVIGATION_ITEM_SETTINGS,
      BOTTOM_NAVIGATION_ITEM_SETTINGS
    ),
    RIPPLE,
  ],
  imports: [NgIf, FindSlotPipe, AsyncPipe, SlotOutletDirective],
})
export class BottomNavigationItemComponent implements EntireBottomNavigationItemSettings {
  @ContentChildren(SlotDirective) protected readonly slots?: QueryList<SlotDirective>;

  public get shift() {
    return this.shift$.value;
  }

  @Input() public set shift(value: boolean) {
    this.shift$.next(value);
  }

  public get ripple() {
    return this.rippleService.active;
  }

  @Input() public set ripple(value: boolean) {
    this.rippleService.active = value;
  }

  public get state() {
    return this.rippleService.state;
  }

  @Input() public set state(value: boolean) {
    this.rippleService.state = value;
  }

  public get routerLink() {
    return this.routerLink$.value;
  }

  @Input() public set routerLink(commands: RouterLinkCommands) {
    this.routerLink$.next(commands);
  }

  @Input() public inactive = this.settings.inactive;

  @Input() public exact = this.settings.exact;

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

  public readonly active$ = new BehaviorSubject(false);

  protected readonly shift$ = new BehaviorSubject(this.settings.shift);

  private readonly routerLink$ = new BehaviorSubject<RouterLinkCommands>(null);

  public constructor(
    @Self() @Inject('anglifyBottomNavigationItemSettings') private readonly settings: EntireBottomNavigationItemSettings,
    public readonly elementRef: ElementRef<HTMLElement>,
    private readonly rippleService: RippleService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.rippleService.active = this.settings.ripple;
    this.rippleService.state = this.settings.state;
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
