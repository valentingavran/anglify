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
import { merge, of, Subject } from 'rxjs';
import { delay, mergeMap, repeat, takeUntil, tap } from 'rxjs/operators';
import { POSITION_SETTINGS } from '../../composables/position/position.token';
import { createSettingsProvider } from '../../factories/settings.factory';
import { isTouchDevice } from '../../utils/functions';
import { DEFAULT_TOOLTIP_SETTINGS, TOOLTIP_SETTINGS } from './tooltip-settings.token';
import { TooltipComponent } from './tooltip.component';
import { EntireTooltipSettings, TooltipSettings } from './tooltip.interface';

@UntilDestroy()
@Directive({
  selector: '[anglifyTooltip]',
  standalone: true,
  exportAs: 'anglifyTooltip',
  providers: [createSettingsProvider<EntireTooltipSettings>('anglifyTooltipSettings', DEFAULT_TOOLTIP_SETTINGS, TOOLTIP_SETTINGS)],
})
export class TooltipDirective implements OnDestroy {
  /**
   * Tooltip content. Can either be a `string`, a `ng-template` or `Component`.
   */
  @Input('anglifyTooltip') public content!: TemplateRef<any> | Type<any> | string;

  /**
   * Tooltip configuration object.
   */
  @Input() public set anglifyToolTipConfig(value: TooltipSettings) {
    if (value.position !== undefined && value.position !== this.position) {
      this.position = value.position;
      if (this.componentRef) {
        this.componentRef.instance.position = value.position;
      }
    }

    if (value.defaultOffset !== undefined && value.defaultOffset !== this.offset) {
      this.offset = value.defaultOffset;
      if (this.componentRef) {
        this.componentRef.instance.offset = value.defaultOffset;
      }
    }

    if (value.flip !== undefined && value.flip !== this.flip) {
      this.flip = value.flip;
      if (this.componentRef) {
        this.componentRef.instance.flip = value.flip;
      }
    }

    if (value.parentWidth !== undefined && value.parentWidth !== this.parentWidth) {
      this.parentWidth = value.parentWidth;
      if (this.componentRef) {
        this.componentRef.instance.parentWidth = value.parentWidth;
      }
    }

    if (value.shift !== undefined && value.shift !== this.shift) {
      this.shift = value.shift;
      if (this.componentRef) {
        this.componentRef.instance.shift = value.shift;
      }
    }

    if (value.contentClass !== undefined && value.contentClass !== this.contentClass) {
      this.contentClass = value.contentClass;
      if (this.componentRef) {
        this.componentRef.instance.contentClass = value.contentClass;
      }
    }

    if (
      value.autoCloseOnTouchDevicesAfterDelay !== undefined &&
      value.autoCloseOnTouchDevicesAfterDelay !== this.settings.autoCloseOnTouchDevicesAfterDelay
    ) {
      this.settings.autoCloseOnTouchDevicesAfterDelay = value.autoCloseOnTouchDevicesAfterDelay;
    }

    if (value.mobileTrigger !== undefined && value.mobileTrigger !== this.settings.mobileTrigger) {
      this.settings.mobileTrigger = value.mobileTrigger;
    }

    if (
      value.preventContextMenuOnTouchDevice !== undefined &&
      value.preventContextMenuOnTouchDevice !== this.settings.preventContextMenuOnTouchDevice
    ) {
      this.settings.preventContextMenuOnTouchDevice = value.preventContextMenuOnTouchDevice;
    }

    if (value.hoverOpenDelay !== undefined && value.hoverOpenDelay !== this.settings.hoverOpenDelay) {
      this.settings.hoverOpenDelay = value.hoverOpenDelay;
    }

    if (value.hoverCloseDelay !== undefined && value.hoverCloseDelay !== this.settings.hoverCloseDelay) {
      this.settings.hoverCloseDelay = value.hoverCloseDelay;
    }

    if (value.touchOpenDelay !== undefined && value.touchOpenDelay !== this.settings.touchOpenDelay) {
      this.settings.touchOpenDelay = value.touchOpenDelay;
    }

    if (value.touchCloseDelay !== undefined && value.touchCloseDelay !== this.settings.touchCloseDelay) {
      this.settings.touchCloseDelay = value.touchCloseDelay;
    }

    if (value.mountingPoint !== undefined && value.mountingPoint !== this.settings.mountingPoint) {
      this.settings.mountingPoint = value.mountingPoint;
    }

    if (value.disabled !== undefined && value.disabled !== this.disabled) {
      this.disabled = value.disabled;
    }
  }

  private position = this.settings.position;

  private parentWidth = this.settings.parentWidth;

  private offset = this.settings.defaultOffset;

  private flip = this.settings.flip;

  private shift = this.settings.shift;

  private contentClass = this.settings.contentClass;

  private disabled = this.settings.disabled;

  private componentRef: ComponentRef<TooltipComponent> | undefined; // Tooltip Component Reference

  private embeddedView: EmbeddedViewRef<any> | undefined; // Tooltip Content Template Reference

  private readonly _openAction$ = new Subject<number>();

