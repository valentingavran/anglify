import { InjectionToken } from '@angular/core';
import type { DividerSettings, EntireDividerSettings } from './divider.interface';

export const DEFAULT_DIVIDER_SETTINGS: EntireDividerSettings = {
  /**
   * Sets the orientation of the divider to vertical.
   */
  vertical: false,
  /**
   * Enables the inset of the divider.
   */
  inset: false,
};
export const DIVIDER_SETTINGS = new InjectionToken<DividerSettings>('Divider Settings');
