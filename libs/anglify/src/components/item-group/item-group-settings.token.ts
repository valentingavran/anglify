import { InjectionToken } from '@angular/core';
import type { EntireItemGroupSettings } from './item-group.interface';

export const DEFAULT_ITEM_GROUP_SETTINGS: EntireItemGroupSettings = {
  mandatory: false,
  max: undefined,
  multiple: false,
};

export const ITEM_GROUP_SETTINGS = new InjectionToken<EntireItemGroupSettings>('Item Group Settings');
