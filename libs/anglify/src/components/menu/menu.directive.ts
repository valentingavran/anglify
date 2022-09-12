import {
  ApplicationRef,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Injector,
  Input,
  Renderer2,
  Self,
  TemplateRef,
  ViewContainerRef,
  type ComponentRef,
  type EmbeddedViewRef,
  type OnDestroy,
  type Type,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, fromEvent, map, ReplaySubject, share, skip, Subject, takeUntil, tap } from 'rxjs';
import { Elevation } from '../../composables/elevation/elevation.interface';
import { Position } from '../../composables/position/position.interface';
import { POSITION_SETTINGS } from '../../composables/position/position.token';
import { createSettingsProvider } from '../../factories/settings.factory';
import { MenuComponent } from './components/menu/menu.component';
import { DEFAULT_MENU_SETTINGS, MENU_SETTINGS } from './menu-settings.token';
import { EntireMenuSettings, MenuMountingPoint } from './menu.interface';

@UntilDestroy()
@Directive({
  selector: '[anglifyMenuTriggerFor]',
  standalone: true,
  exportAs: 'anglifyMenu',
  providers: [createSettingsProvider<EntireMenuSettings>('anglifyMenuSettings', DEFAULT_MENU_SETTINGS, MENU_SETTINGS)],
})
export class MenuDirective implements OnDestroy {
  /**
   * The reference of the menu to be displayed.
   */
  @Input('anglifyMenuTriggerFor') public content!: TemplateRef<any> | Type<any>;

  /**
   * The place where the menu is added in the DOM. Default: `parent`.
   */
  @Input('anglifyMenuMountingPoint') public mountingPoint: MenuMountingPoint = 'parent';

  /**
   * Whether to open the menu when the activator (host) is clicked.
   */
  @Input() public openOnClick = this.settings.openOnClick;

  /**
   * Whether the menu should be closed when clicking outside the menu.
   */
  @Input() public closeOnOutsideClick = this.settings.closeOnOutsideClick;

  /**
   * Inherits and uses the size of the parent.
   */
  @Input() public set parentWidth(value: boolean) {
    const bool = value;
    this.parentWidth$.next(bool);
    if (this.componentRef) {
      this.componentRef.instance.parentWidth = bool;
    }
  }

  /**
   * Distance between the menu and the activator
   */
  @Input() public set offset(value: number) {
    this.offset$.next(value);
    if (this.componentRef) {
      this.componentRef.instance.offset = value;
    }
  }

  /**
   * Defines at which position the menu should be displayed.
   */
  @Input() public set position(value: Position) {
    this.position$.next(value);
    if (this.componentRef) {
      this.componentRef.instance.position = value;
    }
  }

  /**
   * Automatically determines the best position for the menu. If possible the preset position is used.
   */
  @Input() public set flip(value: boolean) {
    this.flip$.next(value);
    if (this.componentRef) {
      this.componentRef.instance.flip = value;
    }
  }

  /**
   * Designates an elevation applied to the component between 0 and 24. You can find more
   * information on the elevation page.
   */
  @Input('anglifyMenuElevation') public set elevation(value: Elevation) {
    this.elevation$.next(value);
    if (this.componentRef) {
      this.componentRef.instance.elevation = value;
    }
  }

  private readonly parentWidth$ = new BehaviorSubject<boolean>(this.settings.parentWidth);

  private readonly offset$ = new BehaviorSubject<number>(this.settings.offset);

  private readonly elevation$ = new BehaviorSubject<Elevation>(this.settings.elevation);

  private readonly position$ = new BehaviorSubject<Position>(this.settings.position);

  private readonly flip$ = new BehaviorSubject<boolean>(this.settings.flip);

  private readonly openAction$ = new Subject<void>();

  private readonly closeAction$ = new Subject<void>();

  private componentRef: ComponentRef<MenuComponent> | undefined; // Menu Component Reference

