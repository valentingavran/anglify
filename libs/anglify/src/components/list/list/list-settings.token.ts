import { InjectionToken } from '@angular/core';
import type { EntireListSettings } from './list.interface';

export const DEFAULT_LIST_SETTINGS: EntireListSettings = {
  dense: false,
  nav: false,
};

export const LIST_SETTINGS = new InjectionToken<EntireListSettings>('List Settings');
