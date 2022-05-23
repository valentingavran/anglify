import { InjectionToken } from '@angular/core';
import { CheckboxSettings, EntireCheckboxSettings } from '../interfaces/checkbox.interface';

export const DEFAULT_CHECKBOX_SETTINGS: EntireCheckboxSettings = {
  disabled: false,
  checked: false,
  labelPosition: 'after',
  ripple: true,
  rippleOrigin: 'center',
  state: true,
};

export const CHECKBOX_SETTINGS = new InjectionToken<CheckboxSettings>('Checkbox Settings');
