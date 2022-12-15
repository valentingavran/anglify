import { InjectionToken } from '@angular/core';
import type { EntireListGroupSettings } from './list-group.interface';

export const DEFAULT_LIST_GROUP_SETTINGS: EntireListGroupSettings = {
  disableGroupCollapse: false,
  active: false,
};

export const LIST_GROUP_SETTINGS = new InjectionToken<EntireListGroupSettings>('List Group Settings');