  private readonly _closeAction$ = new Subject<number>();

  private readonly _visibleHandler$ = merge(
    this._openAction$.pipe(
      mergeMap(openDelay =>
        of(openDelay).pipe(
          delay(openDelay),
          // eslint-disable-next-line rxjs/no-unsafe-takeuntil
          takeUntil(this._closeAction$),
          tap(() => {
            this.create();
          })
        )
      ),
      repeat()
    ),
    this._closeAction$.pipe(
      mergeMap(closeDelay =>
        of(closeDelay).pipe(
          delay(closeDelay),
          // eslint-disable-next-line rxjs/no-unsafe-takeuntil
          takeUntil(this._openAction$),
          tap(() => this._detach())
        )
      ),
      repeat()
    )
  );

  public constructor(
    private readonly element: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly injector: Injector,
    private readonly resolver: ComponentFactoryResolver,
    private readonly applicationRef: ApplicationRef,
    private readonly cdRef: ChangeDetectorRef,
    @Self() @Inject('anglifyTooltipSettings') private readonly settings: EntireTooltipSettings
  ) {
    this._visibleHandler$.pipe(untilDestroyed(this)).subscribe();
  }

  public ngOnDestroy() {
    this._detach();
  }

  public open(delay = 0) {
    this._openAction$.next(delay);
  }

  public close(delay = 0) {
    this._closeAction$.next(delay);
  }

  public toggle(delay = 0) {
    if (this.componentRef) {
      this._closeAction$.next(delay);
    }

    this._openAction$.next(delay);
  }

  private _detach() {
    this.componentRef?.destroy();
    this.componentRef = undefined;
    this.embeddedView?.destroy();
    this.embeddedView = undefined;
  }

  @HostListener('mouseenter')
  protected onOpenEventDesktop() {
    if (this.disabled) return;
    if (isTouchDevice()) return;
    this.open(this.settings.hoverOpenDelay);
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('contextmenu', ['$event'])
  protected onOpenEventMobile(event: Event) {
    if (this.disabled) return;
    if (!isTouchDevice()) return;
    if (this.settings.mobileTrigger === 'long' && event.type === 'touchstart') return;
    if (this.settings.mobileTrigger === 'short' && event.type === 'contextmenu') return;
    if (this.settings.preventContextMenuOnTouchDevice || this.settings.autoCloseOnTouchDevicesAfterDelay) {
      event.preventDefault();
    }

    this.open(this.settings.touchOpenDelay);
  }

  @HostListener('touchend')
  protected autoCloseOnMobile() {
    if (!this.settings.autoCloseOnTouchDevicesAfterDelay) return;
    if (!isTouchDevice()) return;
    this.close(this.settings.touchCloseDelay);
  }

  @HostListener('document:click', ['$event', '$event.target'])
  @HostListener('document:contextmenu', ['$event', '$event.target'])
  public onClickOutside(_: MouseEvent, targetElement: HTMLElement) {
    if (this.disabled) return;
    if (!this.componentRef) return;
    if (!targetElement) return;
    const clickedInside = this.element.nativeElement.contains(targetElement);
    if (!clickedInside) this.close(0);
  }

  @HostListener('mouseleave')
  protected onCloseEvent() {
    this.close(isTouchDevice() ? this.settings.touchCloseDelay : this.settings.hoverCloseDelay);
  }

  private create() {
    if (this.componentRef) return;
    const factory = this.resolver.resolveComponentFactory(TooltipComponent);
    const injector = Injector.create({
      providers: [
        {
          provide: POSITION_SETTINGS,
          useValue: { host: typeof this.settings.mountingPoint === 'string' ? this.element.nativeElement : this.settings.mountingPoint },
        },
      ],
    });
    this.componentRef = this.viewContainerRef.createComponent(factory, 0, injector, this.generateNgContent());
    this.componentRef.instance.position = this.position;
    this.componentRef.instance.offset = this.offset;
    this.componentRef.instance.parentWidth = this.parentWidth;
    this.componentRef.instance.contentClass = this.contentClass;
    this.componentRef.instance.flip = this.flip;
    this.componentRef.instance.shift = this.shift;

    this.changeMountingPoint();
    this.cdRef.markForCheck();
  }

  private generateNgContent() {
    if (typeof this.content === 'string') {
      return [[this.renderer.createText(this.content)]];
    }

    if (this.content instanceof TemplateRef) {
      this.embeddedView = this.content.createEmbeddedView({});
      this.applicationRef.attachView(this.embeddedView);
      return [this.embeddedView.rootNodes];
    }

    return [[this.resolver.resolveComponentFactory(this.content).create(this.injector)]];
  }

  private changeMountingPoint() {
    if (!this.componentRef) return;
    if (this.settings.mountingPoint === 'parent') {
    } else if (this.settings.mountingPoint === 'body') {
      this.renderer.appendChild(document.body, this.componentRef.location.nativeElement);
    } else {
      this.renderer.appendChild(this.settings.mountingPoint, this.componentRef.location.nativeElement);
    }
  }
}
