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
  Optional,
  Renderer2,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { merge, of, Subject } from 'rxjs';
import { delay, mergeMap, repeat, takeUntil, tap } from 'rxjs/operators';
import { isBooleanLikeTrue, isTouchDevice } from '../../utils/functions';
import { BooleanLike } from '../../utils/interfaces';
import { DEFAULT_TOOLTIP_SETTINGS, TOOLTIP_SETTINGS } from './tooltip-settings.token';
import { TooltipSettings, TooltipTouchTrigger } from './tooltip.interface';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { Position } from '../../composables/position/position.interface';
import { POSITION_SETTINGS } from '../../composables/position/position.token';

@UntilDestroy()
@Directive({
  selector: '[anglifyTooltip]',
  exportAs: 'anglifyTooltip',
})
export class TooltipDirective implements OnDestroy {
  @Input('anglifyTooltip') public content!: string | TemplateRef<any> | Type<any>;
  @Input('tooltipMountingPoint') public mountingPoint: 'body' | 'parent' | HTMLElement = 'parent';
  @Input('tooltipHoverOpenDelay') public hoverOpenDelay;
  @Input('tooltipHoverCloseDelay') public hoverCloseDelay;
  @Input('tooltipTouchOpenDelay') public touchOpenDelay;
  @Input('tooltipTouchCloseDelay') public touchCloseDelay;
  /** Prevents the context menu from opening when the host is long pressed. */
  @Input() public preventContextMenuOnTouchDevice: BooleanLike;
  /** Allows you to define whether the tooltip is opened with a quick press or with a long press. */
  @Input() public tooltipMobileTrigger: TooltipTouchTrigger;
  @Input() public autoCloseOnTouchDevicesAfterDelay: BooleanLike;

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
  private _contentClass?: string;

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
    private readonly element: ElementRef,
    private readonly renderer: Renderer2,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly injector: Injector,
    private readonly resolver: ComponentFactoryResolver,
    private readonly applicationRef: ApplicationRef,
    private readonly cdRef: ChangeDetectorRef,
    @Optional() @Inject(TOOLTIP_SETTINGS) private readonly settings?: Required<TooltipSettings>
  ) {
    const mergedSettings: Required<TooltipSettings> = Object.assign({}, DEFAULT_TOOLTIP_SETTINGS, this.settings);
    this.position = mergedSettings.position;
    this.hoverOpenDelay = mergedSettings.hoverOpenDelay;
    this.hoverCloseDelay = mergedSettings.hoverCloseDelay;
    this.touchOpenDelay = mergedSettings.touchOpenDelay;
    this.touchCloseDelay = mergedSettings.touchCloseDelay;
    this.preventContextMenuOnTouchDevice = mergedSettings.preventContextMenuOnTouchDevice;
    this.tooltipMobileTrigger = mergedSettings.mobileTrigger;
    this.offset = mergedSettings.defaultOffset;
    this.autoCloseOnTouchDevicesAfterDelay = mergedSettings.autoCloseOnTouchDevicesAfterDelay;

    this._visibleHandler$.pipe(untilDestroyed(this)).subscribe();
  }

  public ngOnDestroy(): void {
    this._detach();
  }

  public open(delay = 0): void {
    this._openAction.next(delay);
  }

  public close(delay = 0): void {
    this._closeAction.next(delay);
  }

  public toggle(delay = 0): void {
    this.componentRef ? this._closeAction.next(delay) : this._openAction.next(delay);
  }

  private _detach(): void {
    this.componentRef?.destroy();
    this.componentRef = undefined;
    this.embeddedView?.destroy();
    this.embeddedView = undefined;
  }

  @HostListener('mouseenter')
  private onOpenEventDesktop(): void {
    if (isTouchDevice()) return;
    this.open(this.hoverOpenDelay);
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('contextmenu', ['$event'])
  private onOpenEventMobile(event: Event): void {
    if (!isTouchDevice()) return;
    if (this.tooltipMobileTrigger === 'long' && event.type === 'touchstart') return;
    if (this.tooltipMobileTrigger === 'short' && event.type === 'contextmenu') return;
    if (isBooleanLikeTrue(this.preventContextMenuOnTouchDevice) || isBooleanLikeTrue(this.autoCloseOnTouchDevicesAfterDelay)) {
      event.preventDefault();
    }
    this.open(this.touchOpenDelay);
  }

  @HostListener('touchend')
  private autoCloseOnMobile(): void {
    if (!isBooleanLikeTrue(this.autoCloseOnTouchDevicesAfterDelay)) return;
    if (!isTouchDevice()) return;
    this.close(this.touchCloseDelay);
  }

  @HostListener('document:click', ['$event', '$event.target'])
  @HostListener('document:contextmenu', ['$event', '$event.target'])
  public onClickOutside(event: MouseEvent, targetElement: HTMLElement): void {
    if (!this.componentRef) return;
    if (!Boolean(targetElement)) return;
    const clickedInside = this.element.nativeElement.contains(targetElement);
    if (!clickedInside) this.close(0);
  }

  @HostListener('mouseleave')
  private onCloseEvent(): void {
    this.close(isTouchDevice() ? this.touchCloseDelay : this.hoverCloseDelay);
  }

  private create(): void {
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

  private generateNgContent(): any[][] {
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

  private changeMountingPoint(): void {
    if (!this.componentRef) return;
    if (this.mountingPoint === 'parent') {
    } else if (this.mountingPoint === 'body') {
      this.renderer.appendChild(document.body, this.componentRef.location.nativeElement);
    } else {
      this.renderer.appendChild(this.mountingPoint, this.componentRef.location.nativeElement);
    }
  }
}
