import { InjectionToken } from '@angular/core';
import type { DialogSettings, EntireDialogSettings } from './dialog.interface';

export const DEFAULT_DIALOG_SETTINGS: EntireDialogSettings = {};
export const DIALOG_SETTINGS = new InjectionToken<DialogSettings>('Dialog Settings');
