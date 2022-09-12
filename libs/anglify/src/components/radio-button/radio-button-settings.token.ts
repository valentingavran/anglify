import { InjectionToken } from '@angular/core';
import type { EntireRadioButtonSettings, RadioButtonSettings } from './radio-button.interface';

export const DEFAULT_RADIO_BUTTON_SETTINGS: EntireRadioButtonSettings = {
  disabled: false,
  labelPosition: 'after',
  ripple: true,
  rippleOrigin: 'center',
  state: true,
};

export const RADIO_BUTTON_SETTINGS = new InjectionToken<RadioButtonSettings>('Radio Button Settings');
