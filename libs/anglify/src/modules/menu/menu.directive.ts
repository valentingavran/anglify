import {
  ApplicationRef,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Inject,
  Injector,
  Input,
  OnDestroy,
  Renderer2,
  Self,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, fromEvent, map, skip, Subject, takeUntil, tap } from 'rxjs';
import { MenuComponent } from './components/menu/menu.component';
import { DEFAULT_MENU_SETTINGS, MENU_SETTINGS } from './menu-settings.token';
import type { EntireMenuSettings, MenuMountingPoint } from './menu.interface';
import type { Elevation } from '../../composables/elevation/elevation.interface';
import type { Position } from '../../composables/position/position.interface';
import { POSITION_SETTINGS } from '../../composables/position/position.token';
import { createSettingsProvider } from '../../factories/settings.factory';
import { toBoolean } from '../../utils/functions';
import { BooleanLike } from '../../utils/interfaces';

@UntilDestroy()
@Directive({
  selector: '[anglifyMenuTriggerFor]',
  exportAs: 'anglifyMenu',
  providers: [createSettingsProvider<EntireMenuSettings>('anglifyMenuSettings', DEFAULT_MENU_SETTINGS, MENU_SETTINGS)],
})
export class MenuDirective implements OnDestroy {
  @Input('anglifyMenuTriggerFor') public content!: TemplateRef<any> | Type<any>;
  @Input('anglifyMenuMountingPoint') public mountingPoint: MenuMountingPoint = 'parent';

  @Input()
  public set parentWidth(value: BooleanLike) {
    const bool = toBoolean(value);
    this.parentWidth$.next(bool);
    if (this.componentRef) {
      this.componentRef.instance.parentWidth = bool;
    }
  }

  /** Distance between the menu and the activator */
  @Input()
  public set offset(value: number) {
    this.offset$.next(value);
    if (this.componentRef) {
      this.componentRef.instance.offset = value;
    }
  }

  @Input()
  public set position(value: Position) {
    this.position$.next(value);
    if (this.componentRef) {
      this.componentRef.instance.position = value;
    }
  }

  @Input('anglifyMenuElevation')
  public set elevation(value: Elevation) {
    this.elevation$.next(value);
    if (this.componentRef) {
      this.componentRef.instance.elevation = value;
    }
  }

  @Input() public openOnClick: BooleanLike = this.settings.openOnClick;
  @Input() public closeOnOutsideClick: BooleanLike = this.settings.closeOnOutsideClick;

  private readonly parentWidth$ = new BehaviorSubject<boolean>(this.settings.parentWidth);
  private readonly offset$ = new BehaviorSubject<number>(this.settings.offset);
  private readonly elevation$ = new BehaviorSubject<Elevation>(this.settings.elevation);
  private readonly position$ = new BehaviorSubject<Position>(this.settings.position);

  private readonly openAction = new Subject<void>();
  private readonly closeAction = new Subject<void>();

  private componentRef: ComponentRef<MenuComponent> | undefined; // Menu Component Reference
  private embeddedView: EmbeddedViewRef<any> | undefined; // Menu Content Template Reference

  private readonly openHandler$ = this.openAction.pipe(tap(() => this.create()));
  private readonly closeHandler$ = this.closeAction.pipe(tap(() => this.detach()));

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
  // @ts-expect-error
  private onClick() {
    if (!toBoolean(this.openOnClick)) return;
    this.openAction.next();
  }

  public open() {
    this.openAction.next();
  }

  public close() {
    this.closeAction.next();
  }

  public toggle() {
    if (this.componentRef) {
      this.closeAction.next();
    } else {
      this.openAction.next();
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
  }

  private detach() {
    this.componentRef?.destroy();
    this.componentRef = undefined;
    this.embeddedView?.destroy();
    this.embeddedView = undefined;
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
        takeUntil(this.closeAction),
        filter(() => toBoolean(this.closeOnOutsideClick)),
        map(event => event.target as HTMLElement),
        map(target => !this.element.nativeElement.contains(target)),
        filter(clickedOutside => Boolean(clickedOutside)),
        tap(() => {
          this.closeAction.next();
        })
      )
      .subscribe();
  }
}
