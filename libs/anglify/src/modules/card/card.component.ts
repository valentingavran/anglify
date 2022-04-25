import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { CARD_SETTINGS, DEFAULT_CARD_SETTINGS } from './card-settings.token';
import type { CardSettings } from './card.interface';
import type { Elevation } from '../../composables/elevation/elevation';
import { ELEVATION } from '../../composables/elevation/elevation.provider';
import { ElevationService } from '../../composables/elevation/elevation.service';
import { RIPPLE } from '../../composables/ripple/ripple.provider';
import { RippleService } from '../../composables/ripple/ripple.service';
import { createSettingsProvider, SETTINGS } from '../../factories/settings.factory';
import { toBoolean } from '../../utils/functions';
import { BooleanLike } from '../../utils/interfaces';

@Component({
  selector: 'anglify-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<CardSettings>(DEFAULT_CARD_SETTINGS, CARD_SETTINGS), ELEVATION, RIPPLE],
})
export class CardComponent {
  @Input()
  public set elevation(value: Elevation) {
    this._elevationService.elevation = value;
  }

  @Input()
  public set ripple(value: BooleanLike) {
    this.rippleService.active = toBoolean(value);
  }

  public constructor(
    @Inject(SETTINGS) public settings: Required<CardSettings>,
    private readonly _elevationService: ElevationService,
    private readonly rippleService: RippleService
  ) {
    this.elevation = this.settings.elevation;
    this.ripple = this.settings.ripple;
  }
}
