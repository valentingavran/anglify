import { ChangeDetectionStrategy, Component, ContentChildren, HostBinding, Inject, Input, QueryList, Self } from '@angular/core';
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

  /** Increases the height of the toolbar. */
  @Input() @HostBinding('class.prominent') public prominent: boolean = this.settings.prominent;

  /** Puts the toolbar into a collapsed state reducing its maximum width. */
  @Input() @HostBinding('class.collapse') public collapse: boolean = this.settings.collapse;

  /** Designates an elevation applied to the component between 0 and 24. You can find more
   * information on the elevation page. */
  @Input() public set elevation(value: Elevation) {
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
