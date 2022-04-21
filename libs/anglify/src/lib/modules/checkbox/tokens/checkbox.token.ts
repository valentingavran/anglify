import { InjectionToken } from '@angular/core';
import { CheckboxSettings } from '../interfaces/checkbox.interface';

export const DEFAULT_CHECKBOX_SETTINGS: Required<CheckboxSettings> = {
  disabled: false,
  checked: false,
  labelPosition: 'after',
  ripple: true,
  rippleOrigin: 'center',
};

export const CHECKBOX_SETTINGS = new InjectionToken<CheckboxSettings>('Checkbox Settings');
