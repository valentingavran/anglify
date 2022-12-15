import { InjectionToken } from '@angular/core';
import type { EntireMenuSettings, MenuSettings } from './menu.interface';

export const DEFAULT_MENU_SETTINGS: EntireMenuSettings = {
  closeOnEscape: true,
  closeOnMenuClick: true,
  closeOnOutsideClick: true,
  disabled: false,
  flip: false,
  openOnHover: false,
  position: 'bottom',
  value: false,
  offset: 0,
  maxWidth: '100%',
  maxHeight: '250px',
  focusActivatorOnClose: true,
  shift: true,
};

export const MENU_SETTINGS = new InjectionToken<MenuSettings>('Menu Settings');
