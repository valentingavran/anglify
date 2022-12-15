import { InjectionToken } from '@angular/core';
import type { EntireSelectSettings, SelectSettings } from './select.interface';

export const DEFAULT_SELECT_SETTINGS: EntireSelectSettings = {
  appearance: 'filled',
  alwaysFloatingLabel: false,
  persistentHint: false,
  clearable: false,
  noDataText: 'No data available',
  multiple: false,
  dropdownPosition: 'bottom-start',
  disabled: false,
  hideDetails: false,
  itemTextKey: undefined,
  itemValueKey: undefined,
  error: undefined,
  items: [],
  dense: false,
  hint: undefined,
  label: undefined,
  placeholder: undefined,
  flip: false,
};
export const SELECT_SETTINGS = new InjectionToken<SelectSettings>('Select Settings');
