import { InjectionToken } from '@angular/core';
import type { EntireSnackbarSettings, SnackbarSettings } from './snackbar.interface';

export const DEFAULT_SNACKBAR_SETTINGS: EntireSnackbarSettings = {
  position: 'center',
  stacked: false,
  timeout: 5_000,
};
export const SNACKBAR_SETTINGS = new InjectionToken<SnackbarSettings>('Snackbar Settings');
