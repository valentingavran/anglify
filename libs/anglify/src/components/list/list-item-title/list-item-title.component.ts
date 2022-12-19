import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input, Self } from '@angular/core';
import { createSettingsProvider } from '../../../factories/settings.factory';
import { DEFAULT_LIST_ITEM_TITLE_SETTINGS, LIST_ITEM_TITLE_SETTINGS } from './list-item-title-settings.token';
import { EntireListItemTitleSettings } from './list-item-title.interface';

@Component({
  selector: 'anglify-list-item-title',
  standalone: true,
  templateUrl: './list-item-title.component.html',
  styleUrls: ['./list-item-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    createSettingsProvider<EntireListItemTitleSettings>(
      'anglifyListItemTitleSettings',
      DEFAULT_LIST_ITEM_TITLE_SETTINGS,
      LIST_ITEM_TITLE_SETTINGS
    ),
  ],
})
export class ListItemTitleComponent implements EntireListItemTitleSettings {
  @Input() @HostBinding('style.-webkit-line-clamp') public lineClamp = this.settings.lineClamp;

  public constructor(@Self() @Inject('anglifyListItemTitleSettings') private readonly settings: EntireListItemTitleSettings) {}
}
