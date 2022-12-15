import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input, Self } from '@angular/core';
import { createSettingsProvider } from '../../../factories/settings.factory';
import { DEFAULT_LIST_ITEM_DESCRIPTION_SETTINGS, LIST_ITEM_DESCRIPTION_SETTINGS } from './list-item-description-settings.token';
import { EntireListItemDescriptionSettings } from './list-item-description.interface';

@Component({
  selector: 'anglify-list-item-description',
  standalone: true,
  templateUrl: './list-item-description.component.html',
  styleUrls: ['./list-item-description.component.scss'],
  providers: [
    createSettingsProvider<EntireListItemDescriptionSettings>(
      'anglifyListItemDescriptionSettings',
      DEFAULT_LIST_ITEM_DESCRIPTION_SETTINGS,
      LIST_ITEM_DESCRIPTION_SETTINGS
    ),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemDescriptionComponent implements EntireListItemDescriptionSettings {
  @Input() @HostBinding('style.-webkit-line-clamp') public lineClamp = this.settings.lineClamp;

  public constructor(@Self() @Inject('anglifyListItemDescriptionSettings') private readonly settings: EntireListItemDescriptionSettings) {}
}
