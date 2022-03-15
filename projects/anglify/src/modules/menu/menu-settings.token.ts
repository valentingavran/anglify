import { InjectionToken } from '@angular/core';
import { MenuSettings } from './menu.interface';

export const MENU_SETTINGS = new InjectionToken<Required<MenuSettings>>('Menu Settings');

export const DEFAULT_MENU_SETTINGS: Required<MenuSettings> = {
  offset: 0,
  position: 'bottom',
  elevation: 1,
};
