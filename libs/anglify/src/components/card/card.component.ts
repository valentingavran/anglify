import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input, Self } from '@angular/core';
import { Elevation } from '../../composables/elevation/elevation.interface';
import { ELEVATION } from '../../composables/elevation/elevation.provider';
import { ElevationService } from '../../composables/elevation/elevation.service';
import { RIPPLE } from '../../composables/ripple/ripple.provider';
import { RippleService } from '../../composables/ripple/ripple.service';
import { createSettingsProvider } from '../../factories/settings.factory';
import { CARD_SETTINGS, DEFAULT_CARD_SETTINGS } from './card-settings.token';
import { EntireCardSettings } from './card.interface';

@Component({
  selector: 'anglify-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireCardSettings>('anglifyCardSettings', DEFAULT_CARD_SETTINGS, CARD_SETTINGS), ELEVATION, RIPPLE],
})
export class CardComponent implements EntireCardSettings {
  public get elevation() {
    return this.elevationService.elevation;
  }

  @Input() public set elevation(value: Elevation) {
    this.elevationService.elevation = value;
  }

  public get ripple() {
    return this.rippleService.active;
  }

  @Input() public set ripple(value: boolean) {
    this.rippleService.active = value;
  }

  @Input() @HostBinding('class.outlined') public outlined = this.settings.outlined;

  public constructor(
    @Self() @Inject('anglifyCardSettings') private readonly settings: EntireCardSettings,
    private readonly elevationService: ElevationService,
    private readonly rippleService: RippleService
  ) {
    this.elevation = this.settings.elevation;
    this.ripple = this.settings.ripple;
  }
}
