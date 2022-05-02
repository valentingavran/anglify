import { InjectionToken } from '@angular/core';
import { ButtonSettings } from './button.interface';

export const DEFAULT_BUTTON_SETTINGS: Required<ButtonSettings> = {
  appearance: 'filled',
  block: false,
  size: 'regular',
  ripple: true,
  state: true,
};

export const BUTTON_SETTINGS = new InjectionToken<Required<ButtonSettings>>('Button Settings');
