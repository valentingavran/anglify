import { Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core';

export type Position = 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT';

@Directive({
  selector: '[anglifyTooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input('anglifyTooltip') public text?: string;
  @Input() public position: Position = 'BOTTOM';

  private readonly nativeElement: HTMLElement;
  private tooltip: HTMLElement | null = null;

  public constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) {
    this.nativeElement = this.el.nativeElement;
  }

  @HostListener('mouseenter')
  private onMouseEnter(): void {
    this.show();
  }

  @HostListener('mouseleave')
  private onMouseLeave(): void {
    this.hide();
  }

  private show(): void {
    if (!this.text) return;
    this.tooltip = this.create(this.text, this.position);
    this.setPosition();
    this.renderer.addClass(this.tooltip, 'anglify-tooltip__show');
  }

  private hide(): void {
    if (!this.tooltip) return;
    this.renderer.removeClass(this.tooltip, 'anglify-tooltip__show');
    this.renderer.removeChild(document.body, this.tooltip);
    this.tooltip = null;
  }

  private create(text: string, position: Position): HTMLSpanElement {
    const tooltip = this.renderer.createElement('span');
    this.renderer.appendChild(tooltip, this.renderer.createText(text));
    this.renderer.appendChild(document.body, tooltip);
    this.renderer.addClass(tooltip, 'anglify-tooltip');
    this.renderer.addClass(tooltip, `anglify-tooltip__${position}`);
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
      top = hostPos.top - tooltipPos.height - 10;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    } else if (this.position === 'RIGHT') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + 10;
    } else if (this.position === 'BOTTOM') {
      top = hostPos.bottom + 10;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    } else {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.left - tooltipPos.width - 10;
    }

    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }

  public ngOnDestroy(): void {
    this.hide();
  }
}
