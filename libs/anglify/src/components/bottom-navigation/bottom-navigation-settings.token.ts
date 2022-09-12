import { InjectionToken } from '@angular/core';
import type { BottomNavigationSettings, EntireBottomNavigationSettings } from './bottom-navigation.interface';

export const DEFAULT_BOTTOM_NAVIGATION_SETTINGS: EntireBottomNavigationSettings = {
  shift: false,
  grow: false,
};
export const BOTTOM_NAVIGATION_SETTINGS = new InjectionToken<BottomNavigationSettings>('BottomNavigation Settings');
