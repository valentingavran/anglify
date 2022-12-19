import { InjectionToken } from '@angular/core';
import type { EntireTabSettings, TabSettings } from './tab.interface';

export const DEFAULT_TAB_SETTINGS: EntireTabSettings = {
  ripple: true,
  state: true,
  exact: true,
  routerLink: null,
  inactive: false,
  label: undefined,
};

export const TAB_SETTINGS = new InjectionToken<TabSettings>('Tab Settings');
