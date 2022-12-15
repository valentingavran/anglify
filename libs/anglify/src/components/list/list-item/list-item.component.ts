import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  Output,
  QueryList,
  Self,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, filter, map, merge, switchMap, tap } from 'rxjs';
import { RIPPLE } from '../../../composables/ripple/ripple.provider';
import { RippleService } from '../../../composables/ripple/ripple.service';
import { SlotDirective } from '../../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../../factories/settings.factory';
import { FindSlotPipe } from '../../../pipes/find-slot/find-slot.pipe';
import { bindAttrToNativeElement, bindClassToNativeElement } from '../../../utils/functions';
import { RouterLinkCommands } from '../../../utils/interfaces';
import { DEFAULT_LIST_ITEM_SETTINGS, LIST_ITEM_SETTINGS } from './list-item-settings.token';
import { EntireListItemSettings } from './list-item.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-list-item',
  standalone: true,
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    createSettingsProvider<EntireListItemSettings>('anglifyListItemSettings', DEFAULT_LIST_ITEM_SETTINGS, LIST_ITEM_SETTINGS),
    RIPPLE,
  ],
  imports: [FindSlotPipe, NgIf, SlotOutletDirective, FindSlotPipe, AsyncPipe],
})
export class ListItemComponent implements EntireListItemSettings {
  @ContentChildren(SlotDirective) protected readonly slots?: QueryList<SlotDirective>;

  public get active() {
    return this.active$.value;
  }

  @Input() public set active(value: boolean) {
    this.active$.next(value);
  }

  public get highlight() {
    return this.highlight$.value;
  }

  @Input() public set highlight(value: boolean) {
    this.highlight$.next(value);
  }

  @Input() public dense = this.settings.dense;

  public get disabled() {
    return this.disabled$.value;
  }

  @Input() public set disabled(value: boolean) {
    this.disabled$.next(value);
  }

  public get selectable() {
    return this.selectable$.value;
  }

  @Input() public set selectable(value: boolean) {
    this.selectable$.next(value);
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

  public get focusable() {
    return this.focusable$.value;
  }

  @Input() public set focusable(value: boolean) {
    this.focusable$.next(value);
  }

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public readonly onClick = new EventEmitter<void>();

  public readonly active$ = new BehaviorSubject(this.settings.active);

  protected readonly selectable$ = new BehaviorSubject(this.settings.selectable);

  protected readonly routerLink$ = new BehaviorSubject(this.settings.routerLink);

  protected readonly disabled$ = new BehaviorSubject(this.settings.disabled);

  protected readonly focusable$ = new BehaviorSubject(this.settings.focusable);

  protected readonly highlight$ = new BehaviorSubject(this.settings.highlight);

  public constructor(
    @Self() @Inject('anglifyListItemSettings') private readonly settings: EntireListItemSettings,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly rippleService: RippleService,
    private readonly router: Router
  ) {
    this.rippleService.active = this.settings.ripple;
    this.rippleService.state = this.settings.state;
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
