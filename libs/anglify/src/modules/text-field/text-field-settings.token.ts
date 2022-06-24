import { InjectionToken } from '@angular/core';
import { EntireTextFieldSettings, TextFieldSettings } from './text-field.interface';

export const DEFAULT_TEXT_FIELD_SETTINGS: EntireTextFieldSettings = {
  appearance: 'filled',
  dense: false,
  persistentHint: false,
  alwaysFloatingLabel: false,
  hideDetails: false,
  counter: false,
};
export const TEXT_FIELD_SETTINGS = new InjectionToken<TextFieldSettings>('Text Field Settings');
