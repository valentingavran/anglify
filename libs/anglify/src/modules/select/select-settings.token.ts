import { InjectionToken } from '@angular/core';
import { EntireSelectSettings, SelectSettings } from './select.interface';

export const DEFAULT_SELECT_SETTINGS: EntireSelectSettings = {
  appearance: 'filled',
  alwaysFloatingLabel: false,
  persistentHint: false,
  dropdownPosition: 'bottom',
  dropdownAutoPosition: true,
  dropdownOffset: 0,
  clearable: false,
  closeOnSelect: true,
  noOptions: 'No options',
  addOption: 'Add option:',
};
export const SELECT_SETTINGS = new InjectionToken<SelectSettings>('Select Settings');
