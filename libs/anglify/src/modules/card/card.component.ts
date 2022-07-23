import { ChangeDetectionStrategy, Component, Inject, Input, Self } from '@angular/core';
import { CARD_SETTINGS, DEFAULT_CARD_SETTINGS } from './card-settings.token';
import { EntireCardSettings } from './card.interface';
import type { Elevation } from '../../composables/elevation/elevation.interface';
import { ELEVATION } from '../../composables/elevation/elevation.provider';
import { ElevationService } from '../../composables/elevation/elevation.service';
import { RIPPLE } from '../../composables/ripple/ripple.provider';
import { RippleService } from '../../composables/ripple/ripple.service';
import { createSettingsProvider } from '../../factories/settings.factory';

@Component({
  selector: 'anglify-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireCardSettings>('anglifyCardSettings', DEFAULT_CARD_SETTINGS, CARD_SETTINGS), ELEVATION, RIPPLE],
})
export class CardComponent {
  /** Designates an elevation applied to the component between 0 and 24. You can find more
   * information on the elevation page. */
  @Input() public set elevation(value: Elevation) {
    this.elevationService.elevation = value;
  }

  public get elevation() {
    return this.elevationService.elevation;
  }

  /** Turns the ripple effect on or off. */
  @Input() public set ripple(value: boolean) {
    this.rippleService.active = value;
  }

  public get ripple() {
    return this.rippleService.active;
  }

  public constructor(
    @Self() @Inject('anglifyCardSettings') public settings: EntireCardSettings,
    private readonly elevationService: ElevationService,
    private readonly rippleService: RippleService
  ) {
    this.elevation = this.settings.elevation;
    this.ripple = this.settings.ripple;
  }
}
