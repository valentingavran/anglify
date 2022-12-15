import { InjectionToken } from '@angular/core';
import type { EntireListItemDescriptionSettings } from './list-item-description.interface';

export const DEFAULT_LIST_ITEM_DESCRIPTION_SETTINGS: EntireListItemDescriptionSettings = {
  lineClamp: 1,
};

export const LIST_ITEM_DESCRIPTION_SETTINGS = new InjectionToken<EntireListItemDescriptionSettings>('List Item Description Settings');
