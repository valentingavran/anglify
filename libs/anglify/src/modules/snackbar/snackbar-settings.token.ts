import { InjectionToken } from '@angular/core';
import { EntireSnackbarSettings, SnackbarSettings } from './snackbar.interface';

export const DEFAULT_SNACKBAR_SETTINGS: EntireSnackbarSettings = {
  position: 'center',
  stacked: false,
  timeout: 5000,
};
export const SNACKBAR_SETTINGS = new InjectionToken<SnackbarSettings>('Snackbar Settings');
