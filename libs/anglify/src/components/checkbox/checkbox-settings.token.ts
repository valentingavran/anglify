import { InjectionToken } from '@angular/core';
import type { CheckboxSettings, EntireCheckboxSettings } from './checkbox.interface';

export const DEFAULT_CHECKBOX_SETTINGS: EntireCheckboxSettings = {
  disabled: false,
  checked: false,
  labelPosition: 'after',
  ripple: true,
  rippleOrigin: 'center',
  state: true,
  readonly: false,
  focusable: true,
};

export const CHECKBOX_SETTINGS = new InjectionToken<CheckboxSettings>('Checkbox Settings');
