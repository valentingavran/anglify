import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import type { Elevation } from '../../../../composables/elevation/elevation';
import { ELEVATION } from '../../../../composables/elevation/elevation.provider';
import { ElevationService } from '../../../../composables/elevation/elevation.service';
import type { Position } from '../../../../composables/position/position.interface';
import { POSITION } from '../../../../composables/position/position.provider';
import { PositionService } from '../../../../composables/position/position.service';

@UntilDestroy()
@Component({
  selector: 'anglify-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ELEVATION, POSITION],
})
export class MenuComponent {
  @Input()
  public set offset(value: number) {
    this._positionService.offset = value;
  }

  @Input()
  public set position(value: Position) {
    this._positionService.position = value;
  }

  @Input()
  public set elevation(value: Elevation) {
    this._elevationService.elevation = value;
  }

  public constructor(private readonly _elevationService: ElevationService, private readonly _positionService: PositionService) {}
}
