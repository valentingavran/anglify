import { InjectionToken } from '@angular/core';
import type { EntireNavDrawerSettings, NavDrawerSettings } from './nav-drawer.interface';

export const DEFAULT_NAV_DRAWER_SETTINGS: EntireNavDrawerSettings = {
  mode: 'standard',
  closeOnOutsideClick: true,
  closeOnItemClick: true,
};

export const NAV_DRAWER_SETTINGS = new InjectionToken<NavDrawerSettings>('NavDrawer Settings');
