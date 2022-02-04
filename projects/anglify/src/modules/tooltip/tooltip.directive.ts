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

export type Position = 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT';

@UntilDestroy()
@Directive({
  selector: '[anglifyTooltip]',
})
export class TooltipDirective implements OnDestroy {
  @ContentChild('tooltipContent') public template?: TemplateRef<any>;

  @Input('anglifyTooltip') public text?: string;
  @Input() public position: Position = 'BOTTOM';
  @Input('content-class') public contentClass?: string;
  @Input() public tooltipOpenDelay = 1000;
  @Input() public tooltipCloseDelay = 0;

  private static readonly DEFAULT_OFFSET = 10;
  private readonly nativeElement: HTMLElement;
  private tooltip: HTMLElement | null = null;

  private readonly _showAction = new Subject();
  private readonly _hideAction = new Subject();

  private readonly _visibleHandler$ = merge(
    this._showAction.pipe(
      mergeMap(event =>
        of(event).pipe(
          delay(this.tooltipOpenDelay),
          takeUntil(this._hideAction),
          tap(() => {
            if (this.tooltip) return;
            this.tooltip = this.create();
            this.setPosition();
            this.renderer.addClass(this.tooltip, 'anglify-tooltip__show');
          })
        )
      ),
      repeat()
    ),
    this._hideAction.pipe(
      mergeMap(event =>
        of(event).pipe(
          delay(this.tooltipCloseDelay),
          takeUntil(this._showAction),
          tap(() => {
            if (!this.tooltip) return;
            this.renderer.removeClass(this.tooltip, 'anglify-tooltip__show');
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
    this._visibleHandler$.pipe(untilDestroyed(this)).subscribe();
  }

  @HostListener('mouseenter')
  private onMouseEnter(): void {
    this._showAction.next();
  }

  @HostListener('mouseleave')
  private onMouseLeave(): void {
    this._hideAction.next();
  }

  private create(): HTMLSpanElement {
    const tooltip = this.renderer.createElement('span');
    if (this.template) {
      const view = this.viewContainerRef.createEmbeddedView(this.template);
      view.rootNodes.forEach(node => this.renderer.appendChild(tooltip, node));
    } else if (this.text) {
      this.renderer.appendChild(tooltip, this.renderer.createText(this.text));
    }
    this.renderer.appendChild(document.body, tooltip);

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
    this._hideAction.next();
  }
}
