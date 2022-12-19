import { InjectionToken } from '@angular/core';
import type { ComboboxSettings, EntireComboboxSettings } from './combobox.interface';

export const DEFAULT_COMBOBOX_SETTINGS: EntireComboboxSettings = {
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
export const COMBOBOX_SETTINGS = new InjectionToken<ComboboxSettings>('Combobox Settings');
