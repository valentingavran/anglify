import { InjectionToken } from '@angular/core';
import type { AutocompleteSettings, EntireAutocompleteSettings } from './autocomplete.interface';

export const DEFAULT_AUTOCOMPLETE_SETTINGS: EntireAutocompleteSettings = {
  appearance: 'filled',
  alwaysFloatingLabel: false,
  persistentHint: false,
  clearable: false,
  noDataText: 'No data available',
  multiple: false,
  dropdownPosition: 'bottom',
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
};
export const AUTOCOMPLETE_SETTINGS = new InjectionToken<AutocompleteSettings>('Autocomplete Settings');
