import { InjectionToken } from '@angular/core';
import type { EntireMenuSettings, MenuSettings } from './menu.interface';

export const DEFAULT_MENU_SETTINGS: EntireMenuSettings = {
  closeOnEscape: true,
  closeOnMenuClick: true,
  closeOnOutsideClick: true,
  disabled: false,
  flip: false,
  focusMenuWhenOpened: true,
  focusable: false,
  openOnClick: true,
  openOnHover: false,
  position: 'bottom',
  trapFocus: true,
  value: false,
};

export const MENU_SETTINGS = new InjectionToken<MenuSettings>('Menu Settings');
