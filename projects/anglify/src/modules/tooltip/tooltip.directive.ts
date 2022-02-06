import {
  ContentChild,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { merge, of, Subject } from 'rxjs';
import { delay, mergeMap, repeat, takeUntil, tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { isBooleanLikeTrue, isTouchDevice } from '../../utils/functions';
import { BooleanLike } from '../../utils/interfaces';
import { TooltipTouchTrigger } from './tooltip.interface';

export type Position = 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT';

@UntilDestroy()
@Directive({
  selector: '[anglifyTooltip]',
  exportAs: 'anglifyTooltip',
})
export class TooltipDirective implements OnDestroy {
  @ContentChild('tooltipContent') public template?: TemplateRef<any>;

  @Input('anglifyTooltip') public text?: string;
  @Input() public position: Position = 'BOTTOM';
  @Input('content-class') public contentClass?: string;
  @Input() public tooltipOpenDelay = 0;
  @Input() public tooltipCloseDelay = 0;
  @Input('tooltipMountingPoint') public mountingPoint: HTMLElement;

  /**
   * Prevents the context menu from opening when the host is long pressed.
   */
  @Input() public preventContextMenuOnTouchDevice: BooleanLike = false;

  /**
   * Allows you to define whether the tooltip is opened with a quick press or with a long press.
   */
  @Input() public tooltipMobileTrigger: TooltipTouchTrigger = 'long';

  private static readonly DEFAULT_OFFSET = 10;
  private readonly nativeElement: HTMLElement;
  private tooltip: HTMLElement | null = null;

  private readonly _openAction = new Subject<number>();
  private readonly _closeAction = new Subject<number>();

  private readonly _visibleHandler$ = merge(
    this._openAction.pipe(
      mergeMap(openDelay =>
        of(openDelay).pipe(
          delay(openDelay),
          takeUntil(this._closeAction),
          tap(() => {
            if (this.tooltip) return;
            this.tooltip = this.create();
            this.setPosition();
            this.renderer.addClass(this.tooltip, 'anglify-tooltip__open');
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
          tap(() => {
            if (!this.tooltip) return;
            this.renderer.removeClass(this.tooltip, 'anglify-tooltip__open');
            this.renderer.removeChild(this.nativeElement, this.tooltip);
            this.tooltip = null;
          })
        )
      ),
      repeat()
    )
  );

  public constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    this.nativeElement = this.elementRef.nativeElement;
    this.mountingPoint = this.nativeElement.parentElement ?? document.body;
    this._visibleHandler$.pipe(untilDestroyed(this)).subscribe();
  }

  public open(delay = 0): void {
    this._openAction.next(delay);
  }

  public close(delay = 0): void {
    this._closeAction.next(delay);
  }

  public toggle(delay = 0): void {
    this.tooltip ? this._closeAction.next(delay) : this._openAction.next(delay);
  }

  @HostListener('mouseenter')
  @HostListener('focus') // Open tooltip when host gets focused (with keyboard for example)
  private onOpenEventDesktop(): void {
    if (isTouchDevice()) return;
    this.open(this.tooltipOpenDelay);
  }

  @HostListener('mouseleave')
  @HostListener('blur') // Close tooltip when host gets blurred (with keyboard for example)
  private onCloseEventDesktop(): void {
    if (isTouchDevice()) return;
    this.close(this.tooltipCloseDelay);
  }

  @HostListener('click', ['$event'])
  @HostListener('contextmenu', ['$event'])
  private onOpenEventMobile(event: Event): void {
    if (this.tooltipMobileTrigger === 'long' && event.type !== 'contextmenu') return;
    if (this.tooltipMobileTrigger === 'short' && event.type !== 'click') return;

    if (isTouchDevice()) {
      if (isBooleanLikeTrue(this.preventContextMenuOnTouchDevice)) event.preventDefault();

      setTimeout(() => this.open(), 0); // Open tooltip after other context menus are closed
    }
  }

  @HostListener('document:click')
  @HostListener('document:contextmenu') // Close tooltip when other tooltips are opened
  private onCloseEventMobile(): void {
    if (isTouchDevice()) this.close();
  }

  private create(): HTMLSpanElement {
    const tooltip = this.renderer.createElement('span');
    if (this.template) {
      const view = this.viewContainerRef.createEmbeddedView(this.template);
      view.rootNodes.forEach(node => this.renderer.appendChild(tooltip, node));
    } else if (this.text) {
      this.renderer.appendChild(tooltip, this.renderer.createText(this.text));
    }
    this.renderer.appendChild(this.mountingPoint, tooltip);
    this.renderer.addClass(tooltip, 'anglify-tooltip');
    if (this.contentClass) this.renderer.addClass(tooltip, this.contentClass);

    return tooltip;
  }

  private setPosition(): void {
    if (!this.tooltip) return;
    const hostPos = this.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip.getBoundingClientRect();

    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top;
    let left;

    if (this.position === 'TOP') {
      top = hostPos.top - tooltipPos.height - TooltipDirective.DEFAULT_OFFSET;
      left = Math.max(hostPos.left + (hostPos.width - tooltipPos.width) / 2, TooltipDirective.DEFAULT_OFFSET);
    } else if (this.position === 'BOTTOM') {
      top = hostPos.bottom + TooltipDirective.DEFAULT_OFFSET;
      left = Math.max(hostPos.left + (hostPos.width - tooltipPos.width) / 2, TooltipDirective.DEFAULT_OFFSET);
    } else {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      if (this.position === 'LEFT') {
        left = Math.max(hostPos.left - tooltipPos.width - TooltipDirective.DEFAULT_OFFSET, TooltipDirective.DEFAULT_OFFSET);
      } else {
        left = Math.min(
          hostPos.right + TooltipDirective.DEFAULT_OFFSET,
          window.innerWidth - tooltipPos.width - TooltipDirective.DEFAULT_OFFSET
        );
      }
    }

    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }

  public ngOnDestroy(): void {
    this._closeAction.next(0);
  }
}
