import { InjectionToken } from '@angular/core';
import { SnackbarSettings } from './snackbar.interface';

export const DEFAULT_SNACKBAR_SETTINGS: Required<SnackbarSettings> = {
  position: 'center',
  stacked: false,
  duration: 0,
};
export const SNACKBAR_SETTINGS = new InjectionToken<Required<SnackbarSettings>>('Snackbar Settings');
