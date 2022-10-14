import { InjectionToken } from '@angular/core';
import type { DividerSettings, EntireDividerSettings } from './divider.interface';

export const DEFAULT_DIVIDER_SETTINGS: EntireDividerSettings = {
  vertical: false,
  inset: false,
};
export const DIVIDER_SETTINGS = new InjectionToken<DividerSettings>('Divider Settings');
