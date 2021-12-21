import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

export type Position = "TOP" | "RIGHT" | "BOTTOM" | "LEFT";

@Directive({
  selector: '[anglifyTooltip]'
})
export class TooltipDirective {
  @Input("anglifyTooltip") public text ?: string;
  @Input() position: Position = "BOTTOM";
  private tooltip: HTMLElement | null = null;

  public constructor(private readonly el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter')
  private onMouseEnter(): void {
    this.show();

  }

  @HostListener('mouseleave')
  private onMouseLeave(): void {
    this.hide();
  }


  show() {
    if (!this.text) return;
    this.tooltip = this.create(this.text, this.position);
    this.setPosition();
    this.renderer.addClass(this.tooltip, 'anglify-tooltip__show');
  }

  hide() {
    this.renderer.removeClass(this.tooltip, 'anglify-tooltip__show');
    this.renderer.removeChild(document.body, this.tooltip);
    this.tooltip = null;
  }

  private create(text: string, position: Position) {
    const tooltip = this.renderer.createElement('span');
    this.renderer.appendChild(tooltip, this.renderer.createText(text));
    this.renderer.appendChild(document.body, tooltip);
    this.renderer.addClass(tooltip, 'anglify-tooltip');
    this.renderer.addClass(tooltip, `anglify-tooltip__${position}`);
    return tooltip;
  }

  private setPosition() {
    if (!this.tooltip) return;
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip?.getBoundingClientRect();

    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top, left;

    if (this.position === 'TOP') {
      top = hostPos.top - tooltipPos.height - 10;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    } else if (this.position === 'RIGHT') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + 10;
    } else if (this.position === 'BOTTOM') {
      top = hostPos.bottom + 10;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    } else if (this.position === 'LEFT') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.left - tooltipPos.width - 10;
    }

    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }

}
