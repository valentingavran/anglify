import { InjectionToken } from '@angular/core';
import type { MenuSettings } from './menu.interface';

export const DEFAULT_MENU_SETTINGS: Required<MenuSettings> = {
  offset: 0,
  position: 'bottom',
  elevation: 1,
  openOnClick: true,
  closeOnOutsideClick: true,
  parentWidth: false,
};

export const MENU_SETTINGS = new InjectionToken<MenuSettings>('Menu Settings');
