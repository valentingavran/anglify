import { InjectionToken } from '@angular/core';
import type { BottomNavigationItemSettings, EntireBottomNavigationItemSettings } from './bottom-navigation-item.interface';

export const DEFAULT_BOTTOM_NAVIGATION_ITEM_SETTINGS: EntireBottomNavigationItemSettings = {
  exact: false,
  inactive: false,
  ripple: true,
  routerLink: [],
  shift: false,
  state: true,
};
export const BOTTOM_NAVIGATION_ITEM_SETTINGS = new InjectionToken<BottomNavigationItemSettings>('BottomNavigationItem Settings');
