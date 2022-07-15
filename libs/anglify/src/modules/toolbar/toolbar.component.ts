import { ChangeDetectionStrategy, Component, ContentChildren, Inject, Input, QueryList, Self } from '@angular/core';
import { DEFAULT_TOOLBAR_SETTINGS, TOOLBAR_SETTINGS } from './toolbar-settings.token';
import { EntireToolbarSettings } from './toolbar.interface';
import { Elevation } from '../../composables/elevation/elevation.interface';
import { ELEVATION } from '../../composables/elevation/elevation.provider';
import { ElevationService } from '../../composables/elevation/elevation.service';
import { createSettingsProvider } from '../../factories/settings.factory';
import { SlotDirective } from '../common/directives/slot/slot.directive';

@Component({
  selector: 'anglify-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    createSettingsProvider<EntireToolbarSettings>('anglifyToolbarSettings', DEFAULT_TOOLBAR_SETTINGS, TOOLBAR_SETTINGS),
    ELEVATION,
  ],
})
export class ToolbarComponent {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  @Input() public prominent = this.settings.prominent;
  @Input() public collapse = this.settings.collapse;

  @Input()
  public set elevation(value: Elevation) {
    this.elevationService.elevation = value;
  }

  public get elevation() {
    return this.elevationService.elevation;
  }

  public constructor(
    @Self() @Inject('anglifyToolbarSettings') public settings: EntireToolbarSettings,
    private readonly elevationService: ElevationService
  ) {
    this.elevation = this.settings.elevation;
  }
}
