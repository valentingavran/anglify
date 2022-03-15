import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Position } from '../../../../composables/position/position.interface';
import { MENUABLE } from '../../../../composables/position/position.provider';
import { PositionService } from '../../../../composables/position/position.service';

@UntilDestroy()
@Component({
  selector: 'anglify-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [MENUABLE],
})
export class TooltipComponent {
  @Input()
  public set position(value: Position) {
    this.positionService.position = value;
  }

  @Input()
  public set offset(value: number) {
    this.positionService.offset = value;
  }

  @HostBinding('class')
  @Input()
  public contentClass?: string;

  public constructor(private readonly positionService: PositionService, private readonly element: ElementRef) {
    this.element.nativeElement.classList.add('anglify-tooltip');
  }
}
