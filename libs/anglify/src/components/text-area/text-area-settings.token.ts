import { InjectionToken } from '@angular/core';
import type { EntireTextAreaSettings, TextAreaSettings } from './text-area.interface';

export const DEFAULT_TEXT_AREA_SETTINGS: EntireTextAreaSettings = {
  appearance: 'filled',
  persistentHint: false,
  alwaysFloatingLabel: false,
  hideDetails: false,
  counter: false,
  error: undefined,
  hint: undefined,
  label: undefined,
};
export const TEXT_AREA_SETTINGS = new InjectionToken<TextAreaSettings>('Text Area Settings');
