import { InjectionToken } from '@angular/core';
import type { EntireNavigationDrawerSettings, NavigationDrawerSettings } from './navigation-drawer.interface';

export const DEFAULT_NAVIGATION_DRAWER_SETTINGS: EntireNavigationDrawerSettings = {
  mode: 'standard',
  closeOnOutsideClick: true,
  closeOnItemClick: true,
};

export const NAVIGATION_DRAWER_SETTINGS = new InjectionToken<NavigationDrawerSettings>('Navigation Drawer Settings');