  private embeddedView: EmbeddedViewRef<any> | undefined; // Menu Content Template Reference

  private readonly openHandler$ = this.openAction$.pipe(tap(() => this.create()));

  private readonly closeHandler$ = this.closeAction$.pipe(tap(() => this.detach()));

  private readonly _isOpen$ = new BehaviorSubject<boolean>(false);

  public readonly isOpen$ = this._isOpen$.asObservable().pipe(share({ connector: () => new ReplaySubject(1) }));

  public constructor(
    private readonly element: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly injector: Injector,
    private readonly resolver: ComponentFactoryResolver,
    private readonly applicationRef: ApplicationRef,
    private readonly cdRef: ChangeDetectorRef,
    @Self() @Inject('anglifyMenuSettings') private readonly settings: EntireMenuSettings
  ) {
    this.openHandler$.pipe(untilDestroyed(this)).subscribe();
    this.closeHandler$.pipe(untilDestroyed(this)).subscribe();
  }

  public ngOnDestroy() {
    this.detach();
  }

  @HostListener('click')
  // @ts-expect-error: Value is used
  private onClick() {
    if (!this.openOnClick) return;
    this.openAction$.next();
  }

  public open() {
    this.openAction$.next();
  }

  public close() {
    this.closeAction$.next();
  }

  public toggle() {
    if (this.componentRef) {
      this.closeAction$.next();
    } else {
      this.openAction$.next();
    }
  }

  private create() {
    if (this.componentRef) return;
    const factory = this.resolver.resolveComponentFactory(MenuComponent);
    const injector = Injector.create({
      providers: [{ provide: POSITION_SETTINGS, useValue: { host: this.element.nativeElement } }],
    });
    this.componentRef = this.viewContainerRef.createComponent(factory, 0, injector, this.generateNgContent());
    this.componentRef.instance.parentWidth = this.parentWidth$.value;
    this.componentRef.instance.offset = this.offset$.value;
    this.componentRef.instance.position = this.position$.value;
    this.componentRef.instance.elevation = this.elevation$.value;

    this.changeMountingPoint();
    this.cdRef.markForCheck();

    this.createClickOutsideListener();
    this._isOpen$.next(true);
  }

  private detach() {
    this.componentRef?.destroy();
    this.componentRef = undefined;
    this.embeddedView?.destroy();
    this.embeddedView = undefined;
    this._isOpen$.next(false);
  }

  private generateNgContent() {
    if (this.content instanceof TemplateRef) {
      this.embeddedView = this.content.createEmbeddedView({});
      this.applicationRef.attachView(this.embeddedView);
      return [this.embeddedView.rootNodes];
    }

    return [[this.resolver.resolveComponentFactory(this.content).create(this.injector)]];
  }

  private changeMountingPoint() {
    if (!this.componentRef) return;
    if (this.mountingPoint === 'parent') {
    } else if (this.mountingPoint === 'body') {
      this.renderer.appendChild(document.body, this.componentRef.location.nativeElement);
    } else {
      this.renderer.appendChild(this.mountingPoint, this.componentRef.location.nativeElement);
    }
  }

  /**
   * Listen for the next click outside. Subscription destroys itself automatically.
   */
  private createClickOutsideListener() {
    fromEvent(window, 'click')
      .pipe(
        skip(1),
        untilDestroyed(this),
        // eslint-disable-next-line rxjs/no-unsafe-takeuntil
        takeUntil(this.closeAction$),
        filter(() => this.closeOnOutsideClick),
        map(event => event.target as HTMLElement),
        map(target => {
          if (this.componentRef) {
            const element = this.componentRef.location.nativeElement as HTMLElement;
            return !element.contains(target) && !element.parentElement?.contains(target);
          }

          return !this.element.nativeElement.contains(target);
        }),
        filter(Boolean),
        tap(() => {
          this.closeAction$.next();
        })
      )
      .subscribe();
  }
}
