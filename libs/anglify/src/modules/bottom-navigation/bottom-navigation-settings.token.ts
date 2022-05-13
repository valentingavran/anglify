import { InjectionToken } from '@angular/core';
import { BottomNavigationSettings } from './bottom-navigation.interface';

export const DEFAULT_BOTTOM_NAVIGATION_SETTINGS: Required<BottomNavigationSettings> = {
  shift: false,
  grow: false,
};
export const BOTTOM_NAVIGATION_SETTINGS = new InjectionToken<Required<BottomNavigationSettings>>('BottomNavigation Settings');
