import { InjectionToken } from '@angular/core';
import type { EntireMenuSettings, MenuSettings } from './menu.interface';

export const DEFAULT_MENU_SETTINGS: EntireMenuSettings = {
  offset: 0,
  position: 'bottom',
  flip: false,
  elevation: 1,
  openOnClick: true,
  closeOnOutsideClick: true,
  parentWidth: false,
};

export const MENU_SETTINGS = new InjectionToken<MenuSettings>('Menu Settings');
