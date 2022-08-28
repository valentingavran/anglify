import { InjectionToken } from '@angular/core';
import { EntireToolbarSettings, ToolbarSettings } from './toolbar.interface';

export const DEFAULT_TOOLBAR_SETTINGS: EntireToolbarSettings = {
  prominent: false,
  collapse: false,
  elevation: 0,
};
export const TOOLBAR_SETTINGS = new InjectionToken<ToolbarSettings>('Toolbar Settings');
