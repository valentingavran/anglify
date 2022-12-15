import { InjectionToken } from '@angular/core';
import type { EntireTabGroupSettings } from './tab-group.interface';

export const DEFAULT_TAB_GROUP_SETTINGS: EntireTabGroupSettings = {};
export const TAB_GROUP_SETTINGS = new InjectionToken<EntireTabGroupSettings>('Tab Group Settings');
