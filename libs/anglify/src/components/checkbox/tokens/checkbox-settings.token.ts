import { InjectionToken } from '@angular/core';
import type { CheckboxSettings, EntireCheckboxSettings } from '../interfaces/checkbox.interface';

export const DEFAULT_CHECKBOX_SETTINGS: EntireCheckboxSettings = {
  disabled: false,
  checked: false,
  labelPosition: 'after',
  ripple: true,
  rippleOrigin: 'center',
  state: true,
  readonly: false,
};

export const CHECKBOX_SETTINGS = new InjectionToken<CheckboxSettings>('Checkbox Settings');
