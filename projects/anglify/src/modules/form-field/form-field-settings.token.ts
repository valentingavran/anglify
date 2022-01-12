import { InjectionToken } from '@angular/core';
import { FormFieldSettings } from './form-field.interface';

export const FORM_FIELD_SETTINGS = new InjectionToken<FormFieldSettings>('Form Field Settings');
