import { ChangeDetectionStrategy, Component, ContentChildren, Inject, Input, QueryList, Self } from '@angular/core';
import { DEFAULT_TOOLBAR_SETTINGS, TOOLBAR_SETTINGS } from './toolbar-settings.token';
import { EntireToolbarSettings } from './toolbar.interface';
import { createSettingsProvider } from '../../factories/settings.factory';
import { BooleanLike } from '../../utils/interfaces';
import { SlotDirective } from '../common/directives/slot/slot.directive';

@Component({
  selector: 'anglify-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireToolbarSettings>('anglifyToolbarSettings', DEFAULT_TOOLBAR_SETTINGS, TOOLBAR_SETTINGS)],
})
export class ToolbarComponent {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  @Input() public prominent: BooleanLike = this.settings.prominent;
  @Input() public collapse: BooleanLike = this.settings.collapse;

  public constructor(@Self() @Inject('anglifyToolbarSettings') public settings: EntireToolbarSettings) {}
}
