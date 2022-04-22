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
import { merge, of, Subject } from 'rxjs';
import { delay, mergeMap, repeat, takeUntil, tap } from 'rxjs/operators';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { DEFAULT_TOOLTIP_SETTINGS, TOOLTIP_SETTINGS } from './tooltip-settings.token';
import type { TooltipSettings, TooltipTouchTrigger } from './tooltip.interface';
import type { Position } from '../../composables/position/position.interface';
import { POSITION_SETTINGS } from '../../composables/position/position.token';
import { createSettingsProvider, SETTINGS } from '../../factories/settings.factory';
import { toBoolean, isTouchDevice } from '../../utils/functions';
import type { BooleanLike } from '../../utils/interfaces';

@UntilDestroy()
@Directive({
  selector: '[anglifyTooltip]',
  exportAs: 'anglifyTooltip',
  providers: [createSettingsProvider<TooltipSettings>(DEFAULT_TOOLTIP_SETTINGS, TOOLTIP_SETTINGS)],
})
export class TooltipDirective implements OnDestroy {
  @Input('anglifyTooltip') public content!: string | TemplateRef<any> | Type<any>;
  @Input('tooltipMountingPoint') public mountingPoint: 'body' | 'parent' | HTMLElement = 'parent';
  @Input('tooltipHoverOpenDelay') public hoverOpenDelay = this.settings.hoverOpenDelay;
  @Input('tooltipHoverCloseDelay') public hoverCloseDelay = this.settings.hoverCloseDelay;
  @Input('tooltipTouchOpenDelay') public touchOpenDelay = this.settings.touchOpenDelay;
  @Input('tooltipTouchCloseDelay') public touchCloseDelay = this.settings.touchCloseDelay;
  /** Prevents the context menu from opening when the host is long pressed. */
  @Input() public preventContextMenuOnTouchDevice: BooleanLike = this.settings.preventContextMenuOnTouchDevice;
  /** Allows you to define whether the tooltip is opened with a quick press or with a long press. */
  @Input() public tooltipMobileTrigger: TooltipTouchTrigger = this.settings.mobileTrigger;
  @Input() public autoCloseOnTouchDevicesAfterDelay: BooleanLike = this.settings.autoCloseOnTouchDevicesAfterDelay;

  /** Distance between the tooltip and the host element */
  @Input()
  public set offset(value: number) {
    this._offset = value;
    if (this.componentRef) {
      this.componentRef.instance.offset = value;
    }
  }

  public get offset(): number {
    return this._offset;
  }

  @Input()
  public set position(value: Position) {
    this._position = value;
    if (this.componentRef) {
      this.componentRef.instance.position = value;
    }
  }

  public get position(): Position {
    return this._position;
  }

  @Input()
  public set contentClass(value: string | undefined) {
    this._contentClass = value;
    if (this.componentRef) {
      this.componentRef.instance.contentClass = value;
    }
  }

  public get contentClass(): string | undefined {
    return this._contentClass;
  }

  private _position: Position = DEFAULT_TOOLTIP_SETTINGS.position;
  private _offset = DEFAULT_TOOLTIP_SETTINGS.defaultOffset;
  private _contentClass?: string | undefined;

  private componentRef: ComponentRef<TooltipComponent> | undefined; // Tooltip Component Reference
  private embeddedView: EmbeddedViewRef<any> | undefined; // Tooltip Content Template Reference

  private readonly _openAction = new Subject<number>();
  private readonly _closeAction = new Subject<number>();
  private readonly _visibleHandler$ = merge(
    this._openAction.pipe(
      mergeMap(openDelay =>
        of(openDelay).pipe(
          delay(openDelay),
          takeUntil(this._closeAction),
          tap(() => {
            this.create();
          })
        )
      ),
      repeat()
    ),
    this._closeAction.pipe(
      mergeMap(closeDelay =>
        of(closeDelay).pipe(
          delay(closeDelay),
          takeUntil(this._openAction),
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
    @Self() @Inject(SETTINGS) private readonly settings: Required<TooltipSettings>
  ) {
    this._visibleHandler$.pipe(untilDestroyed(this)).subscribe();
  }

  public ngOnDestroy() {
    this._detach();
  }

  public open(delay = 0) {
    this._openAction.next(delay);
  }

  public close(delay = 0) {
    this._closeAction.next(delay);
  }

  public toggle(delay = 0) {
    this.componentRef ? this._closeAction.next(delay) : this._openAction.next(delay);
  }

  private _detach() {
    this.componentRef?.destroy();
    this.componentRef = undefined;
    this.embeddedView?.destroy();
    this.embeddedView = undefined;
  }

  @HostListener('mouseenter')
  protected onOpenEventDesktop() {
    if (isTouchDevice()) return;
    this.open(this.hoverOpenDelay);
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('contextmenu', ['$event'])
  protected onOpenEventMobile(event: Event) {
    if (!isTouchDevice()) return;
    if (this.tooltipMobileTrigger === 'long' && event.type === 'touchstart') return;
    if (this.tooltipMobileTrigger === 'short' && event.type === 'contextmenu') return;
    if (toBoolean(this.preventContextMenuOnTouchDevice) || toBoolean(this.autoCloseOnTouchDevicesAfterDelay)) {
      event.preventDefault();
    }
    this.open(this.touchOpenDelay);
  }

  @HostListener('touchend')
  protected autoCloseOnMobile() {
    if (!toBoolean(this.autoCloseOnTouchDevicesAfterDelay)) return;
    if (!isTouchDevice()) return;
    this.close(this.touchCloseDelay);
  }

  @HostListener('document:click', ['$event', '$event.target'])
  @HostListener('document:contextmenu', ['$event', '$event.target'])
  public onClickOutside(_: MouseEvent, targetElement: HTMLElement) {
    if (!this.componentRef) return;
    if (!Boolean(targetElement)) return;
    const clickedInside = this.element.nativeElement.contains(targetElement);
    if (!clickedInside) this.close(0);
  }

  @HostListener('mouseleave')
  protected onCloseEvent() {
    this.close(isTouchDevice() ? this.touchCloseDelay : this.hoverCloseDelay);
  }

  private create() {
    if (this.componentRef) return;
    const factory = this.resolver.resolveComponentFactory(TooltipComponent);
    const injector = Injector.create({
      providers: [{ provide: POSITION_SETTINGS, useValue: { host: this.element.nativeElement } }],
    });
    this.componentRef = this.viewContainerRef.createComponent(factory, 0, injector, this.generateNgContent());
    this.componentRef.instance.position = this.position;
    this.componentRef.instance.offset = this.offset;
    this.componentRef.instance.contentClass = this.contentClass;

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
    if (this.mountingPoint === 'parent') {
    } else if (this.mountingPoint === 'body') {
      this.renderer.appendChild(document.body, this.componentRef.location.nativeElement);
    } else {
      this.renderer.appendChild(this.mountingPoint, this.componentRef.location.nativeElement);
    }
  }
}
