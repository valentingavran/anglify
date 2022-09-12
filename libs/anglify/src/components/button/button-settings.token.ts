import { InjectionToken } from '@angular/core';
import type { ButtonSettings, EntireButtonSettings } from './button.interface';

export const DEFAULT_BUTTON_SETTINGS: EntireButtonSettings = {
  appearance: 'contained',
  block: false,
  ripple: true,
  state: true,
};

export const BUTTON_SETTINGS = new InjectionToken<ButtonSettings>('Button Settings');
