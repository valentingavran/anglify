import { InjectionToken } from '@angular/core';
import { ToolbarSettings } from './toolbar.interface';

export const DEFAULT_TOOLBAR_SETTINGS: Required<ToolbarSettings> = {
  prominent: false,
  navigation: true,
  collapse: false,
};
export const TOOLBAR_SETTINGS = new InjectionToken<Required<ToolbarSettings>>('Toolbar Settings');
