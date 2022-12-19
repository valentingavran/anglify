import { InjectionToken } from '@angular/core';
import type { EntireListItemGroupSettings } from './list-item-group.interface';

export const DEFAULT_LIST_ITEM_GROUP_SETTINGS: EntireListItemGroupSettings = {
  max: undefined,
  mandatory: false,
  multiple: false,
};

export const LIST_ITEM_GROUP_SETTINGS = new InjectionToken<EntireListItemGroupSettings>('List Item Group Settings');
