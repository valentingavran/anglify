import { InjectionToken } from '@angular/core';
import type { NavDrawerSettings } from './nav-drawer.interface';

export const DEFAULT_NAV_DRAWER_SETTINGS: Required<NavDrawerSettings> = {
  mode: 'standard',
  fixed: false,
  closeOnOutsideClick: true,
  closeOnItemClick: true,
};

export const NAV_DRAWER_SETTINGS = new InjectionToken<NavDrawerSettings>('NavDrawer Settings');
