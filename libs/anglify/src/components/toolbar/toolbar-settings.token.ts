import { InjectionToken } from '@angular/core';
import type { EntireToolbarSettings, ToolbarSettings } from './toolbar.interface';

export const DEFAULT_TOOLBAR_SETTINGS: EntireToolbarSettings = {
  prominent: false,
  collapse: false,
  elevation: 0,
  app: false,
};
export const TOOLBAR_SETTINGS = new InjectionToken<ToolbarSettings>('Toolbar Settings');
