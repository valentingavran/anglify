import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TooltipPosition } from '../../tooltip.interface';
import { observeOnResize } from '../../../../utils/functions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent, merge } from 'rxjs';
import { DEFAULT_TOOLTIP_SETTINGS } from '../../tooltip-settings.token';

@UntilDestroy()
@Component({
  selector: 'anglify-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TooltipComponent implements OnInit {
  @Input() public position: TooltipPosition = DEFAULT_TOOLTIP_SETTINGS.position;
  @Input() public offset = DEFAULT_TOOLTIP_SETTINGS.defaultOffset;

  @HostBinding('class')
  @Input()
  public contentClass?: string;

  public constructor(@Inject('tooltipConfig') private readonly config: any, private readonly element: ElementRef) {
    this.element.nativeElement.classList.add('anglify-tooltip');

    merge(observeOnResize(this.element.nativeElement as HTMLElement), fromEvent(window, 'scroll', { capture: true }))
      .pipe(untilDestroyed(this))
      .subscribe(() => this.updatePosition()); // Used to center dynamic content inside tooltip
  }

  public ngOnInit(): void {
    this.updatePosition();
  }

  private updatePosition(): TooltipComponent {
    const hostPos = this.config.host.getBoundingClientRect();
    const tooltipPos = this.element.nativeElement.getBoundingClientRect();

    let top;
    let left;

    if (this.position === 'top') {
      top = hostPos.top - tooltipPos.height - this.offset;
      left = Math.max(Number(hostPos.left) + (hostPos.width - tooltipPos.width) / 2, this.offset);
    } else if (this.position === 'bottom') {
      top = Number(hostPos.bottom) + this.offset;
      left = Math.max(Number(hostPos.left) + (hostPos.width - tooltipPos.width) / 2, this.offset);
    } else {
      top = Number(hostPos.top) + (hostPos.height - tooltipPos.height) / 2;
      if (this.position === 'left') {
        left = Math.max(hostPos.left - tooltipPos.width - this.offset, this.offset);
      } else {
        left = Math.min(Number(hostPos.right) + this.offset, window.innerWidth - tooltipPos.width - this.offset);
      }
    }

    this.element.nativeElement.style.top = `${top}px`;
    this.element.nativeElement.style.left = `${left}px`;

    return this;
  }
}
