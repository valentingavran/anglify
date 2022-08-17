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
  noOptions: 'No data available',
  addItem: 'Add item:',
};
export const SELECT_SETTINGS = new InjectionToken<SelectSettings>('Select Settings');
