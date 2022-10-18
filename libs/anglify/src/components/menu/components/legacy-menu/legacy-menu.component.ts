import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Elevation } from '../../../../composables/elevation/elevation.interface';
import { ELEVATION } from '../../../../composables/elevation/elevation.provider';
import { ElevationService } from '../../../../composables/elevation/elevation.service';
import { Position } from '../../../../composables/position/position.interface';
import { POSITION } from '../../../../composables/position/position.provider';
import { PositionService } from '../../../../composables/position/position.service';

@Component({
  selector: 'anglify-legacy-menu',
  standalone: true,
  templateUrl: './legacy-menu.component.html',
  styleUrls: ['./legacy-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ELEVATION, POSITION],
})
export class LegacyMenuComponent {
  /**
   * Whether the menu should have the same width as the host component.
   */
  @Input() public set parentWidth(value: boolean) {
    this._positionService.parentWidth = value;
  }

  /**
   *  Displaces the floating element from its core placement along the specified axes.
   */
  @Input() public set offset(value: number) {
    this._positionService.offset = value;
  }

  /**
   * The position at which the menu should be opened.
   */
  @Input() public set position(value: Position) {
    this._positionService.position = value;
  }

  /**
   * Automatically determines the best position for the menu. If possible the preset position is used.
   */
  @Input() public set flip(value: boolean) {
    this._positionService.flip = value;
  }

  /**
   * Designates an elevation applied to the component between 0 and 24. You can find more information on the elevation page.
   */
  @Input() public set elevation(value: Elevation) {
    this._elevationService.elevation = value;
  }

  public constructor(private readonly _elevationService: ElevationService, private readonly _positionService: PositionService) {}
}
