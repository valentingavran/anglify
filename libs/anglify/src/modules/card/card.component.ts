import { ChangeDetectionStrategy, Component, Inject, Input, Self } from '@angular/core';
import { CARD_SETTINGS, DEFAULT_CARD_SETTINGS } from './card-settings.token';
import type { CardSettings } from './card.interface';
import type { Elevation } from '../../composables/elevation/elevation';
import { ELEVATION } from '../../composables/elevation/elevation.provider';
import { ElevationService } from '../../composables/elevation/elevation.service';
import { RIPPLE } from '../../composables/ripple/ripple.provider';
import { RippleService } from '../../composables/ripple/ripple.service';
import { createSettingsProvider } from '../../factories/settings.factory';
import { toBoolean } from '../../utils/functions';
import { BooleanLike } from '../../utils/interfaces';

@Component({
  selector: 'anglify-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<CardSettings>('anglifyCardSettings', DEFAULT_CARD_SETTINGS, CARD_SETTINGS), ELEVATION, RIPPLE],
})
export class CardComponent {
  @Input()
  public set elevation(value: Elevation) {
    this.elevationService.elevation = value;
  }

  public get elevation() {
    return this.elevationService.elevation;
  }

  @Input()
  public set ripple(value: BooleanLike) {
    this.rippleService.active = toBoolean(value);
  }

  public get ripple() {
    return this.rippleService.active;
  }

  public constructor(
    @Self() @Inject('anglifyCardSettings') public settings: Required<CardSettings>,
    private readonly elevationService: ElevationService,
    private readonly rippleService: RippleService
  ) {
    this.elevation = this.settings.elevation;
    this.ripple = this.settings.ripple;
  }
}
