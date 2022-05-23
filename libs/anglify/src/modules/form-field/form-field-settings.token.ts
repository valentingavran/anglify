import { InjectionToken } from '@angular/core';
import type { EntireFormFieldSettings, FormFieldSettings } from './form-field.interface';

export const DEFAULT_FORM_FIELD_SETTINGS: EntireFormFieldSettings = {
  defaultType: 'filled',
  dense: false,
  persistentHint: false,
  persistentPlaceholder: false,
  hideDetails: false,
};

export const FORM_FIELD_SETTINGS = new InjectionToken<FormFieldSettings>('Form Field Settings');
