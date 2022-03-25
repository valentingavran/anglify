import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { Elevation } from '../../composables/elevation/elevation';
import { CardSettings } from './card.interface';
import { createSettingsProvider, SETTINGS } from '../../factories/settings.factory';
import { CARD_SETTINGS, DEFAULT_CARD_SETTINGS } from './card-settings.token';
import { ELEVATION } from '../../composables/elevation/elevation.provider';
import { ElevationService } from '../../composables/elevation/elevation.service';

@Component({
  selector: 'anglify-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<CardSettings>(DEFAULT_CARD_SETTINGS, CARD_SETTINGS), ELEVATION],
})
export class CardComponent {
  @Input()
  public set elevation(value: Elevation) {
    this._elevationService.elevation = value;
  }

  public constructor(@Inject(SETTINGS) public settings: Required<CardSettings>, private readonly _elevationService: ElevationService) {
    this.elevation = this.settings.elevation;
  }
}
