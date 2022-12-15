import { InjectionToken } from '@angular/core';
import type { EntireListItemTitleSettings } from './list-item-title.interface';

export const DEFAULT_LIST_ITEM_TITLE_SETTINGS: EntireListItemTitleSettings = {
  lineClamp: 1,
};

export const LIST_ITEM_TITLE_SETTINGS = new InjectionToken<EntireListItemTitleSettings>('List Item Title Settings');
