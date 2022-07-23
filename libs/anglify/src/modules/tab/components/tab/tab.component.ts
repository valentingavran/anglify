import {
  AfterViewInit,
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
import { createSettingsProvider } from '../../../../factories/settings.factory';
import { RouterLinkCommands } from '../../../../utils/interfaces';
import { SlotDirective } from '../../../common/directives/slot/slot.directive';
import { DEFAULT_TAB_SETTINGS, TAB_SETTINGS } from '../../tab-settings.token';
import { EntireTabSettings } from '../../tab.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireTabSettings>('anglifyTabSettings', DEFAULT_TAB_SETTINGS, TAB_SETTINGS), RIPPLE],
})
export class TabComponent implements AfterViewInit {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  /** Sets the label of the Tab. */
  @Input() public label?: string;

  /** Sets this tab as the default active tab. Only one tab have this property per tab group. */
  @HostBinding('attr.aria-selected')
  @Input()
  public set active(value: boolean) {
    this._active$.next(value);
    if (value) this.activeChange.next();
  }

  public get active() {
    return this._active$.value;
  }

  private readonly _active$ = new BehaviorSubject<boolean>(false);
  public active$ = this._active$.asObservable();

  /** Turns the ripple effect on or off. */
  @Input()
  public set ripple(value: boolean) {
    this.rippleService.active = value;
  }

  public get ripple(): boolean {
    return this.rippleService.active;
  }

  /** Controls whether to display the focus and hover styles for this component. */
  @Input()
  public set state(value: boolean) {
    this.rippleService.state = value;
  }

  public get state() {
    return this.rippleService.state;
  }

  /** Denotes the target route of the link. You can find more information about the to prop on the
   * [Angular RouterLink documentation](https://angular.io/api/router/RouterLink) page. */
  @Input() public set routerLink(commands: RouterLinkCommands) {
    this.routerLink$.next(commands);
  }

  public get routerLink() {
    return this.routerLink$.value;
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

  @Output() public activeChange = new EventEmitter<void>();
  @Output() public selectPrevious = new EventEmitter<void>();
  @Output() public selectNext = new EventEmitter<void>();

  public readonly routerLink$ = new BehaviorSubject<RouterLinkCommands>(null);

  // @ts-expect-error
  @HostBinding('attr.role') private readonly role = 'tab';
  // @ts-expect-error
  @HostBinding('tabindex') private get tabindex() {
    return this.active ? 0 : -1;
  }

  @HostListener('keydown.arrowleft', ['$event'])
  @HostListener('keydown.arrowright', ['$event'])
  // @ts-expect-error
  private onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.selectPrevious.next();
    } else if (event.key === 'ArrowRight') {
      this.selectNext.next();
    }
  }

  @HostListener('click')
  // @ts-expect-error
  private click() {
    this.active = true;
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
  }

  public ngAfterViewInit(): void {
    const children = Array.from(this.elementRef.nativeElement.children);
    const hasTopIcon = this.searchIcon(children, 'top');

    if (hasTopIcon) {
      this.elementRef.nativeElement.classList.add('anglify-tab-has-top-icon');
    }
  }

  private searchIcon(children: Element[], attributeName: string): boolean {
    return children.some(child => {
      if (child.classList.contains('anglify-tab-label')) {
        const tabLabelChildren = Array.from(child.children);
        return tabLabelChildren.some(tabLabelChild => {
          if (tabLabelChild.tagName === 'ANGLIFY-ICON') {
            const value = Array.from(tabLabelChild.attributes).some(attribute => attribute.name === attributeName);
            return Boolean(value);
          }
          return false;
        });
      }
      return false;
    });
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
    if (route instanceof Array) {
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
